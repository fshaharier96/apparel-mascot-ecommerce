import Image from 'next/image';

function unsplashLoader({src,width,quality}) {
  const url = new URL(src);
  url.searchParams.set('w',String(width));
  url.searchParams.set('q',String(quality || 80));
  url.searchParams.set('auto','format');
  return url.toString();
}

export default function StoreImage({src,alt,sizes='(max-width: 700px) 50vw, 33vw',...props}) {
  const unsplash=src?.startsWith('https://images.unsplash.com/');
  return <Image loader={unsplash?unsplashLoader:undefined} unoptimized={!unsplash} src={src} alt={alt} width={1000} height={1250} sizes={sizes} {...props}/>;
}
