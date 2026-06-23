/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Renseignements lunettes',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }
    setErrorMsg('');
    setIsSubmitted(true);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Renseignements lunettes',
      message: ''
    });
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div id="contact-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* View Header */}
      <div id="contact-header" className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-1.5 bg-amber-100 text-amber-800 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
          <span>Nous Contacter</span>
        </div>
        <h1 className="font-sans text-3xl sm:text-4xl font-black tracking-tight text-stone-950">
          VOTRE SOURIRE, NOTRE PRIORITÉ
        </h1>
        <p className="font-sans text-stone-500 text-sm leading-relaxed">
          Une question sur un modèle, une commande en cours ou besoin de conseils personnalisés ? Nos conseillers de style Chromemax vous répondent dans les plus brefs délais.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Contact details, Map & Hours */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Quick contact list */}
          <div className="bg-stone-50 rounded-2xl border border-stone-100 p-8 space-y-6 shadow-sm">
            <h2 className="font-sans text-lg font-black text-stone-950 tracking-wider uppercase border-b border-stone-200 pb-3">
              BOUTIQUE CHROMEMAX
            </h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-white p-2.5 rounded-lg text-amber-500 shadow-sm">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-stone-400 uppercase tracking-widest">Adresse</h4>
                  <p className="font-sans text-stone-800 text-xs font-semibold leading-relaxed mt-0.5">
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white p-2.5 rounded-lg text-amber-500 shadow-sm">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-stone-400 uppercase tracking-widest">Téléphone</h4>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="font-sans text-stone-800 text-sm font-black hover:text-amber-600 transition-colors mt-0.5 block">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white p-2.5 rounded-lg text-amber-500 shadow-sm">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-stone-400 uppercase tracking-widest">Adresse E-mail</h4>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="font-sans text-stone-800 text-xs font-semibold hover:text-amber-600 transition-colors mt-0.5 block">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Boutique Hours */}
          <div className="bg-stone-50 rounded-2xl border border-stone-100 p-8 space-y-6 shadow-sm">
            <div className="flex items-center space-x-2 border-b border-stone-200 pb-3">
              <Clock className="h-5 w-5 text-amber-500" />
              <h2 className="font-sans text-lg font-black text-stone-950 tracking-wider uppercase">
                HORAIRES D'OUVERTURE
              </h2>
            </div>

            <div className="space-y-3">
              {CONTACT_INFO.hours.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs font-semibold">
                  <span className="font-sans text-stone-500">{item.days}</span>
                  <span className="font-sans text-stone-900 bg-white px-3 py-1 rounded border border-stone-100 shadow-sm">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Elegant form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-100 shadow-xl p-6 sm:p-10 space-y-6">
          <h2 className="font-sans text-xl font-black text-stone-950 tracking-wider uppercase">
            ENVOYER UN MESSAGE
          </h2>

          {isSubmitted ? (
            <div id="contact-success" className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col items-center text-center space-y-3 animate-fade-in">
              <CheckCircle className="h-12 w-12 text-amber-600" />
              <h3 className="font-sans text-base font-black text-stone-950">Message Envoyé Avec Succès !</h3>
              <p className="font-sans text-stone-600 text-xs leading-relaxed max-w-sm">
                Merci de nous avoir contacté. Un spécialiste Chromemax étudiera votre demande et vous recontactera sous 24h.
              </p>
            </div>
          ) : (
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
              
              {errorMsg && (
                <div className="text-red-600 text-xs font-bold bg-red-50 border border-red-100 p-3 rounded-lg">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-sans text-[10px] font-black text-stone-400 tracking-widest uppercase">Nom complet *</label>
                  <input
                    id="contact-name-input"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Jean Paul"
                    className="w-full font-sans text-xs font-semibold px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-sans text-[10px] font-black text-stone-400 tracking-widest uppercase">Adresse E-mail *</label>
                  <input
                    id="contact-email-input"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Ex: jean.paul@gmail.com"
                    className="w-full font-sans text-xs font-semibold px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-sans text-[10px] font-black text-stone-400 tracking-widest uppercase">Téléphone (Optionnel)</label>
                  <input
                    id="contact-phone-input"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ex: +225 07 00 00 00"
                    className="w-full font-sans text-xs font-semibold px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-sans text-[10px] font-black text-stone-400 tracking-widest uppercase">Objet du message</label>
                  <select
                    id="contact-subject-select"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full font-sans text-xs font-semibold px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                  >
                    <option value="Renseignements lunettes">Renseignements produits</option>
                    <option value="Suivi de commande">Suivi de commande</option>
                    <option value="Partenariat">Devenir distributeur</option>
                    <option value="Autre">Autre demande</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-sans text-[10px] font-black text-stone-400 tracking-widest uppercase">Votre Message *</label>
                <textarea
                  id="contact-message-input"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Écrivez votre message ici..."
                  className="w-full font-sans text-xs font-semibold px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                className="w-full flex items-center justify-center bg-stone-950 hover:bg-amber-600 text-white font-sans text-xs font-black tracking-widest py-4 rounded-xl transition-all duration-300 uppercase shadow-md hover:shadow-amber-500/10"
              >
                Envoyer le Message
                <Send className="ml-2 h-4 w-4" />
              </button>

            </form>
          )}
        </div>

      </div>

    </div>
  );
}
