'use client';
import {createContext,useContext,useEffect,useState} from 'react';
import {api} from '@/lib/api';
const AuthContext=createContext(null);
export function AuthProvider({children}) {
  const [user,setUser]=useState(null);const [loading,setLoading]=useState(true);const [error,setError]=useState('');
  useEffect(()=>{let active=true;api('/me').then(data=>{if(active)setUser(data);}).catch(e=>{if(active && e.status!==401)setError(e.message);}).finally(()=>{if(active)setLoading(false);});return()=>{active=false;};},[]);
  async function login(data,register=false){const result=await api(register?'/auth/register':'/auth/login',{method:'POST',body:JSON.stringify(data)});setUser(result);setError('');return result;}
  async function logout(){await api('/auth/logout',{method:'POST'});setUser(null);}
  return <AuthContext.Provider value={{user,loading,error,login,logout,setUser}}>{children}</AuthContext.Provider>;
}
export const useAuth=()=>useContext(AuthContext);
