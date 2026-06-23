/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, CartItem, Product } from './types';
import { PRODUCTS } from './data';
import Header from './components/Header';
import HomeView from './components/HomeView';
import ProductsView from './components/ProductsView';
import ContactView from './components/ContactView';
import OrderView from './components/OrderView';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('accueil');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize cart from localStorage if available
  useEffect(() => {
    const savedCart = localStorage.getItem('chromemax_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart data', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chromemax_cart', JSON.stringify(cart));
  }, [cart]);

  // Cart operations
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    // Open the cart drawer automatically for direct feedback!
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Switch to checkout and close drawer
  const handleCheckout = () => {
    setIsCartOpen(false);
    setActiveTab('commande');
  };

  return (
    <div id="app-root" className="min-h-screen bg-white text-stone-900 flex flex-col justify-between selection:bg-amber-500 selection:text-white antialiased font-sans">
      
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Main Views Container with smooth transitions */}
      <main id="main-content" className="flex-grow">
        {activeTab === 'accueil' && (
          <HomeView
            products={PRODUCTS}
            setActiveTab={setActiveTab}
            addToCart={addToCart}
          />
        )}

        {activeTab === 'produits' && (
          <ProductsView
            products={PRODUCTS}
            addToCart={addToCart}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'contact' && (
          <ContactView />
        )}

        {activeTab === 'commande' && (
          <OrderView
            cart={cart}
            products={PRODUCTS}
            addToCart={addToCart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Persistent Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* Footer component */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
