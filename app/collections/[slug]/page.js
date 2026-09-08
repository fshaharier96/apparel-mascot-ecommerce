import Catalog from '@/components/catalog';
import { notFound } from 'next/navigation';
export async function generateMetadata({params}){const {slug}=await params;return {title:slug==='everyday-edit'?'The Everyday Edit':'Slow days'};}
export default async function Page({params}){const {slug}=await params;if(!['everyday-edit','slow-days'].includes(slug))notFound();return <><div className="collection-banner"><p className="eyebrow">A MASCOT COLLECTION</p><h1>{slug==='everyday-edit'?'The Everyday Edit.':'Made for slow days.'}</h1><p>Easy layers. Soft textures. A wardrobe that moves at your pace.</p></div><div className="page-wrap"><Catalog collection={slug}/></div></>;}
