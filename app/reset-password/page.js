import AuthForm from '@/components/auth-form';
export const metadata={title:'Reset password',robots:{index:false,follow:false}};
export default async function Page({searchParams}){const params=await searchParams;return <AuthForm mode="reset-password" token={params.token||''} email={params.email||''}/>;}
