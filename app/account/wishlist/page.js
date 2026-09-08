'use client';
import Link from 'next/link';
import { useStore } from '@/components/store-provider';
import ProductCard from '@/components/product-card';
export default function Page(){const {wishlist,ready}=useStore();return <div className="page-wrap"><p className="eyebrow">KEEP THE GOOD ONES CLOSE</p><h1>Your favorites.</h1><p className="page-intro">A little collection of things you love. Saved on this browser.</p>{!ready?<p>Loading your favorites…</p>:wishlist.length?<div className="product-grid home-grid">{wishlist.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="empty"><h2>Something will catch your eye.</h2><p>Tap the heart on a piece to save it here.</p><Link className="button" href="/shop">Find your favorites →</Link></div>}</div>;}
