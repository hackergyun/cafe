import "server-only";

export function assertAdminPassword(input: string | null) {
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    throw new Error("Missing ADMIN_PASSWORD env");
  }

  if (!input || input !== expected) {
    const err = new Error("Unauthorized");
    // @ts-ignore
    err.statusCode = 401;
    throw err;
  }
}
