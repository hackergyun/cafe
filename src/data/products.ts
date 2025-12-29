import { Product, Category } from "@/types";

export const categories: Category[] = [
  {
    id: "cake",
    name: "케이크",
    description: "특별한 날을 위한 수제 케이크",
    imageUrl: "/images/categories/cake.jpg",
  },
  {
    id: "macaron",
    name: "마카롱",
    description: "프랑스 정통 방식의 마카롱",
    imageUrl: "/images/categories/macaron.jpg",
  },
  {
    id: "cookie",
    name: "쿠키",
    description: "바삭하고 촉촉한 수제 쿠키",
    imageUrl: "/images/categories/cookie.jpg",
  },
  {
    id: "tart",
    name: "타르트",
    description: "신선한 과일과 크림의 조화",
    imageUrl: "/images/categories/tart.jpg",
  },
];

export const products: Product[] = [
  // 케이크
  {
    id: "cake-001",
    name: "클래식 딸기 쇼트케이크",
    price: 45000,
    category: "cake",
    description:
      "신선한 딸기와 부드러운 생크림이 어우러진 클래식한 쇼트케이크입니다. 촉촉한 시트 위에 딸기와 생크림이 층층이 쌓여 있습니다.",
    imageUrl: "/images/products/strawberry-cake.jpg",
    isBest: true,
  },
  {
    id: "cake-002",
    name: "다크 초콜릿 가나슈 케이크",
    price: 52000,
    category: "cake",
    description:
      "진한 다크 초콜릿 가나슈로 코팅된 럭셔리 케이크입니다. 초콜릿 시트와 가나슈의 완벽한 조화를 느껴보세요.",
    imageUrl: "/images/products/chocolate-cake.jpg",
    isBest: true,
  },
  {
    id: "cake-003",
    name: "얼그레이 당근 케이크",
    price: 38000,
    category: "cake",
    description:
      "향긋한 얼그레이 티와 신선한 당근이 만난 특별한 케이크입니다. 크림치즈 프로스팅이 올려져 있습니다.",
    imageUrl: "/images/products/carrot-cake.jpg",
    isBest: false,
  },
  {
    id: "cake-004",
    name: "레몬 파운드 케이크",
    price: 28000,
    category: "cake",
    description:
      "상큼한 레몬 향이 가득한 촉촉한 파운드 케이크입니다. 레몬 글레이즈로 마무리되어 있습니다.",
    imageUrl: "/images/products/lemon-cake.jpg",
    isBest: false,
  },

  // 마카롱
  {
    id: "macaron-001",
    name: "바닐라 마카롱 (6개입)",
    price: 18000,
    category: "macaron",
    description:
      "마다가스카르산 바닐라를 사용한 정통 프렌치 마카롱입니다. 겉은 바삭하고 속은 촉촉합니다.",
    imageUrl: "/images/products/vanilla-macaron.jpg",
    isBest: true,
  },
  {
    id: "macaron-002",
    name: "피스타치오 마카롱 (6개입)",
    price: 20000,
    category: "macaron",
    description:
      "시칠리아산 피스타치오를 갈아 만든 고급 마카롱입니다. 진한 피스타치오 향이 일품입니다.",
    imageUrl: "/images/products/pistachio-macaron.jpg",
    isBest: false,
  },
  {
    id: "macaron-003",
    name: "솔티드 카라멜 마카롱 (6개입)",
    price: 18000,
    category: "macaron",
    description:
      "달콤하고 짭짤한 솔티드 카라멜 필링이 들어간 마카롱입니다. 단짠의 완벽한 밸런스를 느껴보세요.",
    imageUrl: "/images/products/caramel-macaron.jpg",
    isBest: true,
  },
  {
    id: "macaron-004",
    name: "로즈 마카롱 (6개입)",
    price: 19000,
    category: "macaron",
    description:
      "은은한 장미향이 매력적인 마카롱입니다. 로즈워터와 로즈 버터크림으로 만들어졌습니다.",
    imageUrl: "/images/products/rose-macaron.jpg",
    isBest: false,
  },

  // 쿠키
  {
    id: "cookie-001",
    name: "청크 초콜릿 쿠키 (5개입)",
    price: 15000,
    category: "cookie",
    description:
      "큼직한 초콜릿 청크가 박힌 아메리칸 스타일 쿠키입니다. 겉은 바삭, 속은 촉촉합니다.",
    imageUrl: "/images/products/chocolate-cookie.jpg",
    isBest: true,
  },
  {
    id: "cookie-002",
    name: "말차 화이트초코 쿠키 (5개입)",
    price: 16000,
    category: "cookie",
    description:
      "제주 말차와 화이트 초콜릿이 조화로운 프리미엄 쿠키입니다. 쌉싸름하고 달콤한 맛입니다.",
    imageUrl: "/images/products/matcha-cookie.jpg",
    isBest: false,
  },
  {
    id: "cookie-003",
    name: "오트밀 레이즌 쿠키 (5개입)",
    price: 14000,
    category: "cookie",
    description:
      "건강한 오트밀과 달콤한 건포도가 들어간 홈메이드 스타일 쿠키입니다.",
    imageUrl: "/images/products/oatmeal-cookie.jpg",
    isBest: false,
  },
  {
    id: "cookie-004",
    name: "브라우니 쿠키 (5개입)",
    price: 16000,
    category: "cookie",
    description:
      "브라우니와 쿠키의 만남! 진한 초콜릿 풍미의 쫀득한 브라우니 쿠키입니다.",
    imageUrl: "/images/products/brownie-cookie.jpg",
    isBest: false,
  },

  // 타르트
  {
    id: "tart-001",
    name: "레몬 머랭 타르트",
    price: 8000,
    category: "tart",
    description:
      "상큼한 레몬 커드와 구운 머랭이 올려진 클래식 타르트입니다. 새콤달콤한 맛이 일품입니다.",
    imageUrl: "/images/products/lemon-tart.jpg",
    isBest: true,
  },
  {
    id: "tart-002",
    name: "딸기 크림치즈 타르트",
    price: 9000,
    category: "tart",
    description:
      "신선한 딸기와 부드러운 크림치즈 무스가 올려진 타르트입니다. 바삭한 타르트지가 매력적입니다.",
    imageUrl: "/images/products/strawberry-tart.jpg",
    isBest: false,
  },
  {
    id: "tart-003",
    name: "에그 타르트 (3개입)",
    price: 12000,
    category: "tart",
    description:
      "겹겹이 층이 진 바삭한 페이스트리 안에 부드러운 에그 커스터드가 가득한 타르트입니다.",
    imageUrl: "/images/products/egg-tart.jpg",
    isBest: true,
  },
  {
    id: "tart-004",
    name: "카라멜 호두 타르트",
    price: 8500,
    category: "tart",
    description:
      "고소한 호두와 달콤한 카라멜이 가득 채워진 타르트입니다. 진한 풍미를 느껴보세요.",
    imageUrl: "/images/products/walnut-tart.jpg",
    isBest: false,
  },
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getBestProducts = (): Product[] => {
  return products.filter((product) => product.isBest);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((category) => category.id === id);
};





