/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { totalItems, wishlist } = useCart();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/shop' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav id="main-nav" className="sticky top-0 z-50 bg-[#FCF8F4]/80 backdrop-blur-xl border-b border-[#EBD8D0]/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link id="nav-logo" to="/" className="text-2xl font-serif font-light tracking-[0.25em] text-[#2D2926]">
            NURA <span className="font-bold text-[#D4AF37]">ABAYAS</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[10px] tracking-[0.3em] uppercase transition-all hover:text-[#D4AF37] ${
                  isActive(link.path) ? 'text-[#2D2926] font-bold border-b border-[#2D2926]/30 pb-1' : 'text-[#96897F]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button id="nav-search" className="p-2 text-[#2D2926] hover:text-[#D4AF37] transition-colors">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link id="nav-wishlist" to="/wishlist" className="p-2 text-[#2D2926] hover:text-[#D4AF37] transition-colors relative">
              <Heart size={18} strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-[#EBD8D0] text-[#2D2926] text-[8px] flex items-center justify-center rounded-full font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link id="nav-cart" to="/cart" className="p-2 text-[#2D2926] hover:text-[#D4AF37] transition-colors relative">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-[#2D2926] text-[#FCF8F4] text-[8px] flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              id="mobile-menu-toggle"
              className="md:hidden p-2 text-[#2D2926]"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FCF8F4] border-b border-[#EBD8D0]/30 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block text-lg tracking-widest uppercase py-2 ${
                    isActive(link.path) ? 'text-[#4A3F35] font-bold' : 'text-[#8D7B68]'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
