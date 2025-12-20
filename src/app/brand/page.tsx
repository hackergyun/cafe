import Link from "next/link";
import Button from "@/components/Button";

export default function BrandPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-stone-900">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-stone-900 to-stone-950" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <p className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-6">
            Our Story
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight mb-8">
            매일 아침,
            <br />
            정성을 담아
          </h1>
          <p className="text-stone-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            2015년 작은 공방에서 시작된 Maison Dessert는
            <br />
            최고의 재료와 장인 정신으로 디저트를 만들어갑니다.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-amber-700 text-sm tracking-[0.2em] uppercase mb-4">
                Philosophy
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-8">
                우리가 디저트를 만드는 이유
              </h2>
              <div className="space-y-6 text-stone-600 leading-relaxed">
                <p>
                  디저트는 단순한 음식이 아닙니다. 그것은 특별한 순간을 더욱
                  달콤하게 만들어주는 마법이자, 일상 속 작은 행복입니다.
                </p>
                <p>
                  우리는 매일 새벽 4시에 일어나 그날 사용할 재료를 준비합니다.
                  신선한 딸기, 프랑스에서 공수한 버터, 마다가스카르산 바닐라빈.
                  최고의 재료만이 최고의 디저트를 만들 수 있다고 믿기 때문입니다.
                </p>
                <p>
                  한 입 베어 물었을 때 느껴지는 행복한 미소.
                  그것이 우리가 디저트를 만드는 이유입니다.
                </p>
              </div>
            </div>
            <div className="aspect-square bg-gradient-to-br from-amber-100 via-orange-50 to-stone-200 flex items-center justify-center">
              <span className="text-stone-400 text-lg tracking-widest">
                CRAFTSMANSHIP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-700 text-sm tracking-[0.2em] uppercase mb-4">
              Our Values
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
              우리의 약속
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-amber-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-stone-900 mb-4">
                신선함
              </h3>
              <p className="text-stone-600 leading-relaxed">
                매일 아침 당일 판매분만 생산합니다.
                <br />
                남은 제품은 절대 다음 날 판매하지 않습니다.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-amber-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-stone-900 mb-4">
                장인 정신
              </h3>
              <p className="text-stone-600 leading-relaxed">
                10년 이상의 경력을 가진 파티시에가
                <br />
                한 분 한 분을 위해 정성껏 만듭니다.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-amber-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-stone-900 mb-4">
                진심
              </h3>
              <p className="text-stone-600 leading-relaxed">
                모든 디저트에 마음을 담습니다.
                <br />
                고객의 행복이 우리의 가장 큰 보람입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-700 text-sm tracking-[0.2em] uppercase mb-4">
              History
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
              우리의 여정
            </h2>
          </div>

          <div className="space-y-12">
            {[
              {
                year: "2015",
                title: "작은 시작",
                description:
                  "서울 연남동 작은 공방에서 Maison Dessert가 시작되었습니다.",
              },
              {
                year: "2017",
                title: "첫 번째 매장",
                description:
                  "많은 분들의 사랑 덕분에 연남동에 첫 번째 매장을 오픈했습니다.",
              },
              {
                year: "2019",
                title: "온라인 스토어 오픈",
                description:
                  "더 많은 분들께 디저트를 전달하기 위해 온라인 스토어를 오픈했습니다.",
              },
              {
                year: "2022",
                title: "강남 플래그십 스토어",
                description:
                  "브랜드의 새로운 도약을 위해 강남에 플래그십 스토어를 오픈했습니다.",
              },
              {
                year: "2024",
                title: "현재",
                description:
                  "여러분의 사랑에 보답하며, 매일 더 맛있는 디저트를 만들어가고 있습니다.",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-8">
                <div className="w-20 flex-shrink-0 text-right">
                  <span className="text-2xl font-serif text-amber-700">
                    {item.year}
                  </span>
                </div>
                <div className="relative flex-1 pb-8">
                  <div className="absolute left-0 top-2 w-3 h-3 bg-amber-700 rounded-full -translate-x-[22px]" />
                  <div className="border-l-2 border-stone-200 pl-8">
                    <h3 className="text-lg font-medium text-stone-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-stone-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-amber-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6">
            지금 만나보세요
          </h2>
          <p className="text-stone-600 text-lg mb-10 max-w-xl mx-auto">
            정성껏 만든 디저트로 당신의 하루를 더욱 달콤하게 만들어 드립니다.
          </p>
          <Link href="/shop/all">
            <Button size="lg">상품 둘러보기</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

