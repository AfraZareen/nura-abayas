/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

export const COLORS = {
  bg: '#FCF8F4', // Warm Champagne
  bgSoft: '#F9F1EA',
  accent: '#D4AF37', // Muted Gold
  feminine: '#EBD8D0', // Soft Blush
  text: '#2D2926', // Deep Charcoal
  textMuted: '#96897F',
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Silk Organza Abaya',
    price: 750,
    description: 'A luxurious silk organza abaya with delicate hand-stitched details and wide sleeves for a regal look.',
    image: '/pexels-bymalbus-35344026.jpg',
    images: [
      '/pexels-bymalbus-35344026.jpg',
      '/pexels-bymalbus-35344031.jpg',
      '/pexels-bymalbus-35344028.jpg'
    ],
    category: 'Silk',
    rating: 4.8,
    reviews: 124,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '2',
    name: 'Nude Linen Abaya',
    price: 450,
    description: 'Minimalist linen abaya perfect for summer comfort and effortless style. Features an open front design.',
    image: '/pexels-bymalbus-35263628.jpg',
    images: [
      '/pexels-bymalbus-35263628.jpg',
      '/pexels-bymalbus-35324626.jpg',
      '/pexels-bymalbus-35324628.jpg'
    ],
    category: 'Linen',
    rating: 4.5,
    reviews: 89,
    sizes: ['S', 'M', 'L'],
  },
  {
    id: '3',
    name: 'Midnight Crepe Abaya',
    price: 580,
    description: 'Sophisticated midnight blue crepe abaya with a subtle sheen and clean drapes.',
    image: '/pexels-bymalbus-35263627.jpg',
    images: [
      '/pexels-bymalbus-35263627.jpg',
      '/pexels-bymalbus-35263646.jpg',
      '/pexels-bymalbus-35263645.jpg'
    ],
    category: 'Crepe',
    rating: 4.9,
    reviews: 156,
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: '4',
    name: 'Nightfall Abaya',
    price: 620,
    description: 'A ethereal sage green abaya made from premium chiffon with layered textures.',
    image: '/product4.jpg',
    images: [
      '/product4.jpg',
      '/product4.2.jpg',
      '/product4.3.jpg'
    ],
    category: 'Chiffon',
    rating: 4.7,
    reviews: 42,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '5',
    name: 'Blue Whisper Abaya',
    price: 780,
    description: 'Premium velvet abaya in a soft dusty rose color, featuring intricate gold embroidery.',
    image: '/product6.jpg',
    images: [
      '/product6.jpg',
      '/product6.2.jpg',
      '/product6.3.jpg'
    ],
    category: 'Linen',
    rating: 5.0,
    reviews: 28,
    sizes: ['S', 'M', 'L'],
  },
  {
    id: '6',
    name: 'Sage Green Abaya',
    price: 480,
    description: 'Modern pleated details on a soft fabric. Lightweight and breathable for daily wear.',
    image: '/product8.jpg',
    images: [
      '/product8.jpg',
      '/product8.1.jpg',
      '/product8.2.jpg'
    ],
    category: 'Daily',
    rating: 4.6,
    reviews: 67,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '7',
    name: 'Onyx Shadow Abaya',
    price: 690,
    description: 'Classic black abaya with a modern twist. High-grade silk with matte finish.',
    image: '/product5.jpg',
    images: [
      '/product5.jpg',
      '/product5.2.jpg',
      '/product5.3.jpg'
    ],
    category: 'Silk',
    rating: 4.9,
    reviews: 210,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '8',
    name: 'Royal Red Kaftan',
    price: 800,
    description: 'The ultimate luxury kaftan with gold thread embroidery on premium silk.',
    image: '/product7.jpg',
    images: [
      '/product7.jpg',
      '/product7.1.jpg',
      '/product7.2.jpg'
    ],
    category: 'Premium',
    rating: 5.0,
    reviews: 12,
    sizes: ['S', 'M', 'L', 'XL'],
  },
];
