import Catalog from '@/components/catalog';
import { notFound } from 'next/navigation';
const names={women:'Women',men:'Men',essentials:'The essentials',accessories:'Accessories'};
export async function generateMetadata({params}){const {slug}=await params;return {title:names[slug]||'Collection'};}
export default async function Page({params}){const {slug}=await params;if(!names[slug])notFound();return <div className="page-wrap"><p className="eyebrow">CONSIDERED PIECES. ENDLESS POSSIBILITIES.</p><h1>{names[slug]}.</h1><p className="page-intro">Effortless silhouettes. Thoughtful details. Entirely you.</p><Catalog category={slug}/></div>;}
