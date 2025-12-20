import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Button from "@/components/Button";
import { categories, getBestProducts } from "@/data/products";

export default function Home() {
  const bestProducts = getBestProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-stone-200 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p
            className="text-amber-700 text-sm tracking-[0.3em] uppercase mb-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Artisan Desserts
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-stone-900 leading-tight mb-8 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            달콤한 순간,
            <br />
            <span className="text-amber-700">특별한 하루</span>
          </h1>
          <p
            className="text-stone-600 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            매일 아침, 신선한 재료로 정성껏 만드는 수제 디저트.
            <br />
            당신의 특별한 순간을 더욱 달콤하게 만들어 드립니다.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <Link href="/shop/all">
              <Button size="lg">전체 상품 보기</Button>
            </Link>
            <Link href="/brand">
              <Button variant="outline" size="lg">
                브랜드 스토리
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-stone-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-700 text-sm tracking-[0.2em] uppercase mb-4">
              Categories
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
              디저트 라인업
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/shop/${category.id}`}
                className="group relative aspect-[3/4] overflow-hidden bg-stone-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Placeholder Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-stone-200" />

                {/* Overlay */}
                <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/40 transition-all duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <h3 className="text-2xl md:text-3xl font-serif mb-2 group-hover:scale-110 transition-transform duration-500">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/80 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {category.description}
                  </p>
                </div>

                {/* Border Effect */}
                <div className="absolute inset-4 border border-white/30 group-hover:inset-6 transition-all duration-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Products Section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <p className="text-amber-700 text-sm tracking-[0.2em] uppercase mb-4">
                Best Sellers
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
                베스트 상품
              </h2>
            </div>
            <Link
              href="/shop/all"
              className="mt-6 md:mt-0 text-stone-600 hover:text-amber-700 text-sm tracking-wider uppercase flex items-center gap-2 transition-colors"
            >
              전체 보기
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {bestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-6">
            특별한 날을 위한 맞춤 주문
          </h2>
          <p className="text-stone-400 text-lg mb-10 max-w-2xl mx-auto">
            생일, 기념일, 웨딩 케이크 등 특별한 날을 위한 맞춤 디저트를
            주문하세요.
            <br />
            원하시는 디자인과 맛으로 제작해 드립니다.
          </p>
          <Link href="/shop/cake">
            <Button variant="secondary" size="lg">
              케이크 주문하기
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
