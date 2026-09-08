'use client';
import {usePathname} from 'next/navigation';
import {Header,Footer} from './shell';
export default function AppChrome({children}) {
  const pathname=usePathname();
  if(pathname.startsWith('/admin'))return children;
  return <><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/></>;
}
