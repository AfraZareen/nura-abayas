/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';

export default function Wishlist() {
  const { wishlist } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-white">
        <SEO title="Your Wishlist" description="View your saved luxury abayas." />
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-8">
          <Heart size={40} strokeWidth={1} />
        </div>
        <h2 className="text-3xl font-serif text-[#4A3F35] mb-4">Your wishlist is empty</h2>
        <p className="text-[#8D7B68] mb-12 text-center max-w-sm">
          Save your favorite pieces here to keep an eye on them for later.
        </p>
        <Link
          to="/shop"
          className="bg-[#4A3F35] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#B4C5D4] transition-all"
        >
          View Collection
        </Link>
      </div>
    );
  }

  return (
    <div id="wishlist-page" className="pt-10 pb-24 bg-white">
      <SEO title="Your Wishlist" description="View your saved luxury abayas." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif text-[#4A3F35] mb-4">My Favorites</h1>
          <p className="text-[#8D7B68] uppercase tracking-widest text-[10px] font-bold">{wishlist.length} Saved Items</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
