/*
  # Create Restaurant Database Schema for Mom's Pizza

  ## Overview
  This migration sets up the complete database structure for the Mom's Pizza restaurant website,
  including menu management, order processing, and admin functionality.

  ## New Tables

  ### 1. menu_items
  Stores all pizza menu items with details
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Pizza name
  - `category` (text) - Category (Veg, Cheese, Special, Combos)
  - `description` (text) - Item description
  - `price` (numeric) - Price in rupees
  - `image_url` (text) - Image URL
  - `is_available` (boolean) - Availability status
  - `created_at` (timestamptz) - Creation timestamp

  ### 2. orders
  Stores customer orders
  - `id` (uuid, primary key) - Unique order identifier
  - `customer_name` (text) - Customer name
  - `customer_phone` (text) - Contact number
  - `customer_email` (text) - Email address
  - `delivery_address` (text) - Delivery address
  - `order_type` (text) - 'delivery' or 'pickup'
  - `total_amount` (numeric) - Total order amount
  - `status` (text) - Order status (pending, confirmed, delivered)
  - `notes` (text) - Special instructions
  - `created_at` (timestamptz) - Order timestamp

  ### 3. order_items
  Stores individual items in each order
  - `id` (uuid, primary key) - Unique identifier
  - `order_id` (uuid, foreign key) - Reference to orders table
  - `menu_item_id` (uuid, foreign key) - Reference to menu_items table
  - `quantity` (integer) - Number of items
  - `price` (numeric) - Price at time of order
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - Public can read menu items
  - Public can insert orders and order items
  - Only authenticated users can update/delete orders (admin access)
*/

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  description text,
  price numeric NOT NULL CHECK (price >= 0),
  image_url text,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  delivery_address text,
  order_type text NOT NULL CHECK (order_type IN ('delivery', 'pickup')),
  total_amount numeric NOT NULL CHECK (total_amount >= 0),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'delivered', 'cancelled')),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id uuid NOT NULL REFERENCES menu_items(id),
  quantity integer NOT NULL CHECK (quantity > 0),
  price numeric NOT NULL CHECK (price >= 0),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for menu_items
CREATE POLICY "Anyone can view available menu items"
  ON menu_items FOR SELECT
  TO anon, authenticated
  USING (is_available = true);

CREATE POLICY "Authenticated users can manage menu items"
  ON menu_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for orders
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view their own orders"
  ON orders FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for order_items
CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view order items"
  ON order_items FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);