import {api} from '@/lib/api';
export const dynamic='force-dynamic';
export default async function sitemap() {
  const site=process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const paths=['','/shop','/about','/contact','/faq','/returns','/shipping','/size-guide','/journal','/category/women','/category/men','/category/essentials','/category/accessories','/collections/everyday-edit','/collections/slow-days'];
  const first=await api('/products');
  const products=[...first.data];
  for(let page=2;page<=first.last_page;page++)products.push(...(await api(`/products?page=${page}`)).data);
  return [...paths.map(path=>({url:`${site}${path}`,changeFrequency:'weekly',priority:path===''?1:0.7})),...products.map(p=>({url:`${site}/product/${p.slug}`,lastModified:p.updated_at,changeFrequency:'weekly',priority:0.8}))];
}
