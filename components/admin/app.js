'use client';
import AuthForm from '@/components/auth-form';
import {resources} from './resources';
import {ResourceList,ResourceEditor} from './resource-manager';
import {Dashboard,Inventory,MediaLibrary,OrderDetail,Orders,Settings} from './operations';
import {Notice} from './ui';
export default function AdminApp({segments=[]}) {
  const [resource,id]=segments;
  if(resource==='login')return <AuthForm admin/>;
  if(!resource)return <Dashboard/>;
  if(resource==='reports')return <Dashboard reports/>;
  if(resource==='orders')return id?<OrderDetail id={id}/>:<Orders/>;
  if(resource==='payments')return <Orders payments/>;
  if(resource==='inventory')return <Inventory/>;
  if(resource==='media')return <MediaLibrary/>;
  if(resource==='settings')return <Settings/>;
  if(resources[resource])return id&&!resources[resource].readOnly?<ResourceEditor resource={resource} id={id}/>:<ResourceList resource={resource}/>;
  return <Notice error>This admin page does not exist.</Notice>;
}
