import { Confirmation } from '@/components/cart-checkout';
export const metadata={title:'Order confirmation',robots:{index:false,follow:false}};
export default async function Page({params}){const {id}=await params;return <Confirmation reference={id}/>;}
