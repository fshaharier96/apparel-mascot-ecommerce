'use client';
import StoreImage from './store-image';
import Link from 'next/link';
import { useStore } from './store-provider';
import { money } from '@/lib/api';
import Icon from './icons';
export default function ProductCard({ product }) {
  const { wishlist, toggle } = useStore(); const saved = wishlist.some(p=>p.id===product.id);
  return <article className="product-card"><div className="product-image"><Link href={`/product/${product.slug}`}><StoreImage src={product.image} alt={product.name} loading="lazy"/></Link>{product.badge && <span className="badge">{product.badge}</span>}<button className={`favorite ${saved?'saved':''}`} aria-label={`${saved?'Remove':'Save'} ${product.name}`} aria-pressed={saved} onClick={()=>toggle(product)}><Icon name="heart" size={18}/></button><Link className="quick-view" href={`/product/${product.slug}`}>Discover the details <span>↗</span></Link></div><div className="product-info"><Link href={`/product/${product.slug}`}>{product.name}</Link><span>{money(product.price)}</span></div><div className="product-sub"><span>{product.category?.name} · Relaxed fit</span>{product.compare_price && <del>{money(product.compare_price)}</del>}</div><div className="swatches">{[...new Map(product.variants.map(v=>[v.color,v])).values()].map(v=><span key={v.color} style={{background:v.color_hex}} title={v.color}/>)}<small>{product.variants[0]?.color}</small></div></article>;
}

