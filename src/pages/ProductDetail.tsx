/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, ChevronRight, Minus, Plus } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = useMemo(() => PRODUCTS.find((p) => p.id === id), [id]);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImage, setActiveImage] = useState(product?.image || '');
  const [error, setError] = useState('');

  // Update active image when product changes
  React.useEffect(() => {
    setActiveImage(product.image);
  }, [product]);

  const productImages = useMemo(() => {
    if (product.images && product.images.length > 0) return product.images;
    return [product.image];
  }, [product]);
  const { cart, addToCart, updateQuantity, toggleWishlist, wishlist } = useCart();

  const cartItem = useMemo(() => 
    cart.find((item) => item.id === product?.id && item.selectedSize === selectedSize),
    [cart, product?.id, selectedSize]
  );

  const isWishlisted = product ? wishlist.some((item) => item.id === product.id) : false;

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-[#B4C5D4] underline uppercase tracking-widest text-sm">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    setError('');
    addToCart(product, selectedSize);
    // Could show a toast here
  };

  return (
    <div id="product-detail-page" className="pt-10 pb-24 bg-[#FCF8F4]">
      <SEO 
        title={product.name} 
        description={product.description} 
        keywords={`${product.category.toLowerCase()} abaya, ${product.name.toLowerCase()}, luxury abaya`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] font-bold text-[#96897F] mb-12">
          <Link to="/" className="hover:text-[#2D2926]">Home</Link>
          <ChevronRight size={10} />
          <Link to="/shop" className="hover:text-[#2D2926]">Collection</Link>
          <ChevronRight size={10} />
          <span className="text-[#2D2926]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28 items-start">
          {/* Gallery */}
          <div className="space-y-6 sticky top-24">
            <motion.div
              layoutId={`img-${product.id}`}
              className="aspect-[3/4.5] rounded-[60px] overflow-hidden bg-[#F9F1EA] shadow-luxury"
            >
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
            </motion.div>
            <div className="grid grid-cols-3 gap-6">
               {productImages.map((img, i) => (
                 <div 
                   key={i} 
                   onClick={() => setActiveImage(img)}
                   className={`aspect-square rounded-[30px] overflow-hidden bg-[#F9F1EA] cursor-pointer transition-all border-2 ${
                     activeImage === img ? 'border-[#D4AF37] shadow-soft' : 'border-white/50 hover:opacity-80'
                   }`}
                 >
                   <img src={img} alt={`${product.name} detail view ${i + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                 </div>
               ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col pt-4">
            <div className="mb-10">
              <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">{product.category} Collection</span>
              <h1 className="text-5xl md:text-6xl font-serif text-[#2D2926] mb-6 leading-tight">{product.name}</h1>
              <div className="flex items-center space-x-6 mb-8">
                 <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4.5 ? 'currentColor' : 'none'} />)}
                 </div>
                 <span className="text-[10px] text-[#96897F] font-bold uppercase tracking-widest">{product.reviews} Artisan Reviews</span>
              </div>
              <span className="text-4xl font-serif text-[#2D2926] italic">AED {product.price}</span>
            </div>

            <p className="text-[#96897F] leading-loose mb-12 text-lg font-light">
              {product.description} Crafted with the finest attention to detail, this piece embodies the Nura philosophy of quiet luxury and graceful silhouette.
            </p>

            {/* Size Selection */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#2D2926]">Select Your Size</span>
                <button className="text-[10px] uppercase tracking-widest font-bold text-[#D4AF37] hover:opacity-70 transition-opacity border-b border-[#D4AF37]">Measurement Guide</button>
              </div>
              <div className="flex space-x-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-16 h-16 rounded-full border flex items-center justify-center text-xs font-bold tracking-widest transition-all duration-500 ${
                      selectedSize === size
                        ? 'border-[#2D2926] bg-[#2D2926] text-[#FCF8F4] shadow-luxury'
                        : 'border-[#EBD8D0] text-[#2D2926] hover:border-[#2D2926]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {error && <p className="text-red-400 text-[10px] uppercase tracking-widest font-bold mt-4">{error}</p>}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6 mb-16">
               {cartItem ? (
                 <div className="flex-grow flex items-center justify-between bg-[#2D2926] text-white py-6 px-8 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-luxury transition-all duration-500">
                   <button 
                     onClick={() => updateQuantity(product.id, selectedSize, -1)}
                     className="p-1 hover:text-[#D4AF37] transition-colors"
                   >
                     <Minus size={18} strokeWidth={1.5} />
                   </button>
                   <div className="flex flex-col items-center">
                     <span className="text-[8px] opacity-60 mb-1">Quantity in Bag</span>
                     <span className="text-sm">{cartItem.quantity}</span>
                   </div>
                   <button 
                     onClick={() => updateQuantity(product.id, selectedSize, 1)}
                     className="p-1 hover:text-[#D4AF37] transition-colors"
                   >
                     <Plus size={18} strokeWidth={1.5} />
                   </button>
                 </div>
               ) : (
                 <button
                   onClick={handleAddToCart}
                   className="flex-grow flex items-center justify-center space-x-3 bg-[#2D2926] text-white py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#D4AF37] hover:shadow-luxury transition-all duration-500"
                 >
                   <ShoppingBag size={18} strokeWidth={1.5} />
                   <span>Reserve Piece</span>
                 </button>
               )}
               <button
                 onClick={() => toggleWishlist(product)}
                 className={`px-10 py-6 rounded-full border transition-all duration-500 flex items-center justify-center ${
                   isWishlisted ? 'bg-[#EBD8D0] border-[#EBD8D0] text-[#2D2926]' : 'border-[#EBD8D0] text-[#2D2926] hover:bg-[#EBD8D0]/20'
                 }`}
               >
                 <Heart size={18} strokeWidth={1.5} fill={isWishlisted ? 'currentColor' : 'none'} />
               </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-[#EBD8D0]/30">
               <div className="flex items-center space-x-4">
                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#D4AF37] shadow-soft">
                   <Truck size={18} strokeWidth={1} />
                 </div>
                 <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#96897F]">Concierge Shipping</span>
               </div>
               <div className="flex items-center space-x-4">
                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#D4AF37] shadow-soft">
                   <RotateCcw size={18} strokeWidth={1} />
                 </div>
                 <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#96897F]">Graceful Returns</span>
               </div>
               <div className="flex items-center space-x-4">
                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#D4AF37] shadow-soft">
                   <ShieldCheck size={18} strokeWidth={1} />
                 </div>
                 <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#96897F]">Secure Atelier</span>
               </div>
            </div>
          </div>
        </div>

        {/* Reviews Section Placeholder */}
        <section className="mt-32">
           <div className="border-b border-[#4A3F35]/10 mb-12 flex space-x-12">
              <button className="pb-4 border-b-2 border-[#4A3F35] text-xs uppercase tracking-widest font-bold">Reviews ({product.reviews})</button>
              <button className="pb-4 text-xs uppercase tracking-widest font-bold text-[#8D7B68] hover:text-[#4A3F35]">Shipping & Care</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             {[1, 2].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center space-x-2 text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-[#4A3F35] italic">"Beautiful fabric and perfect length. Exceeded my expectations!"</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Amina J.</span>
                    <span className="w-1 h-1 rounded-full bg-[#B4C5D4]"></span>
                    <span className="text-[10px] text-[#8D7B68] uppercase font-medium">May 12, 2024</span>
                  </div>
                </div>
             ))}
           </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-32">
            <h2 className="text-3xl font-serif text-[#4A3F35] mb-12">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
