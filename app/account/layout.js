import AccountShell from '@/components/account-shell';
export const metadata={title:'Your account',robots:{index:false,follow:false}};
export default function Layout({children}){return <AccountShell>{children}</AccountShell>;}
