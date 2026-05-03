/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="main-footer" className="bg-[#4A3F35] text-[#FDFBF7] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-serif font-light tracking-widest mb-6">
              NURA <span className="font-bold">ABAYAS</span>
            </h2>
            <p className="text-[#B4C5D4] text-sm leading-relaxed mb-6">
              Nura Abayas defines modern luxury through traditional drapes. Every stitch is a testament to elegance and comfort.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#B4C5D4] transition-colors"><Instagram size={18} /></a>
              <a href="#" className="hover:text-[#B4C5D4] transition-colors"><Facebook size={18} /></a>
              <a href="#" className="hover:text-[#B4C5D4] transition-colors"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm text-[#FDFBF7]/70">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/shop" className="hover:text-white">Shop All</Link></li>
              <li><Link to="/about" className="hover:text-white">Our Story</Link></li>
              <li><Link to="/reviews" className="hover:text-white">Customer Reviews</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Customer Care</h3>
            <ul className="space-y-4 text-sm text-[#FDFBF7]/70">
              <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white">Size Guide</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Store Info</h3>
            <ul className="space-y-4 text-sm text-[#FDFBF7]/70">
              <li className="flex items-center space-x-3">
                <MapPin size={16} />
                <span>Dubai Design District, UAE</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} />
                <span>+971 4 000 0000</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} />
                <span>orders@nura-abayas.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#FDFBF7]/10 pt-8 text-center text-[10px] uppercase tracking-[0.2em] opacity-50">
          © {new Date().getFullYear()} Nura Abayas. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
