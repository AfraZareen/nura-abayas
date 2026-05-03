/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'motion/react';

export default function Layout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans text-[#4A3F35]">
      <Navbar />
      <main className="flex-grow">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
