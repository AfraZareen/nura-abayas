/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

export default function About() {
  return (
    <div id="about-page" className="pt-10 pb-24 bg-white">
      <SEO 
        title="Our Philosophy" 
        description="Learn about the Nura Abayas philosophy, our commitment to artisanal craftsmanship, and premium fabrics." 
        keywords="about nura abayas, abaya craftsmanship, sustainable abaya, luxury abaya philosophy"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden">
               <img
                 src="./pexels-bymalbus-35475150.jpg"
                 alt="Artisan crafting a luxury Nura Abaya"
                 className="w-full h-full object-cover"
                 referrerPolicy="no-referrer"
               />
            </div>
            <div className="absolute -bottom-10 -right-10 w-50 h-50 bg-[#F5EFE6] rounded-full -z-10" />
          </motion.div>

          <div className="space-y-8">
            <span className="text-[#B4C5D4] text-xs font-bold uppercase tracking-[0.3em]">Our Story</span>
            <h1 className="text-5xl font-serif text-[#4A3F35] leading-tight">Born from a passion for <span className="italic">timeless elegance</span>.</h1>
            <p className="text-[#8D7B68] leading-relaxed text-lg">
              Founded in Dubai, Nura Abayas was born out of a desire to create modest fashion that doesn't compromise on luxury or style. We believe that an abaya is more than just a garment—it's a statement of identity, a celebration of tradition, and an embrace of modern sophistication.
            </p>
            <div className="grid grid-cols-2 gap-10 pt-8 border-t border-[#F5EFE6]">
               <div>
                  <h3 className="text-3xl font-serif text-[#4A3F35] mb-2">10+</h3>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-[#B4C5D4]">Years of Craftsmanship</p>
               </div>
               <div>
                  <h3 className="text-3xl font-serif text-[#4A3F35] mb-2">50k+</h3>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-[#B4C5D4]">Happy Clients Globally</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
