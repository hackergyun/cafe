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
        <p className="text-amber-700 text-sm tracking-[0.3em] uppercase mb-6">
  Financier Only
</p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-stone-900 leading-tight mb-8 animate-fade-in">
  베어 무는 순간 느껴지는
  <br />
  <span className="text-amber-700">
    프리미엄 AOP 버터의 풍미
  </span>
</h1>

<p className="text-stone-600 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
  겉은 <span className="font-medium text-stone-800">바삭</span>하고,
  속은 <span className="font-medium text-stone-800">쫀쫀</span>하게.
  <br />
  버터의 풍미가 진하게 살아있는 나리재 휘낭시에.
</p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <Link href="/shop/all">
            <Button size="lg">휘낭시에 보러가기</Button>
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
      {/* Landing Panels Section (from planning images) */}
<section className="bg-white">
  <div className="max-w-5xl mx-auto px-4 py-12">
    {[
      "/images/landing/01.jpg",
      "/images/landing/02.jpg",
      "/images/landing/03.jpg",
      "/images/landing/04.jpg",
      "/images/landing/05.jpg",
    ].map((src, idx) => (
      <div key={src} className="mb-10 last:mb-0">
        <img
          src={src}
          alt={`Narijae Financier panel ${idx + 1}`}
          className="w-full h-auto rounded-2xl shadow-sm border border-stone-200"
          loading="lazy"
        />
      </div>
    ))}
  </div>
</section>


     

      {/* Best Products Section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">
  Financier Lineup
</h2>
<p className="text-stone-600">
나리재의 시그니처 휘낭시에를 매일 갓 구워 전해드립니다.
</p>

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
