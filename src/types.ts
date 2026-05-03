/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  reviews: number;
  sizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
