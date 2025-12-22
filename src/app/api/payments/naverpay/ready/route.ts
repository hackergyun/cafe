import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import { getAdminDb } from "@/lib/firebase/admin";

export const dynamic = "force-dynamic";

type Body = {
  orderId: string; // Firestore doc id
};

export async function POST(req: NextRequest) {
  try {
    const { orderId } = (await req.json()) as Body;
    if (!orderId) {
      return NextResponse.json({ ok: false, message: "orderId required" }, { status: 400 });
    }

    const db = getAdminDb();
    const ref = db.collection("orders").doc(orderId);
    const snap = await ref.get();

    if (!snap.exists) {
      return NextResponse.json({ ok: false, message: "order not found" }, { status: 404 });
    }

    const order = snap.data() as any;

    // 1) 결제 상태 선검증
    const payStatus = order.payment?.status ?? "unpaid";
    if (payStatus === "paid") {
      return NextResponse.json({ ok: false, message: "already paid" }, { status: 400 });
    }

    // 2) (Step1용) 결제요청 생성 전 상태 업데이트만 먼저
    const now = admin.firestore.FieldValue.serverTimestamp();
    await ref.update({
      payment: {
        ...(order.payment ?? {}),
        status: "ready",
        requestedAt: now,
        amount: order.pricing?.total ?? null,
        currency: "KRW",
      },
      updatedAt: now,
    });

    // 3) (Step1용) “가짜” 리다이렉트 URL 반환
    // Step2에서 여기 부분을 "네이버페이 ready API 호출 → redirectUrl 반환"으로 바꿀 거야.
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      `${req.headers.get("x-forwarded-proto") ?? "https"}://${req.headers.get("host")}`;

    // 결제 완료/실패 후 돌아올 URL(다음 단계에서 실제 returnUrl로 사용)
    const returnUrl = `${baseUrl}/order/complete?orderId=${orderId}`;

    return NextResponse.json({
      ok: true,
      // Step2에서 npay redirectUrl로 바뀜
      redirectUrl: returnUrl,
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { ok: false, message: e?.message || "server error" },
      { status: 500 }
    );
  }
}
