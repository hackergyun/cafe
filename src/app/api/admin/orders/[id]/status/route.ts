import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import { getAdminDb } from "@/lib/firebase/admin";
import { assertAdminPassword } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

const ALLOWED_STATUS = ["pending", "confirmed", "shipped", "canceled"] as const;
type OrderStatus = (typeof ALLOWED_STATUS)[number];

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 1️⃣ 관리자 보호락
    const password = req.headers.get("x-admin-password");
    assertAdminPassword(password);

    // 2️⃣ 요청값 검증
    const body = (await req.json().catch(() => null)) as { status?: OrderStatus } | null;
    const nextStatus = body?.status;

    if (!nextStatus || !ALLOWED_STATUS.includes(nextStatus)) {
      return NextResponse.json(
        { ok: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    // 3️⃣ 주문 조회
    const { id } = await context.params;
    const db = getAdminDb();
    const ref = db.collection("orders").doc(id);
    const snap = await ref.get();

    if (!snap.exists) {
      return NextResponse.json(
        { ok: false, message: "Order not found" },
        { status: 404 }
      );
    }

    const order = snap.data() as any;
    const paymentStatus = order.payment?.status ?? "unpaid";

    // 🔐 4️⃣ 핵심 보호락: 결제 미완료 주문 차단
    if (
      paymentStatus !== "paid" &&
      (nextStatus === "confirmed" || nextStatus === "shipped")
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "결제 완료 전에는 확인/발송 상태로 변경할 수 없습니다.",
        },
        { status: 400 }
      );
    }

    // 5️⃣ 상태 업데이트
    await ref.update({
      status: nextStatus,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    const httpStatus = e?.statusCode === 401 ? 401 : 500;
    return NextResponse.json(
      { ok: false, message: e?.message || "Server error" },
      { status: httpStatus }
    );
  }
}
