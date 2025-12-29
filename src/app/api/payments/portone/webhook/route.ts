import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * PortOne 웹훅 API
 * POST /api/payments/portone/webhook
 *
 * PortOne에서 결제 이벤트 발생 시 호출하는 웹훅 엔드포인트
 *
 * TODO: 추후 PortOne 계약 후 다음 작업 필요
 * 1. 웹훅 시크릿 검증 (헤더의 시그니처 검증)
 * 2. 웹훅 이벤트 타입별 처리 (payment.paid, payment.failed 등)
 * 3. /api/payments/portone/verify API 재사용하여 결제 검증 수행
 * 4. 비동기적으로 주문 상태 업데이트
 *
 * 현재는 payload 로깅 및 200 응답만 반환
 */
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // TODO: 웹훅 시크릿 검증
    // const signature = req.headers.get("x-portone-signature");
    // const webhookSecret = process.env.PORTONE_WEBHOOK_SECRET;
    // if (!verifySignature(payload, signature, webhookSecret)) {
    //   return NextResponse.json({ ok: false, message: "Invalid signature" }, { status: 401 });
    // }

    // TODO: 이벤트 타입별 처리
    // const eventType = payload.event_type; // 예: "payment.paid", "payment.failed"
    // const { imp_uid, merchant_uid } = payload;

    // TODO: verify API 재사용 또는 직접 검증 로직 호출
    // if (eventType === "payment.paid") {
    //   await verifyPayment(imp_uid, merchant_uid);
    // }

    // 현재는 payload 로깅만 수행
    console.log("[PortOne Webhook] Received payload:", JSON.stringify(payload, null, 2));

    return NextResponse.json({
      ok: true,
      message: "Webhook received",
    });
  } catch (error: any) {
    console.error("[PortOne Webhook] Error:", error);
    return NextResponse.json(
      {
        ok: false,
        message: error?.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}

