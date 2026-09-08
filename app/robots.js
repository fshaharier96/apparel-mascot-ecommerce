export default function robots() {
  const site=process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return {rules:{userAgent:'*',allow:'/',disallow:['/checkout','/cart','/account/','/order/','/search']},sitemap:`${site}/sitemap.xml`};
}
