/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Eye, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { Product, ActiveTab } from '../types';

interface ProductsViewProps {
  products: Product[];
  addToCart: (product: Product) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function ProductsView({ products, addToCart, setActiveTab }: ProductsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [activeDetailProduct, setActiveDetailProduct] = useState<Product | null>(null);

  const categories = ['Tous', 'Classic', 'Sport', 'Vintage', 'Premium'];

  const filteredProducts = selectedCategory === 'Tous'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleQuickBuy = (product: Product) => {
    addToCart(product);
    setActiveTab('commande');
  };

  return (
    <div id="products-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* View Header */}
      <div id="products-header" className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-1 bg-amber-100 text-amber-800 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
          <Sparkles className="h-3 w-3" />
          <span>Notre Catalogue</span>
        </div>
        <h1 className="font-sans text-3xl sm:text-4xl font-black tracking-tight text-stone-950">
          LES CRÉATIONS CHROMEMAX
        </h1>
        <p className="font-sans text-stone-500 text-sm leading-relaxed">
          Explorez notre sélection de lunettes haut de gamme conçues pour magnifier votre style. Chaque monture incarne l'alliance parfaite de la mode et de la protection.
        </p>
      </div>

      {/* Categories Filter Tabs */}
      <div id="category-tabs" className="flex flex-wrap justify-center items-center gap-2 border-b border-stone-100 pb-4">
        {categories.map((cat) => (
          <button
            id={`filter-tab-${cat.toLowerCase()}`}
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`font-sans text-xs font-black tracking-widest py-3 px-6 rounded-lg transition-all duration-300 border uppercase ${
              selectedCategory === cat
                ? 'bg-stone-950 text-white border-stone-950 shadow-md'
                : 'bg-white text-stone-600 border-stone-200 hover:text-stone-950 hover:border-stone-400'
            }`}
          >
            {cat === 'Tous' ? 'Tout Voir' : cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div id="products-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            id={`product-card-${product.id}`}
            key={product.id}
            className="group bg-white rounded-2xl border border-stone-100 hover:border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            
            {/* Image Box */}
            <div className="bg-stone-50 p-6 relative flex items-center justify-center min-h-[220px] max-h-[240px] overflow-hidden">
              {product.category === 'Premium' && (
                <span className="absolute top-3 left-3 bg-stone-900 text-amber-400 text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded">
                  Luxe Or
                </span>
              )}
              <img
                id={`product-img-${product.id}`}
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay quick actions */}
              <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                <button
                  id={`btn-view-${product.id}`}
                  onClick={() => setActiveDetailProduct(product)}
                  className="bg-white p-3 rounded-full text-stone-800 hover:text-amber-600 shadow-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                  title="Détails du produit"
                >
                  <Eye className="h-5 w-5" />
                </button>
                <button
                  id={`btn-add-${product.id}`}
                  onClick={() => addToCart(product)}
                  className="bg-amber-500 p-3 rounded-full text-white hover:bg-amber-600 shadow-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
                  title="Ajouter au panier"
                >
                  <ShoppingBag className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Info Box */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-[10px] font-black text-amber-600 tracking-wider uppercase bg-amber-50 px-2 py-0.5 rounded">
                    {product.category}
                  </span>
                  <div className="flex items-center text-amber-500 text-xs font-bold">
                    <Star className="h-3 w-3 fill-amber-500 stroke-none mr-1" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                <h3 className="font-sans text-base font-black tracking-wide text-stone-950 uppercase line-clamp-1">
                  {product.name}
                </h3>

                <p className="font-sans text-stone-500 text-xs leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-50 flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-xs font-bold text-stone-400 uppercase">Tarif</span>
                  <span className="font-sans text-lg font-black text-stone-950">
                    {product.price.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    id={`btn-card-details-${product.id}`}
                    onClick={() => setActiveDetailProduct(product)}
                    className="bg-stone-50 hover:bg-stone-100 text-stone-700 font-sans text-[10px] font-black tracking-widest py-3 px-2 rounded-lg transition-colors text-center uppercase"
                  >
                    Détails
                  </button>
                  <button
                    id={`btn-card-buy-${product.id}`}
                    onClick={() => handleQuickBuy(product)}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-sans text-[10px] font-black tracking-widest py-3 px-2 rounded-lg transition-colors text-center uppercase shadow-sm"
                  >
                    Acheter
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {activeDetailProduct && (
        <div id="product-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
          <div id="product-modal" className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            {/* Close Button */}
            <button
              id="close-modal-btn"
              onClick={() => setActiveDetailProduct(null)}
              className="absolute top-4 right-4 bg-stone-100 text-stone-800 hover:bg-amber-500 hover:text-white p-2 rounded-full transition-colors z-10"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
              
              {/* Modal Image */}
              <div className="bg-stone-50 rounded-2xl p-6 flex items-center justify-center">
                <img
                  id="modal-product-img"
                  src={activeDetailProduct.imageUrl}
                  alt={activeDetailProduct.name}
                  className="max-h-[260px] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Modal Content */}
              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <span className="font-sans text-[10px] font-black text-amber-600 tracking-wider uppercase bg-amber-50 px-2 py-0.5 rounded">
                    Collection {activeDetailProduct.category}
                  </span>
                  
                  <h2 className="font-sans text-xl sm:text-2xl font-black text-stone-950 tracking-wider mt-2">
                    {activeDetailProduct.name}
                  </h2>

                  <div className="flex items-center text-amber-500 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                    <span className="text-stone-500 text-xs font-semibold ml-2">({activeDetailProduct.rating})</span>
                  </div>

                  <p className="font-sans text-stone-600 text-xs leading-relaxed mt-3">
                    {activeDetailProduct.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-1.5 mt-4">
                    <span className="block font-sans text-[10px] font-black text-stone-400 tracking-widest uppercase">Atouts clés :</span>
                    {activeDetailProduct.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-stone-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
                        <span className="font-sans text-[11px] font-semibold">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="font-sans text-xs font-bold text-stone-400 uppercase">Tarif unitaire</span>
                    <span className="font-sans text-2xl font-black text-amber-600">
                      {activeDetailProduct.price.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      id="modal-add-to-cart"
                      onClick={() => {
                        addToCart(activeDetailProduct);
                        setActiveDetailProduct(null);
                      }}
                      className="bg-stone-900 hover:bg-stone-800 text-white font-sans text-xs font-black tracking-widest py-3.5 px-4 rounded-xl transition-colors uppercase text-center"
                    >
                      Ajouter
                    </button>
                    <button
                      id="modal-buy-now"
                      onClick={() => {
                        addToCart(activeDetailProduct);
                        setActiveDetailProduct(null);
                        setActiveTab('commande');
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-sans text-xs font-black tracking-widest py-3.5 px-4 rounded-xl transition-colors uppercase text-center shadow-md shadow-amber-500/10"
                    >
                      Commander
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
