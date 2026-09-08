'use client';
export default function ErrorPage({reset}){return <div className="empty"><h1>A little pause.</h1><p>We couldn’t load this page. Please check that the store API is available and try again.</p><button className="button" onClick={reset}>Try again</button></div>;}
