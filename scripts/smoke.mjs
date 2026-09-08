import assert from 'node:assert/strict';

const base = process.env.STOREFRONT_URL || 'http://localhost:3000';
const routes = ['/', '/shop', '/category/women', '/category/men', '/category/essentials', '/category/accessories', '/collections', '/collections/everyday-edit', '/collections/slow-days', '/search?q=linen', '/product/relaxed-linen-shirt', '/cart', '/checkout', '/account/wishlist', '/about', '/contact', '/faq', '/shipping', '/returns', '/size-guide', '/journal', '/privacy', '/terms', '/robots.txt', '/sitemap.xml'];
for (const route of routes) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route);
  const body = await response.text();
  assert.ok(body.length > 0, `${route} is empty`);
  if (route.startsWith('/product/')) assert.ok(body.includes('Relaxed Linen Shirt') && body.includes('application/ld+json'), 'Server-rendered product and structured data must be present');
  if (route === '/sitemap.xml') assert.ok(body.includes('/product/relaxed-linen-shirt'), 'Sitemap must include the database catalog');
  console.log(`PASS ${route}`);
}
for (const route of ['/not-a-real-page', '/product/not-a-product']) {
  const response = await fetch(base + route);
  const body = await response.text();
  // Next.js can return 200 for notFound() after a streamed response has begun.
  assert.ok(body.includes('noindex') && body.includes('Let’s find your way back.'), `${route} must render a non-indexable 404 page`);
  console.log(`PASS ${route} (404 content and noindex)`);
}
console.log(`Verified ${routes.length + 2} routes. These HTTP checks do not replace interactive browser tests.`);
