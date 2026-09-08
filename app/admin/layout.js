import AdminShell from '@/components/admin/shell';
export const metadata={title:'Store administration',robots:{index:false,follow:false}};
export default function Layout({children}){return <AdminShell>{children}</AdminShell>;}
