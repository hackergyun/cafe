import { NextResponse, NextRequest } from "next/server";
import admin from "firebase-admin";
import { getAdminDb } from "@/lib/firebase/admin";
import { assertAdminPassword } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

const ALLOWED_STATUS = ["pending", "confirmed", "shipped", "canceled"] as const;
type OrderStatus = (typeof ALLOWED_STATUS)[number];

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ Next 16 타입 생성기가 기대하는 형태
) {
  try {
    const password = req.headers.get("x-admin-password");
    assertAdminPassword(password);

    const { status } = (await req.json()) as { status?: OrderStatus };

    if (!status || !ALLOWED_STATUS.includes(status)) {
      return NextResponse.json(
        { ok: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    const { id } = await context.params; // ✅ 여기서 await

    const db = getAdminDb();
    await db.collection("orders").doc(id).update({
      status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    const status = e?.statusCode === 401 ? 401 : 500;
    return NextResponse.json(
      { ok: false, message: e?.message || "Server error" },
      { status }
    );
  }
}
