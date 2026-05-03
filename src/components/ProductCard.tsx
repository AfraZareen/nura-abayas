/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, wishlist } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 1500);
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, images]);

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative bg-[#FCF8F4] overflow-hidden transition-all duration-700"
      >
        {/* Product Image */}
        <div className="relative aspect-[3/4.5] overflow-hidden rounded-[40px] shadow-soft group-hover:shadow-luxury transition-all duration-1000">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          
          {/* Progress Indicators */}
          {isHovered && images.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
              {images.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-0.5 transition-all duration-500 rounded-full ${
                    idx === currentImageIndex ? 'w-4 bg-white shadow-sm' : 'w-1.5 bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`absolute top-6 right-6 p-2.5 rounded-full backdrop-blur-xl transition-all duration-300 z-10 ${
              isWishlisted ? 'bg-[#EBD8D0] text-[#2D2926]' : 'bg-white/40 text-[#2D2926] hover:bg-white'
            }`}
          >
            <Heart size={16} strokeWidth={1.5} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          
          {/* Quick View Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-6 space-y-3 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
             <button
               onClick={() => setIsQuickViewOpen(true)}
               className="w-full h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#2D2926] shadow-xl hover:bg-[#2D2926] hover:text-white transition-all transform hover:scale-105"
             >
               <Eye size={14} strokeWidth={1.5} />
               <span>Quick View</span>
             </button>
             <Link
               to={`/product/${product.id}`}
               className="w-full h-12 bg-[#D4AF37]/90 backdrop-blur-md rounded-full flex items-center justify-center text-[10px] uppercase tracking-[0.2em] font-bold text-white shadow-xl hover:bg-[#D4AF37] transition-all transform hover:scale-105"
             >
               See Details
             </Link>
          </div>
        </div>

        {/* Content */}
        <div className="pt-6 pb-2 text-center">
          <h3 className="font-serif text-xl text-[#2D2926] mb-1 leading-tight px-4">
            <Link to={`/product/${product.id}`} className="hover:text-[#D4AF37] transition-colors">{product.name}</Link>
          </h3>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-[10px] text-[#96897F] uppercase tracking-[0.2em] font-medium">AED {product.price}</span>
            <span className="w-1 h-1 rounded-full bg-[#EBD8D0]"></span>
            <div className="flex text-[#D4AF37] items-center">
               <Star size={10} fill="currentColor" />
               <span className="text-[10px] ml-1 text-[#96897F] font-bold">{product.rating}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {isQuickViewOpen && (
        <QuickViewModal 
          product={product} 
          onClose={() => setIsQuickViewOpen(false)} 
        />
      )}
    </>
  );
};

export default ProductCard;
