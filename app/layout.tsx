import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartProvider } from '../components/CartProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zorp Tash ? Modern Fashion',
  description: 'Ultra-cool, minimalist fashion boutique for apparel & accessories.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-base text-text antialiased`}>        
        <CartProvider>
          <Header />
          <main className="container">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
