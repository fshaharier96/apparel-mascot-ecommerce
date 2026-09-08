import AccountApp from '@/components/account-app';
export default async function Page({params}){const {segments=[]}=await params;return <AccountApp segments={segments}/>;}
