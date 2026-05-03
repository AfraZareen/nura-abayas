/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-white">
        <SEO title="Your Cart" description="Review your selected luxury abayas." />
        <div className="w-24 h-24 bg-[#F5EFE6] rounded-full flex items-center justify-center text-[#4A3F35] mb-8">
          <ShoppingBag size={40} strokeWidth={1} />
        </div>
        <h2 className="text-3xl font-serif text-[#4A3F35] mb-4">Your cart is empty</h2>
        <p className="text-[#8D7B68] mb-12 text-center max-w-sm">
          Browse our collection of luxury abayas and find something beautiful to add here.
        </p>
        <Link
          to="/shop"
          className="bg-[#4A3F35] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#B4C5D4] transition-all"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div id="cart-page" className="pt-10 pb-24 bg-white">
      <SEO title="Your Cart" description="Review your selected luxury abayas and proceed to checkout." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif text-[#4A3F35] mb-16 text-center">Your Shopping Bag</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="space-y-8">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.selectedSize}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col sm:flex-row items-center sm:items-start group p-6 rounded-3xl bg-[#FDFBF7] border border-[#F5EFE6] hover:shadow-lg transition-all"
                  >
                    <div className="w-full sm:w-32 aspect-[3/4] rounded-2xl overflow-hidden mb-6 sm:mb-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow sm:ml-8 w-full">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-serif text-[#4A3F35]">{item.name}</h3>
                          <p className="text-xs text-[#B4C5D4] font-bold uppercase tracking-widest mt-1">Size: {item.selectedSize}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="flex justify-between items-end mt-8">
                        <div className="flex items-center bg-white rounded-full border border-[#F5EFE6] p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                            className="p-2 hover:text-[#B4C5D4] transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                            className="p-2 hover:text-[#B4C5D4] transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-xl font-light text-[#4A3F35]">AED {item.price * item.quantity}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-[#F5EFE6] rounded-3xl p-8 sticky top-24">
              <h2 className="text-2xl font-serif text-[#4A3F35] mb-8">Order Summary</h2>
              <div className="space-y-6 mb-8 text-sm">
                <div className="flex justify-between text-[#8D7B68]">
                  <span className="font-medium uppercase tracking-widest">Subtotal</span>
                  <span className="font-bold">AED {totalPrice}</span>
                </div>
                <div className="flex justify-between text-[#8D7B68]">
                  <span className="font-medium uppercase tracking-widest">Shipping</span>
                  <span className="font-bold italic">Calculated at checkout</span>
                </div>
                <div className="pt-6 border-t border-[#4A3F35]/10 flex justify-between text-[#4A3F35]">
                  <span className="text-lg font-serif">Total</span>
                  <span className="text-2xl font-bold">AED {totalPrice}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="group flex items-center justify-center space-x-3 w-full bg-[#4A3F35] text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#B4C5D4] transition-all shadow-xl"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="mt-8 flex flex-wrap justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                 <img src="/Visa_Inc.-Logo.wine.svg" alt="Visa" className="h-6" />
                 <img src="/Mastercard-Logo.wine.svg" alt="Mastercard" className="h-6" />
                 <img src="/Apple_Pay-Logo.wine.svg" alt="Apple Pay" className="h-6" />
                 <img src="/tabby-logo.svg" alt="Tabby" className="h-6" />
                 <img src="/Samsung_Pay-Logo.wine.svg" alt="Samsung Pay" className="h-6" />
                 <img src="/PayPal-Logo.wine.svg" alt="PayPal" className="h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
