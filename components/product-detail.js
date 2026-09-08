'use client';
import Link from 'next/link';
import { useState } from 'react';
import { money } from '@/lib/api';
import { useStore } from './store-provider';
import Icon from './icons';
import ProductCard from './product-card';
import StoreImage from './store-image';
import Reviews from './reviews';

export default function ProductDetail({ product }) {
  const { add, toggle, wishlist } = useStore();
  const [color, setColor] = useState(product.variants[0]?.color || '');
  const [size, setSize] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(product.image);
  const [zoom, setZoom] = useState(false);
  const selected = product.variants.find(v => v.color === color && v.size === size);
  const colors = [...new Map(product.variants.map(v => [v.color, v])).values()];
  const sizes = [...new Set(product.variants.map(v => v.size))];
  const saved = wishlist.some(p => p.id === product.id);
  function addItem() {
    if (!selected) { setMessage('Choose your size first.'); return; }
    if (!selected.stock) { setMessage('This combination is currently sold out.'); return; }
    add(product, selected);
    setMessage('Added to your bag.');
  }
  return <div className="page-wrap">
    <p className="breadcrumbs"><Link href="/">Home</Link> / <Link href={`/category/${product.category.slug}`}>{product.category.name}</Link> / {product.name}</p>
    <div className="product-detail">
      <div>
        <button className={`gallery-main ${zoom ? 'zoomed' : ''}`} onClick={() => setZoom(!zoom)} aria-label={zoom ? 'Zoom out' : 'Zoom product image'}><StoreImage src={image} alt={product.name} sizes="(max-width: 700px) 90vw, 50vw" loading="eager"/></button>
        <div className="thumbnails">{product.images.map((src, i) => <button key={i} onClick={() => setImage(src)} aria-label={`View image ${i + 1}`}><StoreImage src={src} alt="" sizes="70px"/></button>)}</div>
      </div>
      <div className="product-description">
        <p className="eyebrow">{product.badge || 'THE EVERYDAY COLLECTION'}</p>
        <h1>{product.name}</h1>
        <p className="detail-price">{money(selected?.price ?? product.price)} {product.compare_price && <del>{money(product.compare_price)}</del>}</p>
        <p>{product.description}</p>
        <div className="selector-title"><strong>Color · {color}</strong></div>
        <div className="color-options">{colors.map(v => <button key={v.color} className={v.color === color ? 'selected' : ''} style={{background:v.color_hex}} aria-label={v.color} aria-pressed={v.color === color} onClick={() => {setColor(v.color);setImage(v.image||product.image);setMessage('');}}/>)}</div>
        <div className="selector-title"><strong>Choose your size</strong><Link href="/size-guide" className="underlined">Size guide ↗</Link></div>
        <div className="sizes">{sizes.map(s => {
          const variant = product.variants.find(v => v.color === color && v.size === s);
          return <button className={size === s ? 'selected' : ''} disabled={!variant?.stock} aria-pressed={size === s} key={s} onClick={() => {setSize(s);setImage(variant.image||product.image);setMessage('');}}>{s}</button>;
        })}</div>
        <p className="stock">{selected ? `${selected.stock} available · ${selected.color}` : 'Select a size to check availability'}</p>
        <div className="buy-row"><button className="button" disabled={selected?.stock === 0} onClick={addItem}>Add to bag <Icon name="bag"/></button><button className={`wishlist-button ${saved ? 'saved' : ''}`} aria-label="Save to wishlist" aria-pressed={saved} onClick={() => toggle(product)}><Icon name="heart"/></button></div>
        <p role="status">{message} {message === 'Added to your bag.' && <Link className="underlined" href="/cart">View bag →</Link>}</p>
        <div className="detail-perks"><p><Icon name="truck"/> Free shipping on orders $150+</p><p><Icon name="return"/> Easy returns within 30 days</p></div>
        <details open><summary>The details</summary><p>Relaxed styling with a comfortable everyday fit. Product photography is illustrative; consult the garment label for exact fabric composition.</p></details>
        <details><summary>Care & keeping</summary><p>Follow the care label on your garment. Wash similar colors together, use a gentle cycle where suitable, and air dry to help your pieces last.</p></details>
        <details><summary>Delivery & returns</summary><p>Standard US delivery: 5–7 business days. $8 shipping, free on orders $150+. <Link href="/returns">Read our return policy.</Link></p></details>
      </div>
    </div>
    {!!product.related?.length && <section className="related-products"><p className="eyebrow">BETTER TOGETHER</p><h2>Complete your everyday.</h2><div className="product-grid home-grid">{product.related.map(p => <ProductCard key={p.id} product={p}/>)}</div></section>}
    <Reviews product={product}/>
  </div>;
}
