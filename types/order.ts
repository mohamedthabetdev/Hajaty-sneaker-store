export interface ProductVariant {
  id: string;
  label: string;
  /** How many physical pieces this bundle contains (1, 2, 3...) */
  quantity: number;
  price: number;
  originalPrice?: number;
  badge?: string;
  freeShipping?: boolean;
}

export interface Product {
  id: string;
  name: string;
  shortName: string;
  category: string;
  price: number;
  originalPrice: number;
  shipping: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  stockLeft: number;
  images: string[];
  variants: ProductVariant[];
  colors: string[];
  sizes: string[];
  features: { title: string; description: string; icon: string }[];
  description: {
    title: string;
    intro: string;
    highlights: { title: string; description: string; icon: string }[];
    boxContents: string[];
    closing: string;
  };
  taagerId: string;
}

/** Color + size chosen for a single physical piece inside a bundle. */
export interface PieceSelection {
  color?: string;
  size?: string;
}

export interface OrderFormData {
  name: string;
  phone: string;
  phone2?: string;
  governorate: string;
  address: string;
  quantity: number;
  variantId: string;
  /** One entry per physical piece in the selected bundle (length === variant.quantity). */
  pieceSelections: PieceSelection[];
  coupon?: string;
}

export interface OrderPayload extends OrderFormData {
  orderId?: string;
}

export interface OrderCalculation {
  unitPrice: number;
  totalProducts: number;
  shipping: number;
  grandTotal: number;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId?: string;
  message: string;
}
