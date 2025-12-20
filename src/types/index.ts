export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  isBest: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

