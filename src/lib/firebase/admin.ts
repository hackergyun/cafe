import "server-only";
import admin from "firebase-admin";

type ServiceAccount = {
  project_id: string;
  client_email: string;
  private_key: string;
};

function getServiceAccountFromEnv(): ServiceAccount {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!raw) {
    throw new Error(
      "Missing FIREBASE_SERVICE_ACCOUNT_KEY env. Set it in Vercel/ .env.local"
    );
  }

  let parsed: any;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON. Use a single-line JSON string."
    );
  }

  // Vercel/env에 들어간 private_key는 보통 \n 포함 문자열 형태임.
  // 혹시 실제 줄바꿈이 섞여 들어간 케이스도 대비해서 normalize.
  const privateKey =
    typeof parsed.private_key === "string"
      ? parsed.private_key.replace(/\\n/g, "\n")
      : "";

  if (!parsed.project_id || !parsed.client_email || !privateKey) {
    throw new Error(
      "Service account JSON is missing required fields (project_id/client_email/private_key)."
    );
  }

  return {
    project_id: parsed.project_id,
    client_email: parsed.client_email,
    private_key: privateKey,
  };
}

export function getAdminApp() {
  if (admin.apps.length > 0) return admin.app();

  const sa = getServiceAccountFromEnv();

  return admin.initializeApp({
    credential: admin.credential.cert(sa as any),
  });
}

export function getAdminDb() {
  const app = getAdminApp();
  return admin.firestore(app);
}
