import { NextRequest, NextResponse } from "next/server";
import { assertAdminPassword } from "@/lib/admin/auth";
import { getAdminDb } from "@/lib/firebase/admin";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const password = req.headers.get("x-admin-password");
    assertAdminPassword(password);

    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit") ?? "50"), 200);

    const db = getAdminDb();

    const snap = await db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();

    const orders = snap.docs.map((doc) => {
      const data = doc.data() as any;

      // ✅ 레거시 주문 보정: payment 없으면 기본값 주입
      const payment =
        data.payment && typeof data.payment === "object"
          ? data.payment
          : { provider: "naverpay_order", status: "unpaid" };

      return {
        id: doc.id,
        ...data,
        payment: {
          provider: payment.provider ?? "naverpay_order",
          status: payment.status ?? "unpaid",
          merchantUid: payment.merchantUid ?? data.orderNumber ?? doc.id,
          pgTransactionId: payment.pgTransactionId ?? null,
          requestedAt: payment.requestedAt ?? null,
          paidAt: payment.paidAt ?? null,
          failReason: payment.failReason ?? null,
        },
      };
    });

    return NextResponse.json({ ok: true, orders });
  } catch (e: any) {
    const status = e?.statusCode === 401 ? 401 : 500;
    return NextResponse.json(
      { ok: false, message: e?.message || "Server error" },
      { status }
    );
  }
}
