export const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
export const BACKEND = API.replace(/\/api\/?$/, '');
let csrfRequest;
function csrfToken() {
  return typeof document === 'undefined' ? '' : decodeURIComponent(document.cookie.split('; ').find(value => value.startsWith('XSRF-TOKEN='))?.slice(11) || '');
}
export async function csrf() {
  if (!csrfRequest) csrfRequest = fetch(`${BACKEND}/sanctum/csrf-cookie`, { credentials:'include', headers:{Accept:'application/json'} }).then(response=>{if(!response.ok)throw new Error('Unable to initialize a secure session.');}).finally(()=>{csrfRequest=null;});
  return csrfRequest;
}
export const money = (cents) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(cents / 100);
export async function api(path, options = {}) {
  let response;
  const mutation = !['GET','HEAD'].includes((options.method || 'GET').toUpperCase());
  const multipart = typeof FormData !== 'undefined' && options.body instanceof FormData;
  try {
    if (mutation && typeof window !== 'undefined' && !csrfToken()) await csrf();
    const send = () => fetch(`${API}${path}`, { credentials:'include', ...options, headers: { Accept:'application/json', 'X-Requested-With':'XMLHttpRequest', ...(!multipart && {'Content-Type':'application/json'}), ...(mutation && csrfToken() && {'X-XSRF-TOKEN':csrfToken()}), ...options.headers }, cache:'no-store' });
    response = await send();
    if (response.status === 419 && typeof window !== 'undefined') { await csrf(); response = await send(); }
  }
  catch { throw new Error('We couldn’t connect to the store. Please try again shortly.'); }
  if (response.status === 204) return null;
  const data = await response.json().catch(()=>({message:'The server returned an unexpected response. Please try again.'}));
  if (!response.ok) {
    const error = new Error(data.errors ? Object.values(data.errors).flat().join(' ') : data.message || 'Something went wrong. Please try again.');
    error.status = response.status;
    error.errors = data.errors || {};
    throw error;
  }
  return data;
}
