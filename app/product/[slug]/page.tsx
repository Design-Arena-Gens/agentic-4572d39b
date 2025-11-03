import Image from 'next/image';
import { notFound } from 'next/navigation';
import { findProduct } from '../../../lib/products';
import AddToCart from '../../../components/AddToCart';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = findProduct(params.slug);
  if (!product) return notFound();

  return (
    <div className="stack-xl">
      <div className="grid" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
        <div className="card image-card">
          <Image src={product.image} alt={product.name} width={1200} height={1500} className="cover" />
        </div>
        <div className="stack-xl">
          <div>
            <h1 className="section-title" style={{ fontSize: 32 }}>{product.name}</h1>
            <div className="muted" style={{ marginTop: 6 }}>{product.category}</div>
            <div style={{ fontSize: 22, fontWeight: 600, marginTop: 12 }}>${product.price.toFixed(2)}</div>
          </div>
          <p style={{ lineHeight: 1.7 }}>{product.description}</p>
          <div className="row" style={{ gap: 12 }}>
            <AddToCart product={product} />
          </div>
          <div className="muted" style={{ fontSize: 14 }}>Free 30-day returns. Carbon neutral shipping.</div>
        </div>
      </div>
    </div>
  );
}
