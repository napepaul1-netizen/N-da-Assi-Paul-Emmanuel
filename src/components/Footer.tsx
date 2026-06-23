/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '../data';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer id="app-footer" className="bg-stone-950 text-white pt-16 pb-8 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-stone-900 pb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-amber-500 text-white p-2 rounded-lg">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-sans text-lg font-black tracking-widest uppercase">
                CHROMEMAX
              </span>
            </div>
            <p className="font-sans text-stone-400 text-xs leading-relaxed">
              La touche finale du raffinement. Des modèles solaires de luxe pensés pour magnifier chaque silhouette avec distinction.
            </p>
          </div>

          {/* Links Col */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-black tracking-widest text-amber-500 uppercase">EXPLORER</h4>
            <ul className="space-y-2 text-xs font-semibold text-stone-400">
              <li>
                <button onClick={() => setActiveTab('accueil')} className="hover:text-white transition-colors uppercase">
                  Accueil
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('produits')} className="hover:text-white transition-colors uppercase">
                  Nos Produits
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('commande')} className="hover:text-white transition-colors uppercase">
                  Passer une Commande
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-white transition-colors uppercase">
                  Contactez-nous
                </button>
              </li>
            </ul>
          </div>

          {/* contact details */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-black tracking-widest text-amber-500 uppercase">CONTACT</h4>
            <ul className="space-y-2 text-xs font-semibold text-stone-400">
              <li className="flex items-center space-x-2">
                <Phone className="h-3.5 w-3.5 text-stone-500" />
                <span className="font-sans">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-3.5 w-3.5 text-stone-500" />
                <span className="font-sans truncate">{CONTACT_INFO.email}</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-3.5 w-3.5 text-stone-500 flex-shrink-0 mt-0.5" />
                <span className="font-sans leading-relaxed">{CONTACT_INFO.address}</span>
              </li>
            </ul>
          </div>

          {/* Secure & Support */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-black tracking-widest text-amber-500 uppercase">SÉCURITÉ & SERVICE</h4>
            <p className="font-sans text-stone-400 text-xs leading-relaxed">
              Tous nos colis sont scellés et livrés par des transporteurs certifiés. Service après-vente disponible 6 jours sur 7.
            </p>
          </div>

        </div>

        {/* copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-stone-500 text-[10px] font-bold uppercase tracking-widest space-y-4 sm:space-y-0">
          <span>&copy; {new Date().getFullYear()} CHROMEMAX BOUTIQUE. TOUS DROITS RÉSERVÉS.</span>
          <span>CONÇU POUR L'ÉLÉGANCE ABSOLUE</span>
        </div>
      </div>
    </footer>
  );
}
