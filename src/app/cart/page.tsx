"use client";

import Link from "next/link";
import Button from "@/components/Button";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-24 h-24 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-12 h-12 text-stone-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-serif text-stone-900 mb-4">
            장바구니가 비어있습니다
          </h1>
          <p className="text-stone-500 mb-8">
            맛있는 디저트를 담아보세요!
          </p>
          <Link href="/shop/all">
            <Button>상품 둘러보기</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900">
            장바구니
          </h1>
          <p className="text-stone-500 mt-4">{items.length}개의 상품</p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-6 flex gap-6 border border-stone-200"
                >
                  {/* Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-amber-100 via-orange-50 to-stone-200 flex-shrink-0 flex items-center justify-center">
                    <span className="text-stone-400 text-xs text-center px-2">
                      {item.product.name}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <Link
                        href={`/product/${item.product.id}`}
                        className="font-medium text-stone-900 hover:text-amber-700 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-400 hover:text-stone-900 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <p className="text-stone-500 text-sm mb-4">
                      {formatPrice(item.product.price)}원
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-8 h-8 border border-stone-300 flex items-center justify-center text-stone-600 hover:border-stone-900 hover:text-stone-900 transition-colors text-sm"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-8 h-8 border border-stone-300 flex items-center justify-center text-stone-600 hover:border-stone-900 hover:text-stone-900 transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal */}
                      <p className="font-semibold text-stone-900">
                        {formatPrice(item.product.price * item.quantity)}원
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                className="text-stone-500 hover:text-stone-900 text-sm underline transition-colors"
              >
                장바구니 비우기
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-stone-200 p-8 sticky top-28">
                <h2 className="text-lg font-medium text-stone-900 mb-6">
                  주문 요약
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-stone-600">
                    <span>상품 금액</span>
                    <span>{formatPrice(getTotalPrice())}원</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>배송비</span>
                    <span>
                      {getTotalPrice() >= 50000 ? "무료" : "3,000원"}
                    </span>
                  </div>
                  {getTotalPrice() < 50000 && (
                    <p className="text-xs text-amber-700">
                      {formatPrice(50000 - getTotalPrice())}원 더 구매 시 무료배송!
                    </p>
                  )}
                </div>

                <div className="border-t border-stone-200 pt-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-900 font-medium">총 결제 금액</span>
                    <span className="text-2xl font-semibold text-stone-900">
                      {formatPrice(
                        getTotalPrice() + (getTotalPrice() >= 50000 ? 0 : 3000)
                      )}
                      원
                    </span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button fullWidth size="lg">
                    주문하기
                  </Button>
                </Link>

                <p className="text-xs text-stone-500 text-center mt-4">
                  주문하기 버튼을 클릭하면 주문 페이지로 이동합니다
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

