"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    addressDetail: "",
    request: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 장바구니가 비어있으면 /cart로 리다이렉트
  useEffect(() => {
    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [items, router]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 실제 결제 로직 없이 주문 완료 페이지로 이동
    setTimeout(() => {
      router.push("/order/complete");
    }, 500);
  };

  const shippingFee = getTotalPrice() >= 50000 ? 0 : 3000;
  const totalAmount = getTotalPrice() + shippingFee;

  // 장바구니가 비어있으면 렌더링하지 않음
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900">
            주문하기
          </h1>
          <p className="text-stone-500 mt-4">
            배송 정보를 입력해주세요
          </p>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Order Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* 주문자 정보 */}
                <div className="bg-white border border-stone-200 p-8">
                  <h2 className="text-lg font-medium text-stone-900 mb-6">
                    주문자 정보
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm text-stone-600 mb-2"
                      >
                        이름 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors"
                        placeholder="홍길동"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm text-stone-600 mb-2"
                      >
                        연락처 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors"
                        placeholder="010-1234-5678"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 배송지 정보 */}
                <div className="bg-white border border-stone-200 p-8">
                  <h2 className="text-lg font-medium text-stone-900 mb-6">
                    배송지 정보
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm text-stone-600 mb-2"
                      >
                        주소 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors"
                        placeholder="서울특별시 강남구 테헤란로 123"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="addressDetail"
                        className="block text-sm text-stone-600 mb-2"
                      >
                        상세주소
                      </label>
                      <input
                        type="text"
                        id="addressDetail"
                        name="addressDetail"
                        value={formData.addressDetail}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors"
                        placeholder="101동 1001호"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="request"
                        className="block text-sm text-stone-600 mb-2"
                      >
                        배송 요청사항
                      </label>
                      <textarea
                        id="request"
                        name="request"
                        value={formData.request}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors resize-none"
                        placeholder="부재 시 경비실에 맡겨주세요"
                      />
                    </div>
                  </div>
                </div>

                {/* 주문 상품 */}
                <div className="bg-white border border-stone-200 p-8">
                  <h2 className="text-lg font-medium text-stone-900 mb-6">
                    주문 상품 ({items.length}개)
                  </h2>

                  <div className="divide-y divide-stone-200">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="py-4 first:pt-0 last:pb-0 flex gap-4"
                      >
                        {/* Image */}
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-100 via-orange-50 to-stone-200 flex-shrink-0 flex items-center justify-center">
                          <span className="text-stone-400 text-[8px] text-center px-1">
                            {item.product.name}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-stone-900 font-medium truncate">
                            {item.product.name}
                          </p>
                          <p className="text-stone-500 text-sm mt-1">
                            {formatPrice(item.product.price)}원 × {item.quantity}개
                          </p>
                        </div>

                        {/* Price */}
                        <p className="text-stone-900 font-medium whitespace-nowrap">
                          {formatPrice(item.product.price * item.quantity)}원
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-stone-200 p-8 sticky top-28">
                  <h2 className="text-lg font-medium text-stone-900 mb-6">
                    결제 금액
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-stone-600">
                      <span>상품 금액</span>
                      <span>{formatPrice(getTotalPrice())}원</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>배송비</span>
                      <span>{shippingFee === 0 ? "무료" : `${formatPrice(shippingFee)}원`}</span>
                    </div>
                  </div>

                  <div className="border-t border-stone-200 pt-6 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-900 font-medium">총 결제 금액</span>
                      <span className="text-2xl font-semibold text-stone-900">
                        {formatPrice(totalAmount)}원
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "주문 처리 중..." : "주문하기"}
                  </Button>

                  <p className="text-xs text-stone-500 text-center mt-4">
                    주문 내용을 확인하였으며, 결제에 동의합니다.
                  </p>

                  <div className="mt-6 pt-6 border-t border-stone-200">
                    <Link
                      href="/cart"
                      className="text-sm text-stone-500 hover:text-stone-900 flex items-center justify-center gap-2 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                        />
                      </svg>
                      장바구니로 돌아가기
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

