"use client";

import Link from 'next/link';
import { useCart } from './CartProvider';

export default function Header() {
  const { toggleOpen, items } = useCart();
  const count = items.reduce((n, it) => n + it.quantity, 0);

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Zorp Tash home">ZORP TASH</Link>
        <nav className="nav">
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <button onClick={toggleOpen} className="btn-ghost" style={{ padding: '8px 14px', borderRadius: 999, border: '1px solid #ddd' }}>
            Cart{count > 0 ? ` (${count})` : ''}
          </button>
        </nav>
      </div>
    </header>
  );
}
