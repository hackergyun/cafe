import { Product, Category } from "@/types";

export const categories: Category[] = [
  {
    id: "financier",
    name: "휘낭시에",
    description: "갓 구운 휘낭시에만 판매합니다.",
    imageUrl: "/images/categories/financier.jpg", // 없으면 일단 유지/비워도 됨 (UI가 어떻게 쓰는지 보고 결정)
  },
];


export const products: Product[] = [
  // ✅ 실사진 4개 (임시명/임시가격/임시카테고리)
  {
    id: "nf-001",
    name: "휘낭시에 (소보로크럼블)",
    price: 3000, // TODO: 가격 확정 후 수정
    category: "financier",
    description: "고소하고 촉촉한 식감의 휘낭시에 (상세 준비중)",
    imageUrl: "/images/products/nf-001.jpg",
    isBest: true,
  },
  {
    id: "nf-002",
    name: "휘낭시에 (플레인)",
    price: 3000,
    category: "financier",
    description: "겉은 바삭, 속은 촉촉한 휘낭시에 (상세 준비중)",
    imageUrl: "/images/products/nf-002.jpg",
    isBest: true,
  },
  {
    id: "nf-003",
    name: "휘낭시에 (발로나초코칩)",
    price: 3000,
    category: "financier",
    description: "풍미 가득한 휘낭시에 (상세 준비중)",
    imageUrl: "/images/products/nf-003.jpg",
    isBest: false,
  },
  {
    id: "nf-004",
    name: "휘낭시에 (아몬드크로칸트)",
    price: 3000,
    category: "financier",
    description: "진한 맛의 휘낭시에 (상세 준비중)",
    imageUrl: "/images/products/nf-004.jpg",
    isBest: false,
  },

  // ⏳ 준비중 2개 (사진 없음)
  {
    id: "nf-005",
    name: "휘낭시에 (솔티드초코)",
    price: 3000,
    category: "financier",
    description: "준비중입니다. 곧 공개됩니다.",
    imageUrl: "", // 이미지 준비되면 경로만 채우면 됨
    isBest: false,
  },
  {
    id: "nf-006",
    name: "휘낭시에 (솔티드카라멜)",
    price: 3000,
    category: "financier",
    description: "준비중입니다. 곧 공개됩니다.",
    imageUrl: "",
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





