'use client';
import Link from 'next/link';
import {usePathname,useRouter} from 'next/navigation';
import {useEffect,useState} from 'react';
import {useAuth} from './auth-provider';
import {Button,Notice} from './admin/ui';
export default function AccountShell({children}) {
  const {user,loading,logout}=useAuth();const path=usePathname();const router=useRouter();const [error,setError]=useState('');const guestWishlist=path==='/account/wishlist';
  useEffect(()=>{if(!loading&&!user&&!guestWishlist)router.replace('/login');},[loading,user,guestWishlist,router]);
  if(guestWishlist&&!user)return children;
  if(loading||!user)return <div className="p-20 text-center text-base text-stone-500">Loading your account…</div>;
  return <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8"><div className="mb-8 flex flex-wrap items-center justify-between gap-4"><div><p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-800">Your everyday, together</p><h1 className="m-0 text-3xl font-semibold tracking-tight">Hello, {user.name.split(' ')[0]}.</h1></div><Button variant="secondary" onClick={async()=>{try{await logout();router.replace('/');}catch(e){setError(e.message);}}}>Sign out</Button></div><Notice error>{error}</Notice><div className="grid gap-7 md:grid-cols-[210px_1fr]"><nav aria-label="Account navigation" className="flex flex-wrap gap-2 self-start rounded-xl border border-stone-200 bg-white p-3 md:flex-col">{[['Overview','/account'],['My orders','/account/orders'],['Saved addresses','/account/addresses'],['Wishlist','/account/wishlist'],['Profile & security','/account/profile'],...(user.role==='admin'?[['Store administration','/admin']]:[])].map(([label,url])=><Link key={url} href={url} className={`rounded-lg px-4 py-3 text-sm font-medium ${path===url?'bg-emerald-50 text-emerald-900':'text-stone-600 hover:bg-stone-50'}`}>{label}</Link>)}</nav><div className="min-w-0">{children}</div></div></div>;
}
