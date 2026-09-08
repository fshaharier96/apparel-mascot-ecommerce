import { api } from '@/lib/api';
import ProductDetail from '@/components/product-detail';
import { notFound } from 'next/navigation';
export async function generateMetadata({params}){const {slug}=await params;return {title:slug.split('-').map(s=>s[0].toUpperCase()+s.slice(1)).join(' ')};}
export default async function Page({params}) {
  const {slug}=await params;let product;
  try {product=await api(`/products/${encodeURIComponent(slug)}`);} catch(e){if(e.status===404)notFound();throw e;}
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Product',name:product.name,description:product.description,image:product.images,offers:{'@type':'Offer',priceCurrency:'USD',price:product.price/100,availability:product.variants.some(v=>v.stock>0)?'https://schema.org/InStock':'https://schema.org/OutOfStock'}}).replace(/</g,'\\u003c')}}/><ProductDetail product={product}/></>;
}
