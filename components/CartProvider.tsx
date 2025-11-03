"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Button from './Button';
import { products, type Product } from '../lib/products';

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (slug: string) => void;
  update: (slug: string, qty: number) => void;
  total: number;
  open: boolean;
  toggleOpen: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'zorp-tash-cart-v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = (product: Product, qty: number = 1) => {
    setItems((prev) => {
      const next = [...prev];
      const idx = next.findIndex((i) => i.product.slug === product.slug);
      if (idx >= 0) next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
      else next.push({ product, quantity: qty });
      return next;
    });
    setOpen(true);
  };

  const remove = (slug: string) => setItems((prev) => prev.filter((i) => i.product.slug !== slug));

  const update = (slug: string, qty: number) =>
    setItems((prev) => prev.map((i) => (i.product.slug === slug ? { ...i, quantity: Math.max(1, qty) } : i)));

  const total = useMemo(() => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0), [items]);

  const value: CartContextValue = { items, add, remove, update, total, open, toggleOpen: () => setOpen((v) => !v) };

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartSidebar />
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

function CartSidebar() {
  const { items, remove, update, total, open, toggleOpen } = useCart();
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Shopping cart">
      <div className="sidebar-header">
        <div style={{ fontWeight: 600 }}>Your Cart</div>
        <button onClick={toggleOpen} className="btn-ghost" style={{ padding: '6px 12px', borderRadius: 999, border: '1px solid #ddd' }}>Close</button>
      </div>
      <div className="sidebar-body">
        {items.length === 0 ? (
          <div className="muted">Your cart is empty.</div>
        ) : (
          <div className="stack-xl">
            {items.map((i) => (
              <div key={i.product.slug} className="row" style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div className="row" style={{ gap: 12 }}>
                  <Image src={i.product.image} alt={i.product.name} width={72} height={90} style={{ borderRadius: 8, objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{i.product.name}</div>
                    <div className="muted">${i.product.price.toFixed(2)}</div>
                    <div className="quantity" style={{ marginTop: 8 }}>
                      <button onClick={() => update(i.product.slug, i.quantity - 1)} aria-label="Decrease quantity">?</button>
                      <span className="num">{i.quantity}</span>
                      <button onClick={() => update(i.product.slug, i.quantity + 1)} aria-label="Increase quantity">+</button>
                    </div>
                  </div>
                </div>
                <button onClick={() => remove(i.product.slug)} className="btn-ghost" style={{ padding: '6px 12px', borderRadius: 999, border: '1px solid #ddd' }}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="sidebar-footer">
        <div className="row space-between" style={{ marginBottom: 12 }}>
          <div className="muted">Subtotal</div>
          <div style={{ fontWeight: 600 }}>${total.toFixed(2)}</div>
        </div>
        <Button style={{ width: '100%' }}>Checkout</Button>
        <div className="muted" style={{ fontSize: 12, marginTop: 8 }}>Free shipping on orders over $150</div>
      </div>
    </aside>
  );
}
