'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from './auth-provider';

const Context = createContext(null);
export function StoreProvider({ children }) {
  const {user,loading:authLoading}=useAuth();
  const [accountReady,setAccountReady]=useState(null);
  const accountId=user?.id??null;
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [ready, setReady] = useState(false);
  const [syncError, setSyncError] = useState('');
  const syncQueue = useRef(Promise.resolve());
  const wishlistQueue = useRef(Promise.resolve());
  const latestCart = useRef(cart);
  const latestWishlist = useRef(wishlist);
  useEffect(()=>{ latestCart.current=cart; latestWishlist.current=wishlist; },[cart,wishlist]);

  useEffect(()=>{
    if(!ready||authLoading)return;
    let active=true;
    async function mergeAccount(){
      try{
        if(accountId){
          const [remote,saved]=await Promise.all([api('/cart'),api('/me/wishlist',{method:'PUT',body:JSON.stringify({product_ids:latestWishlist.current.map(p=>p.id),merge:true})})]);
          if(!active)return;
          const merged=new Map(remote.items.map(item=>[item.variant.id,item]));
          for(const item of latestCart.current){const previous=merged.get(item.variant.id);merged.set(item.variant.id,{...item,quantity:Math.min(10,Math.max(item.quantity,previous?.quantity||0))});}
          setCart([...merged.values()]);setWishlist(saved);setAccountReady(accountId);
        }else if(accountReady!==null){
          setCart([]);setWishlist([]);setAccountReady(null);
          try{localStorage.removeItem('mascot-cart-token');}catch{}
        }
      }catch{if(active)setSyncError('Your saved account items could not be loaded. Please refresh to try again.');}
    }
    mergeAccount();return()=>{active=false;};
  },[accountId,authLoading,ready,accountReady]);

  useEffect(()=>{
    if(!accountId||accountReady!==accountId)return;
    const timer=setTimeout(()=>{wishlistQueue.current=wishlistQueue.current.catch(()=>{}).then(()=>api('/me/wishlist',{method:'PUT',body:JSON.stringify({product_ids:wishlist.map(p=>p.id)})})).catch(()=>setSyncError('Your favorites could not sync. Please refresh and try again.'));},350);
    return()=>clearTimeout(timer);
  },[wishlist,accountId,accountReady]);

  useEffect(() => {
    let active = true;
    async function hydrate() {
      try {
        const raw = localStorage.getItem('mascot-store');
        const saved = JSON.parse(raw || '{}');
        let restored = saved.cart;
        const token = localStorage.getItem('mascot-cart-token');
        if (!raw && token) {
          try { restored = (await api('/cart', {headers:{'X-Cart-Token':token}})).items; }
          catch { /* Local shopping remains available during an API outage. */ }
        }
        if (!active) return;
        if (Array.isArray(restored)) setCart(restored.filter(i => i.variant?.id && i.product?.id && Number.isInteger(i.quantity) && i.quantity > 0));
        if (Array.isArray(saved.wishlist)) setWishlist(saved.wishlist.filter(i => i?.id && i?.slug));
      } catch { /* A damaged local cart starts fresh. */ }
      finally { if (active) setReady(true); }
    }
    hydrate();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (ready) {
      try { localStorage.setItem('mascot-store', JSON.stringify({cart,wishlist})); }
      catch { /* Shopping continues without browser persistence. */ }
    }
  }, [cart,wishlist,ready]);

  useEffect(() => {
    if (!ready || authLoading || accountId!==accountReady) return;
    let active = true;
    const timer = setTimeout(() => {
      syncQueue.current = syncQueue.current.catch(() => {}).then(async () => {
        let token;
        try {
          token = localStorage.getItem('mascot-cart-token');
          if (!token && !cart.length) return;
          if (!token) {
            token = crypto.randomUUID() + crypto.randomUUID();
            localStorage.setItem('mascot-cart-token',token);
          }
          await api('/cart',{method:'PUT',headers:{'X-Cart-Token':token},body:JSON.stringify({items:cart.map(i=>({variant_id:i.variant.id,quantity:i.quantity}))})});
          if(active)setSyncError('');
        } catch { if(active)setSyncError('Your bag is available on this device. We could not sync it to the store; checkout will recheck availability.'); }
      });
    },350);
    return () => { active=false;clearTimeout(timer); };
  },[cart,ready,authLoading,accountId,accountReady]);

  function add(product, variant) {
    setCart(items => {
      const existing = items.find(i => i.variant.id === variant.id);
      return existing ? items.map(i => i.variant.id === variant.id ? { ...i, quantity: Math.min(i.quantity + 1, variant.stock, 10) } : i) : [...items, { product, variant, quantity: 1 }];
    });
  }
  function quantity(id, amount) { setCart(items => items.map(i => i.variant.id === id ? { ...i, quantity: Math.min(amount, i.variant.stock, 10) } : i).filter(i => i.quantity > 0)); }
  function toggle(product) { setWishlist(items => items.some(i => i.id === product.id) ? items.filter(i => i.id !== product.id) : [...items, product]); }
  return <Context.Provider value={{cart,wishlist,ready,syncError,add,quantity,toggle,clear:()=>setCart([])}}>{children}</Context.Provider>;
}
export const useStore = () => useContext(Context);
