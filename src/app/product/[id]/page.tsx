"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import { useCart } from "@/context/CartContext";
import { getProductById, getCategoryById } from "@/data/products";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const product = getProductById(params.id as string);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-stone-900 mb-4">
            상품을 찾을 수 없습니다
          </h1>
          <Link href="/shop/all" className="text-amber-700 hover:underline">
            상품 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const category = getCategoryById(product.category);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-900 transition-colors">
            홈
          </Link>
          <span>/</span>
          <Link
            href="/shop/all"
            className="hover:text-stone-900 transition-colors"
          >
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/shop/${product.category}`}
            className="hover:text-stone-900 transition-colors"
          >
            {category?.name}
          </Link>
          <span>/</span>
          <span className="text-stone-900">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="aspect-square bg-gradient-to-br from-amber-100 via-orange-50 to-stone-200 flex items-center justify-center relative">
            <span className="text-stone-400 text-lg font-light tracking-widest text-center px-8">
              {product.name}
            </span>
            {product.isBest && (
              <div className="absolute top-6 left-6 bg-amber-700 text-white text-sm px-4 py-2 tracking-wider">
                BEST
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:py-8">
            {/* Category */}
            <Link
              href={`/shop/${product.category}`}
              className="text-amber-700 text-sm tracking-[0.2em] uppercase hover:underline"
            >
              {category?.name}
            </Link>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mt-4 mb-6">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-2xl font-semibold text-stone-900 mb-8">
              {formatPrice(product.price)}원
            </p>

            {/* Description */}
            <div className="border-t border-stone-200 pt-8 mb-8">
              <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wider mb-4">
                상품 설명
              </h3>
              <p className="text-stone-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity */}
            <div className="border-t border-stone-200 pt-8 mb-8">
              <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wider mb-4">
                수량
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-12 border border-stone-300 flex items-center justify-center text-stone-600 hover:border-stone-900 hover:text-stone-900 transition-colors"
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
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span className="w-12 text-center text-lg font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-12 border border-stone-300 flex items-center justify-center text-stone-600 hover:border-stone-900 hover:text-stone-900 transition-colors"
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
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="bg-stone-50 p-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-stone-600">총 상품 금액</span>
                <span className="text-2xl font-semibold text-stone-900">
                  {formatPrice(product.price * quantity)}원
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                className="relative"
              >
                {isAdded ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-600"
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
                    담았습니다!
                  </span>
                ) : (
                  "장바구니 담기"
                )}
              </Button>
              <Button size="lg" fullWidth onClick={handleBuyNow}>
                바로 구매하기
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="mt-10 pt-8 border-t border-stone-200">
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="text-stone-900 font-medium mb-2">배송 안내</h4>
                  <p className="text-stone-500">
                    오후 2시 이전 주문 시 당일 발송
                    <br />
                    서울/경기 익일 배송
                  </p>
                </div>
                <div>
                  <h4 className="text-stone-900 font-medium mb-2">픽업 안내</h4>
                  <p className="text-stone-500">
                    매장 픽업 가능
                    <br />
                    주문 시 픽업 일시 선택
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





