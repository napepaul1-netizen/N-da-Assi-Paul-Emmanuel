/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'Classic' | 'Sport' | 'Vintage' | 'Premium';
  price: number;
  imageUrl: string;
  rating: number;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: 'cod' | 'momo';
  cartItems: CartItem[];
  totalPrice: number;
  orderDate: string;
  status: 'pending' | 'confirmed';
}

export type ActiveTab = 'accueil' | 'produits' | 'contact' | 'commande';
