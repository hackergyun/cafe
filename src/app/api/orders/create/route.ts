// src/app/api/orders/create/route.ts
import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";
import { products } from "@/data/products";

type CreateOrderBody = {
  orderNumber?: string; // checkout에서 생성한 주문번호(=merchant_uid로 사용 가능)
  customer: { name: string; phone: string };
  shipping: { address: string; addressDetail?: string; request?: string };
  items: Array<{
    productId: string;
    quantity: number;
    // name/price는 클라가 보내도 서버에서 신뢰하지 않음(서버에서 재계산)
    name?: string;
    price?: number;
  }>;
  pricing?: {
    subtotal?: number;
    shippingFee?: number;
    total?: number;
  };
};

function generateOrderNumber() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${date}-${random}`;
}

export async function POST(req: Request) {
  try {
    const adminDb = getAdminDb();

    const body = (await req.json()) as CreateOrderBody;
    const { items, customer, shipping } = body;

    // 1) 필수값 검증(400)
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ ok: false, error: "INVALID_ITEMS" }, { status: 400 });
    }
    if (!customer?.name || !customer?.phone) {
      return NextResponse.json({ ok: false, error: "INVALID_CUSTOMER" }, { status: 400 });
    }
    if (!shipping?.address) {
      return NextResponse.json({ ok: false, error: "INVALID_SHIPPING" }, { status: 400 });
    }

    // 2) 서버에서 가격 재계산(클라 데이터 불신)
    const normalizedItems = items.map((it) => ({
      productId: String(it.productId),
      quantity: Number(it.quantity),
    }));

    if (
      normalizedItems.some(
        (it) => !it.productId || !Number.isFinite(it.quantity) || it.quantity <= 0
      )
    ) {
      return NextResponse.json({ ok: false, error: "INVALID_ITEM_FORMAT" }, { status: 400 });
    }

    const computedItems = normalizedItems.map((it) => {
      const p = products.find((x) => x.id === it.productId);
      if (!p) return null;
      return {
        productId: p.id,
        name: p.name,
        price: p.price,
        quantity: it.quantity,
      };
    });

    if (computedItems.some((x) => x === null)) {
      return NextResponse.json({ ok: false, error: "PRODUCT_NOT_FOUND" }, { status: 400 });
    }

    const safeItems = computedItems as Array<{
      productId: string;
      name: string;
      price: number;
      quantity: number;
    }>;

    const subtotal = safeItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
    const shippingFee = subtotal >= 50000 ? 0 : 3000;
    const total = subtotal + shippingFee;

    // 3) merchant_uid 확정
    const merchant_uid = body.orderNumber?.trim() ? body.orderNumber.trim() : generateOrderNumber();

    // 4) Firestore 생성 (Admin SDK)
    const docRef = await adminDb.collection("orders").add({
      orderNumber: merchant_uid, // 운영상 orderNumber=merchant_uid로 통일 (추적 편함)
      status: "pending",

      payment: {
        provider: "portone",
        status: "unpaid",
        merchantUid: merchant_uid,
        impUid: null,
        requestedAt: FieldValue.serverTimestamp(),
        paidAt: null,
        failReason: null,
      },

      customer: {
        name: customer.name,
        phone: customer.phone,
      },

      shipping: {
        address: shipping.address,
        addressDetail: shipping.addressDetail || "",
        request: shipping.request || "",
      },

      items: safeItems,

      pricing: {
        subtotal,
        shippingFee,
        total,
      },

      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    // 5) 응답 (checkout에서 그대로 사용)
    return NextResponse.json({
      ok: true,
      orderId: docRef.id,
      merchant_uid,
      amount: total,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}
