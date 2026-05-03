/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, CreditCard, Truck, MapPin, ArrowRight, ShieldCheck, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isOrdered, setIsOrdered] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    paymentMethod: 'credit_card'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handlePlaceOrder = () => {
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  if (cart.length === 0 && !isOrdered) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif mb-8 text-[#4A3F35]">Your bag is empty</h2>
        <Link to="/shop" className="bg-[#4A3F35] text-white px-10 py-4 rounded-full text-xs uppercase tracking-widest font-bold">Back to Collections</Link>
      </div>
    );
  }

  return (
    <div id="checkout-page" className="pt-10 pb-24 bg-[#FDFBF7]">
      <SEO title="Checkout" description="Securely complete your Nura Abayas purchase." />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif text-[#4A3F35] mb-12 text-center">Process Order</h1>

        {/* Steps Info */}
        <div className="flex justify-center items-center mb-16 px-4">
           {[
             { n: 1, label: 'Delivery', icon: <MapPin size={16} /> },
             { n: 2, label: 'Payment', icon: <CreditCard size={16} /> },
             { n: 3, label: 'Review', icon: <ShoppingBag size={16} /> }
           ].map((s, i) => (
             <React.Fragment key={s.n}>
               <div className="flex flex-col items-center">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                   step >= s.n ? 'bg-[#4A3F35] text-white shadow-lg' : 'bg-white text-[#B4C5D4] border border-[#F5EFE6]'
                 }`}>
                   {s.icon}
                 </div>
                 <span className={`text-[10px] mt-2 uppercase tracking-widest font-bold transition-all ${
                   step >= s.n ? 'text-[#4A3F35]' : 'text-[#B4C5D4]'
                 }`}>{s.label}</span>
               </div>
               {i < 2 && (
                 <div className={`h-[1px] w-12 sm:w-20 mx-2 transition-all ${
                   step > s.n ? 'bg-[#4A3F35]' : 'bg-[#F5EFE6]'
                 }`} />
               )}
             </React.Fragment>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-[#F5EFE6] shadow-sm">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-serif text-[#4A3F35] mb-8">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                       <label className="text-[10px] uppercase tracking-widest font-bold text-[#8D7B68] block mb-2">Email Address</label>
                       <input
                         type="email"
                         name="email"
                         value={formData.email}
                         onChange={handleInputChange}
                         placeholder="you@example.com"
                         className="w-full px-6 py-4 bg-[#FDFBF7] border border-[#F5EFE6] rounded-xl focus:outline-none focus:border-[#B4C5D4] text-sm"
                       />
                    </div>
                    <div>
                       <label className="text-[10px] uppercase tracking-widest font-bold text-[#8D7B68] block mb-2">First Name</label>
                       <input
                         type="text"
                         name="firstName"
                         value={formData.firstName}
                         onChange={handleInputChange}
                         className="w-full px-6 py-4 bg-[#FDFBF7] border border-[#F5EFE6] rounded-xl focus:outline-none focus:border-[#B4C5D4] text-sm"
                       />
                    </div>
                    <div>
                       <label className="text-[10px] uppercase tracking-widest font-bold text-[#8D7B68] block mb-2">Last Name</label>
                       <input
                         type="text"
                         name="lastName"
                         value={formData.lastName}
                         onChange={handleInputChange}
                         className="w-full px-6 py-4 bg-[#FDFBF7] border border-[#F5EFE6] rounded-xl focus:outline-none focus:border-[#B4C5D4] text-sm"
                       />
                    </div>
                    <div className="md:col-span-2">
                       <label className="text-[10px] uppercase tracking-widest font-bold text-[#8D7B68] block mb-2">Address</label>
                       <input
                         type="text"
                         name="address"
                         value={formData.address}
                         onChange={handleInputChange}
                         className="w-full px-6 py-4 bg-[#FDFBF7] border border-[#F5EFE6] rounded-xl focus:outline-none focus:border-[#B4C5D4] text-sm"
                       />
                    </div>
                    <div>
                       <label className="text-[10px] uppercase tracking-widest font-bold text-[#8D7B68] block mb-2">City</label>
                       <input
                         type="text"
                         name="city"
                         value={formData.city}
                         onChange={handleInputChange}
                         className="w-full px-6 py-4 bg-[#FDFBF7] border border-[#F5EFE6] rounded-xl focus:outline-none focus:border-[#B4C5D4] text-sm"
                       />
                    </div>
                    <div>
                       <label className="text-[10px] uppercase tracking-widest font-bold text-[#8D7B68] block mb-2">Country</label>
                       <select
                         name="country"
                         value={formData.country}
                         onChange={handleInputChange}
                         className="w-full px-6 py-4 bg-[#FDFBF7] border border-[#F5EFE6] rounded-xl focus:outline-none focus:border-[#B4C5D4] text-sm appearance-none"
                       >
                         <option value="">Select Country</option>
                         <option value="UAE">United Arab Emirates</option>
                         <option value="KSA">Saudi Arabia</option>
                         <option value="Qatar">Qatar</option>
                         <option value="Kuwait">Kuwait</option>
                       </select>
                    </div>
                  </div>
                  <button
                    onClick={nextStep}
                    className="w-full mt-10 bg-[#4A3F35] text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#B4C5D4] transition-all"
                  >
                    Continue to Payment
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-serif text-[#4A3F35] mb-8">Payment Method</h2>
                  <div className="space-y-4">
                    {[
                      { id: 'tabby', label: 'Tabby (4 interest-free payments)', icon: '/tabby-logo.svg' },
                      { id: 'visa', label: 'Visa', icon: '/Visa_Inc.-Logo.wine.svg' },
                      { id: 'mastercard', label: 'Mastercard', icon: '/Mastercard-Logo.wine.svg' },
                      { id: 'apple_pay', label: 'Apple Pay', icon: '/Apple_Pay-Logo.wine.svg' },
                      { id: 'samsung_pay', label: 'Samsung Pay', icon: '/Samsung_Pay-Logo.wine.svg' },
                      { id: 'paypal', label: 'PayPal', icon: '/PayPal-Logo.wine.svg' },
                      { id: 'cod', label: 'Cash on Delivery', icon: '' }
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                          formData.paymentMethod === method.id ? 'border-[#4A3F35] bg-[#FDFBF7]' : 'border-[#F5EFE6] hover:border-[#B4C5D4]'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={formData.paymentMethod === method.id}
                            onChange={() => setFormData({ ...formData, paymentMethod: method.id })}
                            className="w-4 h-4 text-[#4A3F35] focus:ring-[#4A3F35]"
                          />
                          <span className="text-sm font-bold text-[#4A3F35] uppercase tracking-widest">{method.label}</span>
                        </div>
                        {method.icon && <img src={method.icon} alt={`${method.label} logo`} className="h-10 opacity-90 object-contain max-w-[80px]" />}
                      </label>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-10">
                    <button
                      onClick={prevStep}
                      className="flex-grow py-5 rounded-full border border-[#4A3F35] text-[#4A3F35] font-bold uppercase tracking-widest text-sm hover:bg-[#F5EFE6] transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      className="flex-grow bg-[#4A3F35] text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#B4C5D4] transition-all"
                    >
                      Review Order
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-serif text-[#4A3F35] mb-8">Review Your Order</h2>
                  <div className="bg-[#FDFBF7] rounded-2xl p-6 border border-[#F5EFE6] mb-8">
                     <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#B4C5D4]">Delivery to</h3>
                        <button onClick={() => setStep(1)} className="text-[10px] text-[#4A3F35] underline font-bold uppercase">Edit</button>
                     </div>
                     <p className="text-sm text-[#4A3F35] font-medium">{formData.firstName} {formData.lastName}</p>
                     <p className="text-xs text-[#8D7B68] mt-1">{formData.address}, {formData.city}, {formData.country}</p>
                  </div>
                  <div className="bg-[#FDFBF7] rounded-2xl p-6 border border-[#F5EFE6] mb-10">
                     <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#B4C5D4]">Payment Method</h3>
                        <button onClick={() => setStep(2)} className="text-[10px] text-[#4A3F35] underline font-bold uppercase">Edit</button>
                     </div>
                     <p className="text-sm text-[#4A3F35] font-bold uppercase tracking-widest">{formData.paymentMethod.replace('_', ' ')}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                      onClick={prevStep}
                      className="flex-grow py-5 rounded-full border border-[#4A3F35] text-[#4A3F35] font-bold uppercase tracking-widest text-sm hover:bg-[#F5EFE6] transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="flex-grow flex items-center justify-center space-x-3 bg-[#4A3F35] text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#B4C5D4] transition-all"
                    >
                      <ShieldCheck size={18} />
                      <span>Place Order · AED {totalPrice + 30}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Summary Sidebar (only visible on step 1 and 2 essentially, or desktop) */}
          <div className="lg:col-span-1">
             <div className="bg-white rounded-3xl p-6 border border-[#F5EFE6] sticky top-24">
                <h3 className="text-sm uppercase tracking-widest font-bold text-[#4A3F35] mb-6 border-b border-[#F5EFE6] pb-4">Order Preview</h3>
                <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6 pr-2 scrollbar-hide">
                   {cart.map((item) => (
                     <div key={`${item.id}-${item.selectedSize}`} className="flex items-center space-x-4">
                        <div className="w-12 h-16 rounded-lg overflow-hidden flex-shrink-0">
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow min-w-0">
                           <h4 className="text-xs font-bold text-[#4A3F35] truncate uppercase tracking-tighter">{item.name}</h4>
                           <p className="text-[10px] text-[#8D7B68] uppercase font-medium">QTY: {item.quantity} · SIZE: {item.selectedSize}</p>
                        </div>
                        <span className="text-xs font-bold text-[#4A3F35]">AED {item.price * item.quantity}</span>
                     </div>
                   ))}
                </div>
                <div className="space-y-3 text-[10px] uppercase font-bold tracking-widest text-[#8D7B68]">
                   <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-[#4A3F35]">AED {totalPrice}</span>
                   </div>
                   <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-[#4A3F35]">AED 30.00</span>
                   </div>
                   <div className="pt-4 border-t border-[#F5EFE6] flex justify-between text-[#4A3F35] text-sm font-serif">
                      <span className="capitalize text-lg">Total</span>
                      <span className="text-xl font-bold">AED {totalPrice + 30}</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isOrdered && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#4A3F35]/40 backdrop-blur-md"
              onClick={() => navigate('/')}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[40px] p-12 text-center max-w-sm w-full shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-[#B4C5D4]" />
              <div className="w-20 h-20 bg-[#FDFBF7] rounded-full flex items-center justify-center mx-auto mb-8 text-[#B4C5D4] border-2 border-[#B4C5D4]/10 shadow-inner">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-3xl font-serif text-[#4A3F35] mb-4">Shukran!</h2>
              <p className="text-[#8D7B68] text-sm leading-relaxed mb-10">
                Your order has been placed successfully. A confirmation email has been sent to <span className="font-bold text-[#4A3F35]">{formData.email}</span>.
              </p>
              <button
                onClick={() => navigate('/')}
                className="w-full bg-[#4A3F35] text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#B4C5D4] transition-all shadow-lg"
              >
                Back to Home
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
