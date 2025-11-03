import Link from 'next/link';
import Image from 'next/image';
import { products } from '../../lib/products';
import AddToCart from '../../components/AddToCart';

export default function ShopPage() {
  return (
    <div className="stack-xl">
      <h1 className="section-title">Shop</h1>
      <div className="grid">
        {products.map((p) => (
          <ProductCard
            key={p.slug}
            slug={p.slug}
            name={p.name}
            image={p.image}
            category={p.category}
            price={p.price}
            description={p.description}
          />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ slug, name, image, category, price, description }: { slug: string; name: string; image: string; category: string; price: number; description: string }) {
  return (
    <div className="card">
      <Link href={`/product/${slug}`}>
        <Image src={image} alt={name} width={640} height={800} className="cover" />
      </Link>
      <div className="card-body">
        <div className="row space-between">
          <div>
            <div className="title-sm">{name}</div>
            <div className="muted">{category}</div>
          </div>
          <div className="price">${price.toFixed(2)}</div>
        </div>
        <div className="sep" />
        <AddToCart product={{ slug, name, image, category, price, description }} />
      </div>
    </div>
  );
}

