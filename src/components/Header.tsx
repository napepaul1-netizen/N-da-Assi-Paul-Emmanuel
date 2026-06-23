/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { ActiveTab, CartItem } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
}

export default function Header({ activeTab, setActiveTab, cart, setIsCartOpen }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'accueil', label: 'ACCUEIL' },
    { id: 'produits', label: 'PRODUITS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header id="app-header" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand */}
          <button 
            id="logo-button"
            onClick={() => handleNavClick('accueil')} 
            className="flex items-center space-x-2 group focus:outline-none"
          >
            <div className="bg-stone-900 text-white p-2.5 rounded-lg group-hover:bg-amber-600 transition-colors duration-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-sans text-xl font-black tracking-widest text-stone-950">
              CHROMEMAX
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                id={`nav-item-${item.id}`}
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-sans text-sm font-semibold tracking-widest transition-colors py-2 border-b-2 relative ${
                  activeTab === item.id
                    ? 'text-stone-950 border-amber-500'
                    : 'text-stone-500 border-transparent hover:text-stone-950 hover:border-stone-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Icons */}
          <div id="header-actions" className="flex items-center space-x-4">
            
            {/* Cart Button */}
            <button
              id="cart-toggle-btn"
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-full hover:bg-stone-50 text-stone-700 hover:text-stone-950 relative transition-colors duration-200"
              aria-label="Panier"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span id="cart-badge" className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Quick Order CTA */}
            <button
              id="header-cta-btn"
              onClick={() => handleNavClick('commande')}
              className="hidden sm:inline-flex items-center bg-stone-950 hover:bg-amber-600 text-white font-sans text-xs font-bold tracking-widest py-3 px-6 rounded-lg transition-colors duration-300"
            >
              COMMANDER
            </button>

            {/* Mobile menu button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg hover:bg-stone-50 text-stone-700 hover:text-stone-950 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-b border-stone-100 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          {navItems.map((item) => (
            <button
              id={`mobile-nav-item-${item.id}`}
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left py-3 px-4 rounded-lg font-sans text-sm font-semibold tracking-wider ${
                activeTab === item.id
                  ? 'bg-amber-50 text-amber-900 font-bold'
                  : 'text-stone-600 hover:bg-stone-50 hover:text-stone-950'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            id="mobile-nav-cta"
            onClick={() => handleNavClick('commande')}
            className="block w-full text-center bg-stone-950 hover:bg-amber-600 text-white font-sans text-xs font-bold tracking-widest py-3 px-4 rounded-lg transition-colors duration-300"
          >
            PASSER UNE COMMANDE
          </button>
        </div>
      )}
    </header>
  );
}
