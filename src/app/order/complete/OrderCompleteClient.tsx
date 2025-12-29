"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/types";

export default function OrderCompleteClient() {
  const params = useSearchParams();
  const impUid = params.get("imp_uid");
  const merchantUid = params.get("merchant_uid"); 
  const orderNumberFromQuery = params.get("orderNumber") ?? "";

  // 🔥 PortOne 결제 플로우용 표시 주문번호
  // - PortOne 리다이렉트: merchant_uid
  // - 기존 플로우: orderNumber
  const displayOrderNo = merchantUid || orderNumberFromQuery;
  const { items, getTotalPrice, clearCart } = useCart();
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  const [orderTotal, setOrderTotal] = useState(0);

  const shippingFee = useMemo(() => (orderTotal >= 50000 ? 0 : 3000), [orderTotal]);
  const totalAmount = useMemo(() => orderTotal + shippingFee, [orderTotal, shippingFee]);
  const [isVerifying, setIsVerifying] = useState(false);
const [verifyError, setVerifyError] = useState<string | null>(null);

useEffect(() => {
  // 포트원 리다이렉트로 들어온 케이스만 검증
  if (!impUid || !merchantUid) return;

  let cancelled = false;

  const run = async () => {
    setIsVerifying(true);
    setVerifyError(null);

    try {
      const res = await fetch("/api/payments/portone/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imp_uid: impUid,
          merchant_uid: merchantUid,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        throw new Error(data?.message || "결제 검증 실패");
      }

      // ✅ 결제 확정 → 장바구니 비우기
      if (!cancelled) clearCart();
    } catch (e: any) {
      console.error(e);
      if (!cancelled) setVerifyError(e?.message || "결제 확인 중 오류가 발생했습니다.");
    } finally {
      if (!cancelled) setIsVerifying(false);
    }
  };

  run();

  return () => {
    cancelled = true;
  };
}, [impUid, merchantUid, clearCart]);


  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  useEffect(() => {
    // ✅ 포트원 결제 완료로 넘어온 경우엔(imp_uid/merchant_uid 존재) 장바구니 기반 처리 금지
    if (impUid && merchantUid) return;
  
    if (items.length > 0) {
      setOrderItems([...items]);
      setOrderTotal(getTotalPrice());
      clearCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [impUid, merchantUid]);  

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Success Header */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">
            주문이 완료되었습니다
          </h1>
          <p className="text-stone-500 text-lg">
  주문해 주셔서 감사합니다. 맛있는 디저트를 정성껏 준비하겠습니다.
</p>

{impUid && merchantUid && (
  <div className="mt-4">
    {isVerifying && (
      <p className="text-sm text-stone-500">결제 확인 중입니다...</p>
    )}
    {verifyError && (
      <p className="text-sm text-red-600">결제 확인 실패: {verifyError}</p>
    )}
  </div>
)}
 {displayOrderNo && (
  <div className="mt-8 inline-block bg-stone-100 px-6 py-3">
    <p className="text-sm text-stone-500">주문번호</p>
    <p className="text-lg font-medium text-stone-900 tracking-wider">
      {displayOrderNo}
    </p>
  </div>
)}
        </div>
      </section>

      {/* Order Summary */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {orderItems.length > 0 ? (
            <>
              {/* 주문 상품 */}
              <div className="bg-white border border-stone-200 p-8 mb-8">
                <h2 className="text-lg font-medium text-stone-900 mb-6">
                  주문 상품
                </h2>

                <div className="divide-y divide-stone-200">
                  {orderItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="py-4 first:pt-0 last:pb-0 flex gap-4"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-100 via-orange-50 to-stone-200 flex-shrink-0 flex items-center justify-center">
                        <span className="text-stone-400 text-[8px] text-center px-1">
                          {item.product.name}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-stone-900 font-medium truncate">
                          {item.product.name}
                        </p>
                        <p className="text-stone-500 text-sm mt-1">
                          {formatPrice(item.product.price)}원 × {item.quantity}개
                        </p>
                      </div>

                      <p className="text-stone-900 font-medium whitespace-nowrap">
                        {formatPrice(item.product.price * item.quantity)}원
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 결제 정보 */}
              <div className="bg-white border border-stone-200 p-8 mb-8">
                <h2 className="text-lg font-medium text-stone-900 mb-6">
                  결제 정보
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-500">상품 금액</span>
                    <span className="text-stone-900">{formatPrice(orderTotal)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">배송비</span>
                    <span className="text-stone-900">{formatPrice(shippingFee)}원</span>
                  </div>
                  <div className="pt-3 mt-3 border-t border-stone-200 flex justify-between">
                    <span className="text-stone-900 font-medium">총 결제 금액</span>
                    <span className="text-stone-900 font-medium">
                      {formatPrice(totalAmount)}원
                    </span>
                  </div>
                </div>
              </div>

              {/* 배송 안내 */}
              <div className="bg-amber-50 border border-amber-200 p-6 mb-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-900 mb-1">
                      배송 안내
                    </h3>
                    <p className="text-amber-800 text-sm">
                      오후 2시 이전 주문 시 당일 발송되며, 서울/경기 지역은 익일 배송됩니다.
                      <br />
                      배송 시작 시 알림톡으로 안내해 드립니다.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white border border-stone-200 p-8 text-center">
              <p className="text-stone-500">주문 정보를 불러올 수 없습니다.</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop/all">
              <Button variant="outline" size="lg">
                쇼핑 계속하기
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg">홈으로 돌아가기</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
