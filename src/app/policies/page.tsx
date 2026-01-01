import Link from "next/link";

export default function PoliciesPage() {
  return (
    <div className="bg-stone-50">
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-14">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900">
            이용약관 · 개인정보처리방침 · 배송/교환/환불 · 사업자 정보
          </h1>
          <p className="text-stone-500 mt-3 text-sm leading-relaxed">
            본 페이지는 narijae financier(나리재 휘낭시에) 온라인 주문 서비스 운영을
            위한 기본 정책을 안내합니다. (MVP 단계 더미 내용 포함)
          </p>

          {/* 빠른 이동 */}
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a
              href="#terms"
              className="px-3 py-2 bg-white border border-stone-200 hover:border-stone-300 text-stone-700"
            >
              이용약관
            </a>
            <a
              href="#privacy"
              className="px-3 py-2 bg-white border border-stone-200 hover:border-stone-300 text-stone-700"
            >
              개인정보처리방침
            </a>
            <a
              href="#delivery"
              className="px-3 py-2 bg-white border border-stone-200 hover:border-stone-300 text-stone-700"
            >
              배송·교환·환불
            </a>
            <a
              href="#business"
              className="px-3 py-2 bg-white border border-stone-200 hover:border-stone-300 text-stone-700"
            >
              사업자 정보
            </a>
          </div>
        </div>

        {/* 이용약관 */}
        <article id="terms" className="bg-white border border-stone-200 p-8">
          <h2 className="text-xl font-medium text-stone-900">이용약관</h2>
          <p className="text-stone-500 text-sm mt-2">
            (MVP용 간단 약관. 실제 운영 전 문구 정교화 권장)
          </p>

          <div className="mt-6 space-y-5 text-sm leading-relaxed text-stone-700">
            <section>
              <h3 className="font-medium text-stone-900">제1조 (목적)</h3>
              <p className="mt-2">
                본 약관은 narijae financier(이하 “회사”)가 제공하는 온라인 주문
                서비스(이하 “서비스”) 이용과 관련하여 회사와 이용자의 권리·의무
                및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h3 className="font-medium text-stone-900">제2조 (정의)</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>“이용자”란 서비스에 접속하여 본 약관에 따라 이용하는 자</li>
                <li>
                  “주문”이란 이용자가 상품을 선택하고 결제(또는 결제대기)를 통해
                  구매 의사를 표시하는 행위
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-medium text-stone-900">
                제3조 (서비스 제공 및 변경)
              </h3>
              <p className="mt-2">
                회사는 상품 판매, 주문 접수, 배송 안내 등의 서비스를 제공하며,
                운영상·기술상 필요에 따라 서비스 내용을 변경할 수 있습니다.
              </p>
            </section>

            <section>
              <h3 className="font-medium text-stone-900">
                제4조 (주문 성립 및 취소)
              </h3>
              <p className="mt-2">
                주문은 이용자가 결제(또는 결제대기) 절차를 완료하고 회사가 이를
                확인한 시점에 성립합니다. 상품 특성(신선식품/제작상품)상, 제작
                진행 이후에는 취소가 제한될 수 있으며 자세한 내용은 “배송·교환·환불
                정책”을 따릅니다.
              </p>
            </section>

            <section>
              <h3 className="font-medium text-stone-900">
                제5조 (면책 및 책임 제한)
              </h3>
              <p className="mt-2">
                회사는 천재지변, 물류사 사정 등 불가항력적 사유로 인한 지연·중단에
                대하여 책임을 제한할 수 있습니다. 다만, 회사의 고의 또는 중대한
                과실이 있는 경우는 예외로 합니다.
              </p>
            </section>

            <section>
              <h3 className="font-medium text-stone-900">제6조 (준거법)</h3>
              <p className="mt-2">
                본 약관과 서비스 이용에 관한 분쟁은 대한민국 법령을 준거법으로 합니다.
              </p>
            </section>
          </div>
        </article>

        {/* 개인정보처리방침 */}
        <article
          id="privacy"
          className="bg-white border border-stone-200 p-8 mt-8"
        >
          <h2 className="text-xl font-medium text-stone-900">
            개인정보처리방침
          </h2>
          <p className="text-stone-500 text-sm mt-2">
            (MVP용 요약. 실제 운영 전 수집항목/보유기간/위탁 여부 확정 필요)
          </p>

          <div className="mt-6 space-y-5 text-sm leading-relaxed text-stone-700">
            <section>
              <h3 className="font-medium text-stone-900">
                1) 수집하는 개인정보 항목
              </h3>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>주문 시: 이름, 연락처, 배송지 주소, 배송 요청사항</li>
                <li>결제 시: 결제 수단 관련 정보(결제사에서 처리될 수 있음)</li>
                <li>
                  서비스 개선: 접속 로그, 이용 기록, 쿠키 정보(선택적으로 활용)
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-medium text-stone-900">2) 이용 목적</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>주문 접수, 결제 처리, 배송 및 CS 처리</li>
                <li>부정 이용 방지 및 서비스 품질 개선</li>
              </ul>
            </section>

            <section>
              <h3 className="font-medium text-stone-900">
                3) 보유 및 이용 기간
              </h3>
              <p className="mt-2">
                원칙적으로 개인정보는 목적 달성 후 지체 없이 파기합니다. 단,
                관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안 보관할 수 있습니다.
              </p>
            </section>

            <section>
              <h3 className="font-medium text-stone-900">
                4) 제3자 제공 및 처리 위탁
              </h3>
              <p className="mt-2">
                배송/결제 처리를 위해 결제사 및 배송사 등에 정보가 제공되거나 처리가
                위탁될 수 있습니다. (Stage 4 네이버페이 연동 시 항목 구체화)
              </p>
            </section>

            <section>
              <h3 className="font-medium text-stone-900">5) 이용자 권리</h3>
              <p className="mt-2">
                이용자는 개인정보 열람, 정정, 삭제, 처리정지 등을 요청할 수 있으며,
                문의는 아래 사업자 정보의 고객센터로 연락 바랍니다.
              </p>
            </section>
          </div>
        </article>

        {/* 배송/교환/환불 */}
        <article
          id="delivery"
          className="bg-white border border-stone-200 p-8 mt-8"
        >
          <h2 className="text-xl font-medium text-stone-900">
            배송 · 교환 · 환불 정책
          </h2>
          <p className="text-stone-500 text-sm mt-2">
            디저트(신선/제작 상품) 특성 반영 MVP 기준 정책입니다.
          </p>

          <div className="mt-6 space-y-5 text-sm leading-relaxed text-stone-700">
            <section>
              <h3 className="font-medium text-stone-900">1) 배송 안내</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>배송 일정: 결제 확인 후 순차 출고 (예: 1~3영업일)</li>
                <li>배송비: 주문 페이지 안내 기준</li>
                <li>
                  냉장/냉동 상품의 경우 배송 중 온도 변화가 발생할 수 있으며, 상품
                  상태는 수령 즉시 확인해 주세요.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-medium text-stone-900">
                2) 교환/환불이 가능한 경우
              </h3>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>오배송(주문 상품과 다른 상품 수령)</li>
                <li>파손/변질 등 하자 발생(수령 직후 확인 필요)</li>
                <li>기타 회사의 귀책 사유가 명백한 경우</li>
              </ul>
              <p className="mt-2 text-stone-500">
                ※ 수령 후 가능한 빠른 시간 내(예: 24시간 이내) 사진과 함께 문의 바랍니다.
              </p>
            </section>

            <section>
              <h3 className="font-medium text-stone-900">
                3) 교환/환불이 제한되는 경우
              </h3>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>단순 변심(식품/신선 상품 특성상)</li>
                <li>수령 후 보관 부주의로 인한 변질</li>
                <li>수령 후 일정 시간이 경과하여 상태 확인이 어려운 경우</li>
              </ul>
            </section>

            <section>
              <h3 className="font-medium text-stone-900">4) 문의 방법</h3>
              <p className="mt-2">
                아래 사업자 정보의 연락처로 주문번호와 함께 문의해 주세요. 빠르게 확인 후 안내드리겠습니다.
              </p>
            </section>
          </div>
        </article>

        {/* 사업자 정보 */}
        <article
          id="business"
          className="bg-white border border-stone-200 p-8 mt-8"
        >
          <h2 className="text-xl font-medium text-stone-900">사업자 정보</h2>
          <p className="text-stone-500 text-sm mt-2">
            (더미 정보 — 누나 사업자 정보 받으면 교체)
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-stone-700">
            <div className="space-y-2">
              <div>
                <span className="text-stone-500">상호</span>
                <div className="mt-1 font-medium text-stone-900">
                  narijae financier
                </div>
              </div>
              <div>
                <span className="text-stone-500">대표자</span>
                <div className="mt-1">홍길동</div>
              </div>
              <div>
                <span className="text-stone-500">사업자등록번호</span>
                <div className="mt-1">123-45-67890</div>
              </div>
              <div>
                <span className="text-stone-500">통신판매업 신고번호</span>
                <div className="mt-1">제2025-서울강남-00000호</div>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-stone-500">주소</span>
                <div className="mt-1">서울특별시 강남구 테헤란로 123</div>
              </div>
              <div>
                <span className="text-stone-500">고객센터</span>
                <div className="mt-1">02-1234-5678</div>
              </div>
              <div>
                <span className="text-stone-500">이메일</span>
                <div className="mt-1">hello@narijaefinancier.kr</div>
              </div>
              <div>
                <span className="text-stone-500">운영시간</span>
                <div className="mt-1">평일 10:00 - 18:00 (주말/공휴일 휴무)</div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs text-stone-500">
            홈으로 돌아가기:{" "}
            <Link href="/" className="underline hover:text-stone-700">
              메인 페이지
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
