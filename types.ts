export interface Variant {
  weight: string;
  price: number;
  mrp: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  variants: Variant[];
  discount: number;
  description: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  selectedVariantIndex: number;
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  address: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Pending' | 'Processing' | 'Delivered';
  paymentMethod: 'COD' | 'UPI';
}

export enum PaymentMethod {
  COD = 'Cash on Delivery',
  UPI = 'UPI / QR Code',
}

export interface FilterState {
  category: string[];
  minPrice: number;
  maxPrice: number;
  sort: 'popularity' | 'priceLow' | 'priceHigh' | 'new';
}
