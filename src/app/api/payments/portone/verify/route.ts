import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";
import admin from "firebase-admin";

export const dynamic = "force-dynamic";

type VerifyRequest = {
  imp_uid: string;
  merchant_uid: string;
};

const PORTONE_V2_API_SECRET = process.env.PORTONE_V2_API_SECRET;

/**
 * PortOne 결제조회 (V2)
 * - 키 없으면 501
 * - 실제 URL/응답 스키마는 계약/콘솔 문서 확인 후 최종 확정 필요
 */
async function fetchPortOnePayment(impUid: string) {
  if (!PORTONE_V2_API_SECRET) {
    return {
      ok: false as const,
      status: 501,
      message: "PORTONE_V2_API_SECRET not set",
    };
  }

  const res = await fetch(
    `https://api.portone.io/payments/${encodeURIComponent(impUid)}`,
    {
      method: "GET",
      headers: {
        Authorization: `PortOne ${PORTONE_V2_API_SECRET}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    return {
      ok: false as const,
      status: res.status,
      message: data?.message || "PortOne API error",
      raw: data,
    };
  }

  return { ok: true as const, data };
}

function pickPaidAmount(paymentData: any): number | null {
  // 여러 케이스 대비(문서 확정 전 방어)
  const candidates = [
    paymentData?.amount?.total,
    paymentData?.amount?.paid,
    paymentData?.amount,
    paymentData?.paidAmount,
    paymentData?.paid_amount,
  ];

  for (const v of candidates) {
    if (typeof v === "number" && Number.isFinite(v)) return v;
  }
  return null;
}

function isPaidStatus(status: any): boolean {
  const s = String(status || "").toLowerCase();
  return ["paid", "completed", "done", "success"].includes(s);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as VerifyRequest | null;
    const imp_uid = body?.imp_uid?.trim();
    const merchant_uid = body?.merchant_uid?.trim();

    if (!imp_uid || !merchant_uid) {
      return NextResponse.json(
        { ok: false, message: "imp_uid and merchant_uid are required" },
        { status: 400 }
      );
    }

    const db = getAdminDb();
    const ordersRef = db.collection("orders");

    // 1) 주문 조회: 우선 docId = merchant_uid 가정, 없으면 orderNumber로 조회
    let orderDoc = await ordersRef.doc(merchant_uid).get();
    let orderId = merchant_uid;

    if (!orderDoc.exists) {
      const q = await ordersRef.where("orderNumber", "==", merchant_uid).limit(1).get();
      if (q.empty) {
        return NextResponse.json({ ok: false, message: "Order not found" }, { status: 404 });
      }
      orderDoc = q.docs[0];
      orderId = orderDoc.id;
    }

    const order = orderDoc.data() as any;
    const expectedAmount = order?.pricing?.total;

    if (typeof expectedAmount !== "number" || !Number.isFinite(expectedAmount)) {
      return NextResponse.json(
        { ok: false, message: "Order amount missing (pricing.total)" },
        { status: 400 }
      );
    }

    // 2) 이미 결제완료 처리된 주문이면 idempotent 처리
    if (order?.payment?.status === "paid") {
      return NextResponse.json({ ok: true, orderId, message: "already_paid" });
    }

    // 3) PortOne 결제 조회
    const paymentRes = await fetchPortOnePayment(imp_uid);
    if (!paymentRes.ok) {
      return NextResponse.json(
        { ok: false, message: paymentRes.message },
        { status: paymentRes.status }
      );
    }

    const paymentData = paymentRes.data;
    const paymentStatus = paymentData?.status;
    const paidAmount = pickPaidAmount(paymentData);

    // 4) 금액 검증
    if (paidAmount === null) {
      // 금액을 못 읽으면 실패로 기록(운영 관점: 애매하면 fail 처리)
      await ordersRef.doc(orderId).update({
        payment: {
          ...(order.payment ?? {}),
          status: "failed",
          failReason: "amount_unreadable",
          imp_uid,
          merchant_uid,
        },
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return NextResponse.json(
        { ok: false, message: "Paid amount unreadable" },
        { status: 400 }
      );
    }

    if (paidAmount !== expectedAmount) {
      await ordersRef.doc(orderId).update({
        payment: {
          ...(order.payment ?? {}),
          status: "failed",
          failReason: "amount_mismatch",
          imp_uid,
          merchant_uid,
          amount: paidAmount,
        },
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return NextResponse.json(
        { ok: false, message: "Amount mismatch" },
        { status: 400 }
      );
    }

    // 5) 결제 상태 검증
    if (!isPaidStatus(paymentStatus)) {
      await ordersRef.doc(orderId).update({
        payment: {
          ...(order.payment ?? {}),
          status: String(paymentStatus || "failed").toLowerCase(),
          imp_uid,
          merchant_uid,
          amount: paidAmount,
        },
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return NextResponse.json(
        { ok: false, message: `Payment not completed: ${paymentStatus}` },
        { status: 400 }
      );
    }

    // 6) 결제 성공 확정 → 주문 상태도 confirmed로 승격
    const now = admin.firestore.FieldValue.serverTimestamp();

    await ordersRef.doc(orderId).update({
      status: "confirmed",
      payment: {
        ...(order.payment ?? {}),
        provider: "portone",
        status: "paid",
        imp_uid,
        merchant_uid,
        amount: expectedAmount,
        currency: "KRW",
        paidAt: now,
      },
      updatedAt: now,
    });

    return NextResponse.json({ ok: true, orderId });
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { ok: false, message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
