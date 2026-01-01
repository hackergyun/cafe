# 프로젝트 구조 설명서

## 📚 기술 스택

- **프레임워크**: Next.js 16.1.0 (App Router)
- **언어**: TypeScript 5
- **스타일링**: Tailwind CSS 4
- **상태 관리**: React Context API (장바구니)
- **백엔드**: Firebase (Firestore, Admin SDK)
- **결제 시스템**: 네이버페이 (NaverPay), 포트원 (PortOne)
- **폰트**: Playfair Display (Google Fonts)

---

## 🗂️ 디렉토리 구조 및 설명

```
cafe/
├── src/
│   ├── app/                          # Next.js App Router 페이지 및 API 라우트
│   │   ├── page.tsx                  # 🏠 홈페이지 (Hero, 카테고리, 베스트 상품 섹션)
│   │   ├── layout.tsx                # 📐 루트 레이아웃 (Header, Footer, CartProvider)
│   │   ├── globals.css               # 🌐 전역 CSS 스타일
│   │   │
│   │   ├── admin/                    # 👨‍💼 관리자 페이지
│   │   │   └── orders/
│   │   │       └── page.tsx          # 주문 관리 페이지 (주문 목록, 상태 변경)
│   │   │
│   │   ├── api/                      # 🔌 API 라우트 (서버 사이드 엔드포인트)
│   │   │   ├── admin/
│   │   │   │   └── orders/
│   │   │   │       ├── route.ts      # 관리자 주문 조회 API
│   │   │   │       └── [id]/
│   │   │   │           └── status/
│   │   │   │               └── route.ts  # 주문 상태 변경 API
│   │   │   ├── orders/
│   │   │   │   └── create/
│   │   │   │       └── route.ts      # 주문 생성 API (Firestore 저장)
│   │   │   └── payments/             # 💳 결제 관련 API
│   │   │       ├── naverpay/
│   │   │       │   └── ready/
│   │   │       │       └── route.ts  # 네이버페이 결제 준비 API
│   │   │       └── portone/
│   │   │           ├── verify/
│   │   │           │   └── route.ts  # 포트원 결제 검증 API
│   │   │           └── webhook/
│   │   │               └── route.ts  # 포트원 웹훅 처리
│   │   │
│   │   ├── brand/
│   │   │   └── page.tsx              # 📖 브랜드 스토리 페이지
│   │   │
│   │   ├── cart/
│   │   │   └── page.tsx              # 🛒 장바구니 페이지
│   │   │
│   │   ├── checkout/
│   │   │   └── page.tsx              # 💰 결제 페이지 (주문 정보 입력, 결제)
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx              # 🔐 로그인 페이지
│   │   │
│   │   ├── order/
│   │   │   └── complete/
│   │   │       ├── page.tsx          # ✅ 주문 완료 페이지 (서버 컴포넌트)
│   │   │       └── OrderCompleteClient.tsx  # 주문 완료 클라이언트 컴포넌트
│   │   │
│   │   ├── pay/
│   │   │   └── portone/
│   │   │       └── redirect/
│   │   │           ├── page.tsx      # 🔄 포트원 결제 리다이렉트 페이지
│   │   │           └── RedirectClient.tsx
│   │   │
│   │   ├── policies/
│   │   │   └── page.tsx              # 📋 정책 페이지 (이용약관, 개인정보, 배송/환불, 사업자정보)
│   │   │
│   │   ├── product/
│   │   │   └── [id]/
│   │   │       └── page.tsx          # 📦 제품 상세 페이지 (동적 라우트)
│   │   │
│   │   └── shop/
│   │       └── [category]/           # 🏪 쇼핑몰 카테고리 페이지 (동적 라우트)
│   │           └── page.tsx          # 카테고리별 상품 목록 (all, cake, macaron, cookie, tart)
│   │
│   ├── components/                   # 🧩 재사용 가능한 UI 컴포넌트
│   │   ├── Header.tsx                # 🎯 헤더 네비게이션 (로고: "narijae financier", 메뉴, 장바구니 아이콘)
│   │   ├── Footer.tsx                # 📄 푸터 (브랜드 정보, 링크, 연락처, 정책 링크)
│   │   ├── ProductCard.tsx           # 🎴 제품 카드 컴포넌트 (이미지, 이름, 설명, 가격, BEST 뱃지)
│   │   └── Button.tsx                # 🔘 버튼 컴포넌트 (다양한 variant, size 지원)
│   │
│   ├── context/
│   │   └── CartContext.tsx           # 🛍️ 장바구니 Context (상태 관리: 추가, 삭제, 수량 변경)
│   │
│   ├── data/
│   │   └── products.ts               # 📦 제품 데이터 (카테고리, 상품 목록, 헬퍼 함수)
│   │                                #     - categories: 카테고리 배열 (케이크, 마카롱, 쿠키, 타르트)
│   │                                #     - products: 상품 배열 (id, name, price, category, description, imageUrl, isBest)
│   │                                #     - getProductsByCategory, getBestProducts, getProductById 등
│   │
│   ├── lib/                          # 🔧 유틸리티 및 라이브러리 설정
│   │   ├── admin/
│   │   │   └── auth.ts               # 관리자 인증 관련
│   │   └── firebase/
│   │       ├── admin.ts              # Firebase Admin SDK 초기화 (서버 사이드)
│   │       └── client.ts             # Firebase Client SDK 초기화 (클라이언트 사이드)
│   │
│   └── types/
│       └── index.ts                  # 📝 TypeScript 타입 정의
│                                #     - Product: 상품 타입
│                                #     - CartItem: 장바구니 아이템 타입
│                                #     - Category: 카테고리 타입
│                                #     - Order: 주문 타입
│                                #     - Payment: 결제 타입
│                                #     - OrderStatus, PaymentStatus 등
│
├── public/                           # 📁 정적 파일 (이미지, 아이콘 등)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── package.json                      # 📦 프로젝트 의존성 및 스크립트
├── tsconfig.json                     # ⚙️ TypeScript 설정
├── next.config.ts                    # ⚙️ Next.js 설정
├── tailwind.config.js / postcss.config.mjs  # ⚙️ Tailwind CSS 설정
└── eslint.config.mjs                 # ⚙️ ESLint 설정
```

