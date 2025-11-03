"use client";

import Button from './Button';
import { useCart } from './CartProvider';
import type { Product } from '../lib/products';

export default function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  return <Button onClick={() => add(product)}>Add to cart</Button>;
}
