export interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  role?: string;
  phone?: string;
  street_address?: string;
  landmark?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  price: number | null;
  stock: number;
  is_featured: boolean;
  video_url: string | null;
  rating: number;
  review_count: number;
  created_at: string;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  size: string | null;
  color: string | null;
  price: number;
  stock: number;
  sku: string | null;
  created_at: string;
  products?: Product;
}

export interface CartItem {
  id: number;
  user_id: string;
  variant_id: number;
  quantity: number;
  created_at: string;
  product_variants?: ProductVariant & {
    products: Product;
  };
}

export interface ShippingAddress {
  street_address: string;
  landmark?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface Order {
  id: number;
  user_id: string;
  total_amount: number;
  status: string;
  shipping_address: ShippingAddress;
  created_at: string;
  voucher_id?: string;
  discount_amount?: number;
  final_amount?: number;
}
