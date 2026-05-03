/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Filter, ChevronDown, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { PRODUCTS } from '../constants';

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(PRODUCTS.map((p) => p.category))];
    return cats;
  }, []);

  const filteredProducts = useMemo(() => {
    let result = activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

    if (sortBy === 'Price: Low to High') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, sortBy]);

  return (
    <div id="shop-page" className="pt-10 pb-24 bg-[#FCF8F4]">
      <SEO 
        title="Shop Collection" 
        description="Browse our complete collection of handcrafted luxury abayas. Find your perfect style from our curated selection." 
        keywords="shop abayas, buy abaya online, luxury abaya collection, nura abayas"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="text-center mb-20">
          <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Store</span>
          <h1 className="text-6xl font-serif text-[#2D2926]">The Collection</h1>
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-16 space-y-8 lg:space-y-0 border-y border-[#EBD8D0]/30 py-12">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-4 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-8 py-4 text-[10px] uppercase tracking-[0.3em] transition-all duration-700 group whitespace-nowrap rounded-full ${
                  activeCategory === cat
                    ? 'text-[#2D2926] font-black'
                    : 'text-[#96897F] font-medium hover:text-[#2D2926] hover:bg-white/40'
                }`}
              >
                <span className="relative z-10">{cat}</span>
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-white shadow-soft rounded-full -z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeCategoryDot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#D4AF37] rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-6 w-full lg:w-auto justify-center lg:justify-end shrink-0">
             <div className="h-10 w-[1px] bg-[#EBD8D0]/30 hidden lg:block mr-4" />
            <div className="relative group">
              <button className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#2D2926] bg-white/40 backdrop-blur-md px-10 py-5 rounded-full border border-white/50 shadow-soft hover:shadow-luxury transition-all duration-500">
                <SlidersHorizontal size={14} strokeWidth={1.5} className="text-[#D4AF37]" />
                <span>Sort By: {sortBy}</span>
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-500" />
              </button>
              <div className="absolute right-0 lg:right-0 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 top-full mt-4 w-60 bg-white/80 backdrop-blur-2xl shadow-luxury rounded-[30px] overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-20 border border-white/60 p-3">
                {['Featured', 'Price: Low to High', 'Price: High to Low'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className="block w-full text-left px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-[#96897F] hover:text-[#2D2926] hover:bg-white/50 rounded-2xl transition-all font-bold"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-[#8D7B68] italic">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
