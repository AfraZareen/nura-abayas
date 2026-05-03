/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Heart, Leaf } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { PRODUCTS } from '../constants';

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 4);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const slides = [
    {
      image: "./pexels-bymalbus-35591540.jpg",
      title: "Luminous",
      emphasis: "Silk",
      tagline: "The Organza Series"
    },
    {
      image: "./pexels-bymalbus-35344030.jpg",
      title: "Onyx",
      emphasis: "Elegance",
      tagline: "Signature Noir Collection"
    },
    {
      image: "./product7.2.jpg",
      title: "Golden",
      emphasis: "Heritage",
      tagline: "Royal Kaftan Edition"
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="home-page" className="bg-[#FCF8F4]">
      <SEO 
        title="Home" 
        description="Discover our new Spring/Summer collection of luxury abayas. Meticulously crafted abayas that blend centuries of tradition with contemporary luxury." 
        keywords="luxury abayas, modern abaya, nura abayas, premium abaya, silk abaya"
      />
      {/* Hero Section */}
      <section id="hero" className="relative h-[90vh] flex items-center bg-[#F9F1EA] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#EBD8D0]/20 rounded-l-[200px] z-0 hidden lg:block" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-left"
            >
              <span className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] mb-6 block font-bold">
                {slides[currentSlide].tagline}
              </span>
              <h1 className="text-6xl md:text-8xl font-serif text-[#2D2926] leading-[0.95] mb-10">
                {slides[currentSlide].title} <br />
                <span className="italic font-light text-[#96897F]">{slides[currentSlide].emphasis}</span>
              </h1>
              <p className="text-sm md:text-base text-[#96897F] mb-12 max-w-md leading-loose font-light">
                Discover our new Spring/Summer collection. Meticulously crafted abayas that blend centuries of tradition with contemporary luxury.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <Link
                  to="/shop"
                  className="bg-[#2D2926] text-[#FCF8F4] px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#D4AF37] transition-all shadow-luxury text-center"
                >
                  Shop the Collection
                </Link>
                <Link
                  to="/about"
                  className="bg-transparent text-[#2D2926] px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] border border-[#2D2926]/20 hover:bg-[#2D2926] hover:text-white transition-all text-center"
                >
                  Our Philosophy
                </Link>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center space-x-4 mt-16">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className="group relative py-4 focus:outline-none"
                  >
                    <div className={`h-[2px] transition-all duration-500 ${
                      currentSlide === i ? 'w-12 bg-[#D4AF37]' : 'w-6 bg-[#2D2926]/10 group-hover:bg-[#2D2926]/30'
                    }`} />
                  </button>
                ))}
              </div>
            </motion.div>
            
            <div className="relative hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                  transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                  className="relative"
                >
                  <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto group">
                    {/* Unique Decorative Frame */}
                    <div className="absolute -inset-4 border border-[#D4AF37]/20 rounded-[100px_40px_140px_60px] transform rotate-3 group-hover:rotate-0 transition-transform duration-1000 ease-out" />
                    <div className="absolute -inset-4 border border-[#2D2926]/5 rounded-[60px_140px_40px_100px] transform -rotate-3 group-hover:rotate-0 transition-transform duration-1000 ease-out delay-75" />
                    
                    {/* Main Image Frame */}
                    <div className="absolute inset-0 z-20 rounded-[80px_20px_120px_40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(45,41,38,0.25)] border-4 border-white transform transition-transform duration-700 group-hover:scale-[1.02]">
                      <img
                        src={slides[currentSlide].image}
                        alt={`${slides[currentSlide].title} - ${slides[currentSlide].tagline}`}
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-8 -left-12 w-40 h-40 bg-[#EBD8D0]/40 backdrop-blur-2xl rounded-full border border-white/50 z-30 flex items-center justify-center p-8 text-center">
                      <span className="text-[10px] font-serif italic text-[#2D2926] leading-tight">Hand-crafted Excellence</span>
                    </div>

                    <div className="absolute -bottom-1 right-10 z-30 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full shadow-soft border border-white/20">
                      <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-[#D4AF37]">Signature Drape</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Artistic Background Blurs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#EBD8D0]/5 blur-[120px] -z-20 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-40 right-[-10%] w-[30%] aspect-square bg-[#FCF8F4] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">Selected Pieces</span>
            <h2 className="text-5xl font-serif text-[#2D2926]">Signature Collections</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-[#F9F1EA] relative overflow-hidden">
        {/* Subtle decorative circle */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#EBD8D0]/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
             <span className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">Our Standards</span>
             <h2 className="text-5xl font-serif text-[#2D2926] mb-8">The Nura Philosophy</h2>
             <p className="text-[#96897F] leading-loose font-light">
               We believe that true luxury lies in the quiet details. Our commitment to artisanal craftsmanship ensures that every piece you wear tells a story of grace and intentionality.
             </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                icon: <ShieldCheck size={32} strokeWidth={1} />,
                title: 'Premium Fabrics',
                desc: 'We source only the finest silks, crepes, and linens from the world\'s most prestigious mills.',
              },
              {
                icon: <Leaf size={32} strokeWidth={1} />,
                title: 'Sustainable Drape',
                desc: 'Our designs are timeless, encouraging a mindful and sustainable journey through fashion.',
              },
              {
                icon: <Heart size={32} strokeWidth={1} />,
                title: 'Artisanal Comfort',
                desc: 'Breathable, lightweight, and meticulously tailored for effortless movement and refined comfort.',
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-20 h-20 mx-auto rounded-full bg-white flex items-center justify-center text-[#2D2926] mb-8 group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-700 shadow-soft">
                  {item.icon}
                </div>
                <h3 className="text-xl font-serif mb-6 text-[#2D2926] tracking-tight">{item.title}</h3>
                <p className="text-[13px] text-[#96897F] leading-relaxed px-6 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Preview */}
      <section className="py-32 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">Artisan Testimonials</span>
            <h2 className="text-5xl font-serif text-[#2D2926] mb-6">Voice of Grace</h2>
            <div className="flex justify-center text-[#D4AF37] mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#96897F]">4.9/5 Based on Global Reviews</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                name: 'Layla M.',
                text: 'The quality of the silk is absolutely unmatched. I wore my Silk Organza abaya to a gala and felt like art in motion.',
              },
              {
                name: 'Sarah A.',
                text: 'Bespoke packaging and prompt delivery. The Minimalist Nude linen has become my signature daily piece.',
              },
              {
                name: 'Mariam K.',
                text: 'Finally a brand that truly understands quiet luxury. The fit is perfect and the drape is architectural perfection.',
              },
            ].map((review, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-[#FCF8F4] p-12 rounded-[40px] border border-[#EBD8D0]/20 shadow-soft hover:shadow-luxury transition-all duration-700 h-full flex flex-col"
              >
                <p className="italic text-[#2D2926] text-lg mb-10 leading-loose font-serif font-light">"{review.text}"</p>
                <div className="mt-auto flex items-center space-x-5">
                  <div className="w-12 h-12 rounded-full bg-[#EBD8D0] flex items-center justify-center text-[#2D2926] font-bold uppercase text-xs">
                    {review.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-[#2D2926]">{review.name}</h4>
                    <span className="text-[9px] text-[#96897F] uppercase tracking-widest font-bold">Verified Collector</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