---

## 🎯 주요 기능

### 1. **상품 관리**
- 제품 목록 표시 (카테고리별 필터링)
- 제품 상세 페이지
- 베스트 상품 추천
- 제품 검색 및 필터링

### 2. **장바구니**
- 상품 추가/삭제
- 수량 조절
- 장바구니 상태 관리 (Context API)

### 3. **주문 및 결제**
- 주문 정보 입력 (고객 정보, 배송지)
- 네이버페이/포트원 결제 연동
- 주문 완료 페이지
- 주문 상태 관리 (pending, confirmed, shipped, canceled)

### 4. **관리자 기능**
- 주문 목록 조회
- 주문 상태 변경

### 5. **페이지 구성**
- 홈페이지: Hero 섹션, 카테고리, 베스트 상품
- 쇼핑몰: 카테고리별 상품 목록
- 제품 상세: 상품 정보 및 구매 옵션
- 장바구니: 선택한 상품 목록 및 수량 조절
- 결제: 주문 정보 입력 및 결제 처리
- 주문 완료: 주문 확인 페이지
- 브랜드 스토리: 브랜드 소개
- 정책: 이용약관, 개인정보, 배송/환불, 사업자정보

---

## 🔑 변경 작업 가이드

### 로고 문구 변경
**파일**: `src/components/Header.tsx`
- 21번째 줄: `Mnarijae financier` 텍스트를 원하는 문구로 변경

**파일**: `src/components/Footer.tsx`
- 11번째 줄: `narijae financier` 텍스트를 원하는 문구로 변경 (푸터 로고)

### 제품 정보 변경
**파일**: `src/data/products.ts`
- `categories` 배열: 카테고리 정보 (name, description, imageUrl)
- `products` 배열: 제품 정보
  - `id`: 제품 고유 ID
  - `name`: 제품명
  - `price`: 가격 (원 단위)
  - `category`: 카테고리 ID
  - `description`: 제품 설명
  - `imageUrl`: 이미지 경로 (public 폴더 기준)
  - `isBest`: 베스트 상품 여부 (true/false)

### 제품 이미지 추가
1. 이미지를 `public/images/products/` 또는 `public/images/categories/` 폴더에 추가
2. `src/data/products.ts`의 `imageUrl` 필드를 해당 이미지 경로로 업데이트
   - 예: `/images/products/strawberry-cake.jpg`

---

## 🎨 디자인 시스템

- **컬러 팔레트**: Stone (회색 계열), Amber (황금색), Orange (오렌지)
- **폰트**: Playfair Display (서체), 시스템 폰트 (본문)
- **스타일**: 모던하고 세련된 디저트 전문점 느낌
- **레이아웃**: 반응형 디자인 (모바일, 태블릿, 데스크톱)

---

## 📝 참고사항

- 모든 제품 데이터는 현재 `src/data/products.ts`에 하드코딩되어 있음
- 이미지 파일은 `public/images/` 폴더에 저장되어야 함 (현재는 placeholder 그라데이션 사용)
- Firebase를 사용한 데이터베이스 연동은 주문/결제 기능에만 사용 중
- 제품 정보는 정적 데이터로 관리 중 (추후 데이터베이스 연동 가능)

