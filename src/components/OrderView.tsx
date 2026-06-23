/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Product, CartItem, Order } from '../types';
import { CITIES } from '../data';

interface OrderViewProps {
  cart: CartItem[];
  products: Product[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  setActiveTab: (tab: 'accueil' | 'produits' | 'contact' | 'commande') => void;
}

export default function OrderView({
  cart,
  products,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  setActiveTab
}: OrderViewProps) {
  // Customer Info State
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    city: CITIES[0],
    address: '',
    paymentMethod: 'cod' as 'cod' | 'momo'
  });

  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const deliveryFee = cartSubtotal > 60000 || cartSubtotal === 0 ? 0 : 2500;
  const cartTotal = cartSubtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      setErrorMsg('Votre panier est vide. Veuillez sélectionner au moins une paire de lunettes.');
      return;
    }

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      setErrorMsg('Veuillez remplir tous les champs obligatoires (*).');
      return;
    }

    setErrorMsg('');

    // Generate fake but premium looking Order ID
    const orderId = `CH-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;

    const newOrder: Order = {
      id: orderId,
      name: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
      address: customerInfo.address,
      city: customerInfo.city,
      paymentMethod: customerInfo.paymentMethod,
      cartItems: [...cart],
      totalPrice: cartTotal,
      orderDate: new Date().toLocaleDateString('fr-FR'),
      status: 'pending'
    };

    setPlacedOrder(newOrder);
    clearCart();
    
    // Reset customer info
    setCustomerInfo({
      name: '',
      email: '',
      phone: '',
      city: CITIES[0],
      address: '',
      paymentMethod: 'cod'
    });
  };

  return (
    <div id="order-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* View Header */}
      <div id="order-header" className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-1.5 bg-amber-100 text-amber-800 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
          <span>Finaliser l'achat</span>
        </div>
        <h1 className="font-sans text-3xl sm:text-4xl font-black tracking-tight text-stone-950">
          PASSER UNE COMMANDE
        </h1>
        <p className="font-sans text-stone-500 text-sm leading-relaxed">
          Remplissez le formulaire de livraison ci-dessous. Vos lunettes Chromemax vous parviendront sous emballage sécurisé et écrin de luxe.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Order details & Products Selection if empty */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Cart Details Card */}
          <div className="bg-white rounded-3xl border border-stone-100 shadow-xl p-6 sm:p-8 space-y-6">
            <h2 className="font-sans text-lg font-black text-stone-950 tracking-wider uppercase border-b border-stone-100 pb-3">
              RÉSUMÉ DU PANIER
            </h2>

            {cart.length === 0 ? (
              <div id="empty-cart-display" className="space-y-6 py-4 text-center">
                <div className="text-stone-400 flex flex-col items-center space-y-2">
                  <ShoppingBag className="h-12 w-12" />
                  <p className="font-sans text-xs font-bold uppercase tracking-widest text-stone-400">Votre panier est vide</p>
                </div>

                <div className="border-t border-stone-100 pt-6 space-y-3">
                  <p className="font-sans text-stone-600 text-xs font-semibold">
                    Sélectionnez rapidement l'un de nos modèles phares pour commander :
                  </p>
                  
                  {/* Micro list of products for easy adding */}
                  <div className="grid grid-cols-1 gap-2 max-h-[220px] overflow-y-auto pr-1">
                    {products.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-100 hover:border-stone-200 transition-colors">
                        <div className="flex items-center space-x-3 text-left">
                          <img src={p.imageUrl} alt={p.name} className="h-10 w-10 object-contain bg-white rounded-md p-1" referrerPolicy="no-referrer" />
                          <div>
                            <h4 className="font-sans text-[11px] font-black text-stone-950 line-clamp-1 uppercase">{p.name}</h4>
                            <span className="font-sans text-[10px] font-bold text-amber-600">{p.price.toLocaleString('fr-FR')} FCFA</span>
                          </div>
                        </div>
                        <button
                          id={`add-empty-${p.id}`}
                          onClick={() => addToCart(p)}
                          className="bg-stone-950 text-white font-sans text-[9px] font-black tracking-widest uppercase px-3 py-2 rounded-lg hover:bg-amber-500 transition-colors"
                        >
                          Ajouter
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Cart Items list */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div id={`cart-item-${item.product.id}`} key={item.product.id} className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-100">
                      <div className="flex items-center space-x-3">
                        <img src={item.product.imageUrl} alt={item.product.name} className="h-12 w-12 object-contain bg-white rounded-xl p-1" referrerPolicy="no-referrer" />
                        <div>
                          <h4 className="font-sans text-[11px] font-black text-stone-950 uppercase line-clamp-1">{item.product.name}</h4>
                          <span className="font-sans text-[10px] font-bold text-stone-400 uppercase">{item.product.category}</span>
                          <span className="block font-sans text-xs font-bold text-amber-600">
                            {item.product.price.toLocaleString('fr-FR')} FCFA
                          </span>
                        </div>
                      </div>

                      {/* Quantity Toggles */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 bg-white rounded-lg border border-stone-100 p-1">
                          <button
                            id={`qty-minus-${item.product.id}`}
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 rounded hover:bg-stone-50 text-stone-500"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-sans text-xs font-black w-4 text-center">{item.quantity}</span>
                          <button
                            id={`qty-plus-${item.product.id}`}
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 rounded hover:bg-stone-50 text-stone-500"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          id={`qty-remove-${item.product.id}`}
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-stone-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Recaps */}
                <div className="border-t border-stone-100 pt-4 space-y-2 text-xs font-semibold">
                  <div className="flex justify-between text-stone-500">
                    <span className="font-sans">Sous-total</span>
                    <span className="font-sans text-stone-900">{cartSubtotal.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span className="font-sans">Frais de livraison</span>
                    <span className="font-sans text-stone-900">
                      {deliveryFee === 0 ? 'Gratuit' : `${deliveryFee.toLocaleString('fr-FR')} FCFA`}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="bg-amber-50 text-[10px] text-amber-800 p-2.5 rounded-lg border border-amber-100">
                      💡 <b>Conseil :</b> Ajoutez encore <b>{(60000 - cartSubtotal).toLocaleString('fr-FR')} FCFA</b> d'achats pour obtenir la <b>livraison gratuite</b> !
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-black text-stone-950 pt-2 border-t border-stone-100">
                    <span className="font-sans">TOTAL À PAYER</span>
                    <span className="font-sans text-amber-600 text-base">{cartTotal.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Secure Purchase Info */}
          <div className="bg-stone-50 rounded-2xl border border-stone-100 p-6 flex items-start space-x-3">
            <ShieldCheck className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans text-xs font-black text-stone-950 uppercase tracking-wider">COMMANDE SÉCURISÉE</h4>
              <p className="font-sans text-stone-600 text-[11px] leading-relaxed mt-1">
                La boutique Chromemax garantit la conformité de chaque modèle. Le paiement s'effectue de manière totalement sécurisée à la livraison ou via Mobile Money certifié.
              </p>
            </div>
          </div>

        </div>

        {/* Right Side: Delivery Details Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-100 shadow-xl p-6 sm:p-10 space-y-6">
          <h2 className="font-sans text-xl font-black text-stone-950 tracking-wider uppercase">
            INFORMATIONS DE LIVRAISON
          </h2>

          <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
            
            {errorMsg && (
              <div className="text-red-600 text-xs font-bold bg-red-50 border border-red-100 p-3 rounded-lg">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-sans text-[10px] font-black text-stone-400 tracking-widest uppercase">Nom & Prénom *</label>
                <input
                  id="checkout-name-input"
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  placeholder="Ex: Jean Paul N'Guessan"
                  className="w-full font-sans text-xs font-semibold px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-sans text-[10px] font-black text-stone-400 tracking-widest uppercase">Téléphone WhatsApp *</label>
                <input
                  id="checkout-phone-input"
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  placeholder="Ex: +225 07 00 00 00 00"
                  className="w-full font-sans text-xs font-semibold px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-sans text-[10px] font-black text-stone-400 tracking-widest uppercase">Adresse E-mail *</label>
                <input
                  id="checkout-email-input"
                  type="email"
                  required
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  placeholder="Ex: jean.paul@gmail.com"
                  className="w-full font-sans text-xs font-semibold px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-sans text-[10px] font-black text-stone-400 tracking-widest uppercase">Ville de Livraison *</label>
                <select
                  id="checkout-city-select"
                  value={customerInfo.city}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                  className="w-full font-sans text-xs font-semibold px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block font-sans text-[10px] font-black text-stone-400 tracking-widest uppercase">Quartier / Précisions d'adresse *</label>
              <input
                id="checkout-address-input"
                type="text"
                required
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                placeholder="Ex: Cocody Angré, non loin du supermarché, Immeuble Horizon"
                className="w-full font-sans text-xs font-semibold px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2 pt-2">
              <label className="block font-sans text-[10px] font-black text-stone-400 tracking-widest uppercase">Moyen de Paiement Préféré *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={`flex items-start p-4 rounded-xl border cursor-pointer transition-all ${
                  customerInfo.paymentMethod === 'cod'
                    ? 'border-amber-500 bg-amber-50/35'
                    : 'border-stone-200 hover:border-stone-300'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={customerInfo.paymentMethod === 'cod'}
                    onChange={() => setCustomerInfo({ ...customerInfo, paymentMethod: 'cod' })}
                    className="mt-1 text-amber-500 focus:ring-amber-500"
                  />
                  <div className="ml-3">
                    <span className="block font-sans text-xs font-black text-stone-950 uppercase">Paiement Cash à la livraison</span>
                    <span className="block font-sans text-[10px] text-stone-500 mt-0.5">Payez en espèces lorsque le coursier vous livre vos lunettes.</span>
                  </div>
                </label>

                <label className={`flex items-start p-4 rounded-xl border cursor-pointer transition-all ${
                  customerInfo.paymentMethod === 'momo'
                    ? 'border-amber-500 bg-amber-50/35'
                    : 'border-stone-200 hover:border-stone-300'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="momo"
                    checked={customerInfo.paymentMethod === 'momo'}
                    onChange={() => setCustomerInfo({ ...customerInfo, paymentMethod: 'momo' })}
                    className="mt-1 text-amber-500 focus:ring-amber-500"
                  />
                  <div className="ml-3">
                    <span className="block font-sans text-xs font-black text-stone-950 uppercase">Mobile Money / Wave</span>
                    <span className="block font-sans text-[10px] text-stone-500 mt-0.5">Orange Money, MTN, Moov ou Wave à réception ou transfert direct.</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="checkout-submit-btn"
              type="submit"
              disabled={cart.length === 0}
              className={`w-full flex items-center justify-center font-sans text-xs font-black tracking-widest py-4.5 rounded-xl transition-all duration-300 uppercase shadow-md ${
                cart.length === 0
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
                  : 'bg-stone-950 hover:bg-amber-600 text-white hover:shadow-amber-500/10'
              }`}
            >
              VALIDER MA COMMANDE
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>

          </form>
        </div>

      </div>

      {/* Success Modal */}
      {placedOrder && (
        <div id="order-success-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
          <div id="order-success-modal" className="bg-white rounded-3xl max-w-lg w-full p-8 sm:p-10 text-center space-y-6 shadow-2xl border border-stone-100 animate-scale-up">
            
            <div className="bg-amber-500 text-white p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <h2 className="font-sans text-2xl font-black text-stone-950 tracking-wide uppercase">
                COMMANDE VALIDÉE !
              </h2>
              <p className="font-sans text-xs font-black text-amber-600 tracking-widest uppercase bg-amber-50 px-3 py-1 rounded inline-block">
                N° de commande : {placedOrder.id}
              </p>
            </div>

            <p className="font-sans text-stone-600 text-xs leading-relaxed max-w-sm mx-auto">
              Merci pour votre confiance, <b>{placedOrder.name}</b> ! Votre commande a été enregistrée avec succès. Nos équipes vous contacteront sur votre numéro <b>{placedOrder.phone}</b> pour confirmer la livraison.
            </p>

            {/* Mini Summary list */}
            <div className="bg-stone-50 rounded-2xl border border-stone-100 p-5 space-y-3 text-left text-xs font-semibold max-h-[160px] overflow-y-auto">
              <span className="block font-sans text-[9px] font-black text-stone-400 tracking-widest uppercase">Articles commandés :</span>
              {placedOrder.cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center text-stone-700">
                  <span className="font-sans truncate max-w-[240px] uppercase">{item.product.name} (x{item.quantity})</span>
                  <span className="font-sans font-bold">{(item.product.price * item.quantity).toLocaleString('fr-FR')} FCFA</span>
                </div>
              ))}
              <div className="border-t border-stone-200 pt-2 flex justify-between font-black text-stone-950">
                <span className="font-sans uppercase">Montant total</span>
                <span className="font-sans text-amber-600">{placedOrder.totalPrice.toLocaleString('fr-FR')} FCFA</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="btn-return-home"
                onClick={() => {
                  setPlacedOrder(null);
                  setActiveTab('accueil');
                }}
                className="w-full bg-stone-950 hover:bg-amber-600 text-white font-sans text-xs font-black tracking-widest py-4 rounded-xl transition-colors uppercase shadow-md"
              >
                Retourner à l'Accueil
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
