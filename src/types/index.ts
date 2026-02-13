export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
  is_available: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_address?: string;
  order_type: 'delivery' | 'pickup';
  total_amount: number;
  notes?: string;
}

export interface OrderItem {
  menu_item_id: string;
  quantity: number;
  price: number;
}
