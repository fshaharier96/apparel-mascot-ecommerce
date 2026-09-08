import Catalog from '@/components/catalog';
export const metadata={title:'Search'};
export default async function Page({searchParams}){const {q=''}=await searchParams;return <div className="page-wrap"><p className="eyebrow">FIND SOMETHING YOU LOVE</p><h1>A good place to look.</h1><Catalog initialQuery={typeof q==='string'?q:''}/></div>;}
