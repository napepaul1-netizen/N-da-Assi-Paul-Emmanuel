/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';
import classicImg from './assets/images/chromemax_classic_sunglasses_1782229197374.jpg';
import sportImg from './assets/images/chromemax_sport_sunglasses_1782229213430.jpg';
import vintageImg from './assets/images/chromemax_vintage_sunglasses_1782229225267.jpg';
import aviatorImg from './assets/images/chromemax_aviator_sunglasses_1782229251951.jpg';
import heroBannerImg from './assets/images/hero_sunglasses_banner_1782229184940.jpg';

export const HERO_BANNER_IMG = heroBannerImg;

export const PRODUCTS: Product[] = [
  {
    id: 'chromemax-classic',
    name: 'CHROMEMAX CLASSIC',
    description: 'Le modèle iconique de chez Chromemax. Alliant distinction intemporelle, robustesse et élégance absolue pour affirmer votre présence au quotidien.',
    category: 'Classic',
    price: 35000,
    imageUrl: classicImg,
    rating: 4.9,
    features: ['Protection 100% UV400', 'Verres Polarisés Haute Clarté', 'Monture Métallique Légère', 'Traitement Anti-rayures']
  },
  {
    id: 'chromemax-sport',
    name: 'CHROMEMAX SPORT-X',
    description: 'Conçues pour la performance active et l\'aventure en plein air. Offrent une tenue ergonomique irréprochable et un contraste visuel optimisé.',
    category: 'Sport',
    price: 39000,
    imageUrl: sportImg,
    rating: 4.7,
    features: ['Tenue Antidérapante', 'Verres Miroités Hydrophobes', 'Monture Ultra-flexible', 'Protection Latérale Contre le Vent']
  },
  {
    id: 'chromemax-vintage',
    name: 'CHROMEMAX VINTAGE',
    description: 'Une touche nostalgique d\'un raffinement unique. Finition acétate écaille de tortue et verres chauds dorés pour capturer chaque éclat de lumière.',
    category: 'Vintage',
    price: 48000,
    imageUrl: vintageImg,
    rating: 4.8,
    features: ['Monture Acétate Haut de Gamme', 'Charnières en Métal Renforcé', 'Verres Dégradés Protecteurs', 'Style Rétro Affirmé']
  },
  {
    id: 'chromemax-aviator',
    name: 'CHROMEMAX AVIATEUR OR',
    description: 'La quintessence de l\'élégance aventurière. Monture en plaqué or brossé avec verres polarisés vert forêt offrant un confort de vision d\'exception.',
    category: 'Premium',
    price: 55000,
    imageUrl: aviatorImg,
    rating: 5.0,
    features: ['Placage Or Double Couche', 'Verres Polarisés Minéraux', 'Plaquettes de Nez Réglables', 'Signature Chromemax Gravée']
  }
];

export const CITIES = [
  'Abidjan (Cocody, Zone 4, Plateau, etc.)',
  'Yamoussoukro',
  'Bouaké',
  'San-Pédro',
  'Daloa',
  'Korhogo',
  'Paris',
  'Marseille',
  'Lyon',
  'Autre Ville / International'
];

export const CONTACT_INFO = {
  phone: '+225 07 00 00 00 00',
  email: 'contact@chromemax-boutique.com',
  address: 'Boulevard de la République, Le Plateau, Abidjan, Côte d\'Ivoire',
  hours: [
    { days: 'Lundi - Vendredi', hours: '08h30 - 19h00' },
    { days: 'Samedi', hours: '09h00 - 18h00' },
    { days: 'Dimanche', hours: 'Fermé' }
  ]
};
