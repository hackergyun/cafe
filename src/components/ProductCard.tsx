"use client";

import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-stone-100 aspect-square mb-4">
        {/* Placeholder 이미지 - 실제 이미지가 없으므로 그라데이션 배경 사용 */}
        <div className="w-full h-full bg-gradient-to-br from-amber-100 via-orange-50 to-stone-200 flex items-center justify-center">
          <span className="text-stone-400 text-sm font-light tracking-widest">
            {product.name}
          </span>
        </div>
        {product.isBest && (
          <div className="absolute top-3 left-3 bg-amber-700 text-white text-xs px-3 py-1 tracking-wider">
            BEST
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>
      <div className="space-y-2">
        <h3 className="text-stone-800 font-medium group-hover:text-amber-700 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-stone-600 text-sm line-clamp-2">
          {product.description}
        </p>
        <p className="text-stone-900 font-semibold">
          {formatPrice(product.price)}원
        </p>
      </div>
    </Link>
  );
}




