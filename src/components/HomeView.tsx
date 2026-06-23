/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Award, Eye } from 'lucide-react';
import { Product, ActiveTab } from '../types';
import { HERO_BANNER_IMG } from '../data';

interface HomeViewProps {
  products: Product[];
  setActiveTab: (tab: ActiveTab) => void;
  addToCart: (product: Product) => void;
}

export default function HomeView({ products, setActiveTab, addToCart }: HomeViewProps) {
  // Classic product is our spotlight model
  const classicProduct = products.find(p => p.id === 'chromemax-classic') || products[0];

  return (
    <div id="home-view" className="space-y-16 pb-16">
      
      {/* 1. Elegant Scrolling Ticker (Modern Marquee) */}
      <div id="marquee-ticker" className="bg-amber-500 text-white py-3 overflow-hidden whitespace-nowrap border-y border-amber-600">
        <div className="inline-block animate-marquee font-sans text-xs sm:text-sm font-black tracking-[0.25em] uppercase">
          ✦ BIENVENUE SUR NOTRE SITE ✦ LIVRAISON RAPIDE & SÉCURISÉE ✦ DESIGN LUXUEUX CHROMEMAX ✦ LA TOUCHE ULTIME DE STYLE ✦ BIENVENUE SUR NOTRE SITE ✦ LIVRAISON RAPIDE & SÉCURISÉE ✦ DESIGN LUXUEUX CHROMEMAX ✦ LA TOUCHE ULTIME DE STYLE ✦
        </div>
      </div>

      {/* 2. Hero Section */}
      <section id="hero-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-stone-950 text-white min-h-[500px] flex items-center shadow-2xl">
          
          {/* Hero Background with elegant opacity */}
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            id="hero-banner-image"
            src={HERO_BANNER_IMG}
            alt="Chromemax Banner"
            className="absolute inset-0 w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />

          {/* Hero Content */}
          <div className="relative z-20 max-w-2xl px-6 py-16 sm:px-12 lg:px-16 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 px-4 py-1.5 rounded-full border border-amber-500/30">
              <Sparkles className="h-4 w-4" />
              <span className="font-sans text-xs font-bold tracking-widest uppercase">Nouvelle Collection 2026</span>
            </div>
            
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              L'Élégance <br className="hidden sm:block" />
              <span className="text-amber-400">Révélée</span>.
            </h1>
            
            <p className="font-sans text-stone-200 text-base sm:text-lg max-w-lg leading-relaxed">
              Découvrez la touche finale du raffinement moderne. Chromemax redéfinit le style avec des créations de lunettes solaires d'exception pour un charisme absolu.
            </p>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                id="hero-shop-btn"
                onClick={() => setActiveTab('produits')}
                className="inline-flex items-center justify-center bg-white hover:bg-amber-500 text-stone-950 hover:text-white font-sans text-xs font-bold tracking-widest py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-amber-500/20"
              >
                DÉCOUVRIR LES PRODUITS
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button
                id="hero-order-btn"
                onClick={() => setActiveTab('commande')}
                className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white font-sans text-xs font-bold tracking-widest py-4 px-8 rounded-xl border border-white/30 transition-colors"
              >
                PASSER COMMANDE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Core Message (From the user request) */}
      <section id="philosophy-section" className="max-w-4xl mx-auto px-4 text-center space-y-8 py-4">
        <div className="inline-flex items-center space-x-1.5 text-amber-600 font-sans text-xs font-black tracking-widest uppercase">
          <span>PHILOSOPHIE CHROMEMAX</span>
        </div>
        
        <blockquote className="relative p-8 md:p-12 bg-stone-50 rounded-2xl border border-stone-100 shadow-sm">
          <div className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-amber-500 text-white p-2 rounded-full shadow-md">
            <Award className="h-5 w-5" />
          </div>
          
          <p className="font-sans text-stone-900 text-lg md:text-2xl font-semibold leading-relaxed tracking-wide italic">
            "IL EST IMPORTANT DE BIEN S'HABILLER, L'ON EST APPERCU COMME RESPONSABLE, CELA MET EN EVIDENCE PRESENTABLE, MAIS LA TOUCHE ULTIME EST LE STYLE A NE JAMAIS MANQUER : UN TRES BON ACCESSOIRE CLASS."
          </p>
          
          <div className="mt-6 flex flex-col items-center justify-center space-y-1">
            <span className="font-sans text-xs font-black tracking-widest text-amber-600 uppercase">NOUS VOUS PRÉSENTONS :</span>
            <span className="font-sans text-xl font-extrabold tracking-wider text-stone-950">LUNETTES DE CHEZ CHROMEMAX</span>
          </div>
        </blockquote>
      </section>

      {/* 4. Main Spotlight Product */}
      {classicProduct && (
        <section id="spotlight-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-3xl border border-stone-100 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12">
            
            {/* Product Image Area */}
            <div className="lg:col-span-5 flex flex-col justify-center bg-stone-50 rounded-2xl p-4 sm:p-8 relative group">
              <div className="absolute top-4 left-4 bg-amber-500 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-sm z-10">
                Meilleure Vente
              </div>
              <img
                id="spotlight-product-image"
                src={classicProduct.imageUrl}
                alt={classicProduct.name}
                className="w-full max-h-[380px] object-contain mx-auto group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Product Info Area */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6 lg:py-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  <span className="text-stone-500 text-xs font-semibold ml-2">({classicProduct.rating} / 5.0 d'avis clients)</span>
                </div>
                
                <h2 className="font-sans text-2xl sm:text-3xl font-black tracking-wider text-stone-950">
                  {classicProduct.name}
                </h2>
                
                <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
                  {classicProduct.description}
                </p>

                {/* Features list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {classicProduct.features.map((feat, index) => (
                    <div key={index} className="flex items-center space-x-2 text-stone-700">
                      <ShieldCheck className="h-4 w-4 text-amber-600 flex-shrink-0" />
                      <span className="font-sans text-xs font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price and CTAs */}
              <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="block font-sans text-xs font-bold tracking-widest text-stone-400 uppercase">Prix Spécial</span>
                  <span className="font-sans text-3xl font-black text-amber-600 tracking-wide">
                    {classicProduct.price.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    id="add-spotlight-to-cart"
                    onClick={() => addToCart(classicProduct)}
                    className="flex-1 sm:flex-none justify-center bg-stone-900 hover:bg-stone-800 text-white font-sans text-xs font-bold tracking-widest py-4 px-6 rounded-xl transition-colors duration-200 uppercase"
                  >
                    Ajouter au Panier
                  </button>
                  <button
                    id="order-spotlight-now"
                    onClick={() => {
                      addToCart(classicProduct);
                      setActiveTab('commande');
                    }}
                    className="flex-1 sm:flex-none justify-center bg-amber-500 hover:bg-amber-600 text-white font-sans text-xs font-bold tracking-widest py-4 px-6 rounded-xl transition-colors duration-200 uppercase shadow-md shadow-amber-500/10"
                  >
                    Commander Directement
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 5. Promise / Services Grid */}
      <section id="services-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-stone-50 border border-stone-100 p-8 rounded-2xl space-y-4">
            <div className="bg-white p-3 rounded-xl inline-block shadow-sm text-amber-500">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-sans text-sm font-bold tracking-wider text-stone-950 uppercase">QUALITÉ CERTIFIÉE</h3>
            <p className="font-sans text-stone-600 text-xs leading-relaxed">
              Toutes nos lunettes passent par un contrôle de qualité rigoureux. Protection UV400 certifiée et matériaux de première catégorie.
            </p>
          </div>

          <div className="bg-stone-50 border border-stone-100 p-8 rounded-2xl space-y-4">
            <div className="bg-white p-3 rounded-xl inline-block shadow-sm text-amber-500">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-sans text-sm font-bold tracking-wider text-stone-950 uppercase">STYLE EXCLUSIF</h3>
            <p className="font-sans text-stone-600 text-xs leading-relaxed">
              La signature de Chromemax réside dans ses finitions minutieuses et ses détails dorés qui apportent de la distinction et de l'élégance.
            </p>
          </div>

          <div className="bg-stone-50 border border-stone-100 p-8 rounded-2xl space-y-4">
            <div className="bg-white p-3 rounded-xl inline-block shadow-sm text-amber-500">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="font-sans text-sm font-bold tracking-wider text-stone-950 uppercase">CONFORT DE VISION</h3>
            <p className="font-sans text-stone-600 text-xs leading-relaxed">
              Des verres polarisés haut de gamme conçus pour atténuer la réverbération et offrir un confort visuel optimal même sous fort soleil.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
