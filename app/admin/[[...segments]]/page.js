import AdminApp from '@/components/admin/app';
export default async function Page({params}){const {segments=[]}=await params;return <AdminApp segments={segments}/>;}
