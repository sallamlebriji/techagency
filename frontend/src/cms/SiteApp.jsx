import {useEffect,useState,lazy,Suspense} from 'react';
import PublicSite from './PublicSite.jsx';
import {apiUrl} from '../lib/api.js';
const Admin=lazy(()=>import('./Admin.jsx'));
export default function SiteApp(){
 const isAdmin=window.location.pathname==='/admin';const preview=new URLSearchParams(window.location.search).has('preview');
 const[content,setContent]=useState(window.__INNOVIA_CONTENT__||null);const[error,setError]=useState('');
 useEffect(()=>{if(window.location.pathname.replace(/\/$/,'')==='/agence')window.location.replace('/');},[]);
 useEffect(()=>{if(isAdmin)return;let stopped=false;const controller=new AbortController();async function load(){if(document.hidden)return;try{const res=await fetch(apiUrl(preview?'/api/admin/preview':'/api/public-content'),{credentials:'include',signal:controller.signal});const data=await res.json();if(!res.ok)throw Error(data.message);if(!stopped){setContent(data);setError('');}}catch(e){if(!stopped&&e.name!=='AbortError')setError(e.message||'Le contenu est indisponible.');}}load();const interval=setInterval(load,20000);document.addEventListener('visibilitychange',load);return()=>{stopped=true;controller.abort();clearInterval(interval);document.removeEventListener('visibilitychange',load);};},[isAdmin,preview]);
 if(isAdmin)return <Suspense fallback={<div className="cms-loading">Chargement de votre espace…</div>}><Admin/></Suspense>;
 if(!content)return <div className="cms-loading">{error?<><p role="alert">{error}</p><button onClick={()=>window.location.reload()}>Réessayer</button></>:<div className="site-loading-indicator" role="status" aria-label="Chargement"><span/><span/><span/></div>}</div>;
 let pathname=window.location.pathname;try{pathname=decodeURI(pathname);}catch{pathname='/page-introuvable';}
 return <>{error&&<div className="preview-banner" role="status">La mise à jour du contenu est temporairement indisponible.</div>}<PublicSite content={content} path={pathname.replace(/\/$/,'')||'/'} preview={preview}/></>;
}
