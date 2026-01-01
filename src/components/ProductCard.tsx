"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const isPreparing = !product.imageUrl;

  return (
    <Link
      href={!isPreparing ? `/product/${product.id}` : "#"}
      onClick={(e) => {
        if (isPreparing) e.preventDefault();
      }}
      className="group block"
      aria-disabled={isPreparing}
    >
      <div className="relative overflow-hidden bg-stone-100 aspect-square mb-4">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-100 via-orange-50 to-stone-200 flex items-center justify-center">
            <span className="text-stone-400 text-sm font-light tracking-widest">
              준비중
            </span>
          </div>
        )}

        {isPreparing && (
          <div className="absolute top-3 left-3 bg-stone-900/80 text-white text-xs px-3 py-1 tracking-wider">
            준비중
          </div>
        )}

        {product.isBest && !isPreparing && (
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
        {isPreparing ? "준비중" : product.price > 0 ? `${formatPrice(product.price)}원` : "가격 준비중"}
        </p>
      </div>
    </Link>
  );
}
