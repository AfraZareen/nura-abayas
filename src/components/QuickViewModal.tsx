/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, Heart, Minus, Plus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImage, setActiveImage] = useState(product?.image || '');
  const [error, setError] = useState('');

  // Update active image when product changes
  React.useEffect(() => {
    if (product) setActiveImage(product.image);
  }, [product]);

  const productImages = useMemo(() => {
    if (!product) return [];
    if (product.images && product.images.length > 0) return product.images;
    return [product.image];
  }, [product]);

  const { cart, addToCart, updateQuantity, toggleWishlist, wishlist } = useCart();

  const cartItem = useMemo(() => 
    product ? cart.find((item) => item.id === product.id && item.selectedSize === selectedSize) : null,
    [cart, product, selectedSize]
  );

  const isWishlisted = product ? wishlist.some((item) => item.id === product.id) : false;

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    setError('');
    addToCart(product, selectedSize);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#2D2926]/40 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-[#FCF8F4] w-full max-w-4xl rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2 bg-white/80 backdrop-blur-md rounded-full text-[#2D2926] hover:bg-[#2D2926] hover:text-white transition-all shadow-lg"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          {/* Left: Image */}
          <div className="w-full md:w-1/2 relative bg-[#F9F1EA]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            
            {/* Thumbnails overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 p-2 bg-white/30 backdrop-blur-md rounded-full border border-white/50">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                    activeImage === img ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} detail view ${i + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[90vh] md:max-h-none">
            <div className="mb-6">
              <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em] mb-2 block">
                {product.category}
              </span>
              <h2 className="text-3xl font-serif text-[#2D2926] mb-4 leading-tight">{product.name}</h2>
              <div className="flex items-center space-x-4">
                <div className="flex text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < 4.5 ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <span className="text-[10px] text-[#96897F] font-bold uppercase tracking-widest">
                  {product.reviews} Reviews
                </span>
              </div>
            </div>

            <p className="text-2xl font-serif text-[#2D2926] mb-8 italic">AED {product.price}</p>
            
            <p className="text-[#96897F] text-sm leading-relaxed mb-10 font-light line-clamp-3">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#2D2926]">Size</span>
                <button className="text-[10px] uppercase tracking-widest font-bold text-[#D4AF37] border-b border-[#D4AF37]">Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border flex items-center justify-center text-[10px] font-bold tracking-widest transition-all duration-500 ${
                      selectedSize === size
                        ? 'border-[#2D2926] bg-[#2D2926] text-[#FCF8F4] shadow-luxury'
                        : 'border-[#EBD8D0] text-[#2D2926] hover:border-[#2D2926]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {error && <p className="text-red-400 text-[9px] uppercase tracking-widest font-bold mt-4">{error}</p>}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {cartItem ? (
                <div className="flex-grow flex items-center justify-between bg-[#2D2926] text-white py-5 px-8 rounded-full font-bold uppercase tracking-[0.2em] text-[9px] shadow-luxury">
                  <button 
                    onClick={() => updateQuantity(product.id, selectedSize, -1)}
                    className="p-1 hover:text-[#D4AF37] transition-colors"
                  >
                    <Minus size={16} strokeWidth={1.5} />
                  </button>
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] opacity-60 mb-0.5 uppercase">In Bag</span>
                    <span className="text-xs">{cartItem.quantity}</span>
                  </div>
                  <button 
                    onClick={() => updateQuantity(product.id, selectedSize, 1)}
                    className="p-1 hover:text-[#D4AF37] transition-colors"
                  >
                     <Plus size={16} strokeWidth={1.5} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="flex-grow flex items-center justify-center space-x-3 bg-[#2D2926] text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[9px] hover:bg-[#D4AF37] hover:shadow-luxury transition-all duration-500"
                >
                  <ShoppingBag size={16} strokeWidth={1.5} />
                  <span>Reserve Piece</span>
                </button>
              )}
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 rounded-full border transition-all duration-500 flex items-center justify-center ${
                  isWishlisted ? 'bg-[#EBD8D0] border-[#EBD8D0] text-[#2D2926]' : 'border-[#EBD8D0] text-[#2D2926] hover:bg-[#EBD8D0]/20'
                }`}
              >
                <Heart size={18} strokeWidth={1.5} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
