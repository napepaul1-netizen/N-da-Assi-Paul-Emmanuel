/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  onCheckout
}: CartDrawerProps) {
  if (!isOpen) return null;

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-sm flex justify-end">
      
      {/* Outer Click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide Drawer Content */}
      <div id="cart-drawer" className="relative max-w-md w-full bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-slide-in">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5 text-amber-500" />
            <h2 className="font-sans text-base font-black tracking-widest text-stone-950 uppercase">
              VOTRE PANIER ({cart.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            id="close-cart-btn"
            onClick={onClose}
            className="p-1 rounded-full text-stone-500 hover:text-stone-950 hover:bg-stone-50 transition-all"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div id="drawer-empty-cart" className="h-full flex flex-col items-center justify-center space-y-4 text-center py-12">
              <div className="bg-stone-50 p-6 rounded-full text-stone-400">
                <ShoppingBag className="h-10 w-10" />
              </div>
              <h3 className="font-sans text-sm font-black text-stone-950 uppercase tracking-wider">Votre panier est vide</h3>
              <p className="font-sans text-stone-500 text-xs leading-relaxed max-w-xs">
                Découvrez nos modèles Chromemax et offrez-vous la distinction d'un accessoire d'exception.
              </p>
              <button
                id="drawer-browse-btn"
                onClick={onClose}
                className="bg-stone-950 text-white font-sans text-xs font-black tracking-widest uppercase py-3 px-6 rounded-lg hover:bg-amber-500 transition-colors"
              >
                Continuer le shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div id={`drawer-item-${item.product.id}`} key={item.product.id} className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="flex items-center space-x-3">
                    <img src={item.product.imageUrl} alt={item.product.name} className="h-12 w-12 object-contain bg-white rounded-xl p-1" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-sans text-[11px] font-black text-stone-950 uppercase line-clamp-1">{item.product.name}</h4>
                      <span className="block font-sans text-xs font-bold text-amber-600 mt-0.5">
                        {item.product.price.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2 bg-white rounded-lg border border-stone-100 p-1">
                      <button
                        id={`drawer-minus-${item.product.id}`}
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded hover:bg-stone-50 text-stone-500"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-sans text-xs font-black w-4 text-center">{item.quantity}</span>
                      <button
                        id={`drawer-plus-${item.product.id}`}
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded hover:bg-stone-50 text-stone-500"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <button
                      id={`drawer-remove-${item.product.id}`}
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-stone-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-stone-100 space-y-4">
            <div className="flex justify-between items-baseline font-semibold text-xs">
              <span className="font-sans text-stone-500 uppercase">Sous-total</span>
              <span className="font-sans text-xl font-black text-stone-950">
                {cartSubtotal.toLocaleString('fr-FR')} FCFA
              </span>
            </div>

            <p className="font-sans text-[10px] text-stone-400 leading-normal text-center">
              Frais de livraison calculés à la finalisation de commande (gratuit dès 60 000 FCFA d'achats).
            </p>

            <button
              id="drawer-checkout-btn"
              onClick={onCheckout}
              className="w-full bg-stone-950 hover:bg-amber-600 text-white font-sans text-xs font-black tracking-widest py-4 rounded-xl transition-all duration-300 uppercase flex items-center justify-center shadow-lg"
            >
              Passer la commande
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
