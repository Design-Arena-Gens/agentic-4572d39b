import Link from 'next/link';
import Image from 'next/image';
import { products } from '../lib/products';
import Button from '../components/Button';

export default function HomePage() {
  const hero = products.slice(0, 3);
  return (
    <div className="stack-xxl">
      <section className="hero">
        <div className="hero-content">
          <h1 className="headline">Zorp Tash</h1>
          <p className="subhead">Minimal forms. Maximum presence. Apparel & accessories for the modern mood.</p>
          <div>
            <Link href="/shop"><Button>Shop Collection</Button></Link>
          </div>
        </div>
        <div className="hero-grid">
          {hero.map((p) => (
            <div key={p.slug} className="card image-card">
              <Link href={`/product/${p.slug}`}>
                <Image src={p.image} alt={p.name} width={800} height={1000} className="cover" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="stack-xl">
        <h2 className="section-title">New Arrivals</h2>
        <div className="grid">
          {products.slice(0, 8).map((p) => (
            <div key={p.slug} className="card">
              <Link href={`/product/${p.slug}`}>
                <Image src={p.image} alt={p.name} width={640} height={800} className="cover" />
              </Link>
              <div className="card-body">
                <div className="row space-between">
                  <div>
                    <div className="title-sm">{p.name}</div>
                    <div className="muted">{p.category}</div>
                  </div>
                  <div className="price">${p.price.toFixed(2)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="center">
          <Link href="/shop"><Button variant="ghost">View all</Button></Link>
        </div>
      </section>

      <section className="band">
        <div className="band-inner">
          Crafted with intention. Designed for everyday elegance.
        </div>
      </section>
    </div>
  );
}
