// src/types/index.ts

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

/** ✅ Stage 4-1: 주문/결제 상태 분리 */
export type OrderStatus = "pending" | "confirmed" | "shipped" | "canceled";

export type PaymentProvider = "naverpay_order";

export type PaymentStatus =
  | "unpaid"
  | "ready"
  | "paid"
  | "failed"
  | "canceled"
  | "refunded";

export interface OrderCustomer {
  name: string;
  phone: string;
}

export interface OrderShipping {
  address: string;
  addressDetail?: string;
  request?: string;
}

export interface OrderLineItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderPricing {
  subtotal: number;
  shippingFee: number;
  total: number;
}

export interface Payment {
  provider: PaymentProvider;
  status: PaymentStatus;

  /**
   * ✅ Stage 4-2~4-3에서 네이버페이 연동 시 채울 필드들(지금은 optional)
   * - tid/결제키/주문번호 매핑 등
   */
  merchantUid?: string; // 내부 주문번호(= orderNumber) 같은 값 넣어도 됨
  pgTransactionId?: string; // 네이버페이 거래키/ID 등
  requestedAt?: unknown; // Firestore Timestamp
  paidAt?: unknown; // Firestore Timestamp
  failReason?: string;
}

export interface Order {
  id: string; // Firestore doc id
  orderNumber: string;

  // ✅ 주문 상태(출고/처리)
  status: OrderStatus;

  // ✅ 결제 상태(네이버페이)
  payment: Payment;

  customer: OrderCustomer;
  shipping: OrderShipping;
  items: OrderLineItem[];
  pricing: OrderPricing;

  createdAt?: unknown; // Firestore Timestamp
  updatedAt?: unknown; // Firestore Timestamp
}

