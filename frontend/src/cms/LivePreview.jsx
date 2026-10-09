import {useExperience} from './ExperienceContext.jsx';
import {useEffect,useRef,useState} from 'react';
import {Monitor,Smartphone,ArrowUpRight,RotateCw} from 'lucide-react';
import './live-preview.css';

export default function LivePreview({url,title,image}){
 const experience=useExperience();
 const ref=useRef(null),[width,setWidth]=useState(0),[device,setDevice]=useState(experience.previewDevice),[reload,setReload]=useState(0);
 useEffect(()=>{const observer=new ResizeObserver(([entry])=>setWidth(entry.contentRect.width));if(ref.current)observer.observe(ref.current);return()=>observer.disconnect();},[experience.livePreviews]);
 const mobile=device==='mobile',sourceWidth=mobile?390:1280,displayWidth=mobile?Math.min(width,280):width,scale=displayWidth/sourceWidth;
 const viewportHeight=mobile?420:Math.max(240,Math.min(experience.previewHeight,width*.625));
 if(!experience.livePreviews)return <a className="live-preview" href={url} target="_blank" rel="noopener noreferrer">{image?<img src={image} alt={title} loading="lazy" style={{width:'100%',display:'block'}}/>:<div className="live-preview-hint">{title} — Ouvrir le site <ArrowUpRight size={15}/></div>}</a>;
 return <div className="live-preview">
  <div className="live-preview-bar"><div role="group" aria-label="Format de la démonstration"><button aria-pressed={!mobile} onClick={()=>setDevice('desktop')} aria-label="Aperçu ordinateur"><Monitor size={13}/></button><button aria-pressed={mobile} onClick={()=>setDevice('mobile')} aria-label="Aperçu mobile"><Smartphone size={13}/></button></div><span>DÉMO INTERACTIVE</span><button onClick={()=>setReload(n=>n+1)} aria-label="Recharger la démonstration"><RotateCw size={12}/></button><a href={url} target="_blank" rel="noopener noreferrer" aria-label={'Ouvrir '+title+' dans un nouvel onglet'}><ArrowUpRight size={14}/></a></div>
  <div ref={ref} className={'live-preview-viewport'+(mobile?' live-mobile':'')} style={{height:viewportHeight}}>{width>0&&<iframe key={url+reload+device} title={'Démonstration interactive — '+title} src={url} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox" style={{width:sourceWidth,height:viewportHeight/scale,transform:`scale(${scale})`,left:mobile?(width-displayWidth)/2:0}}/>}</div>
  <div className="live-preview-hint">{experience.previewHint}<a href={url} target="_blank" rel="noopener noreferrer">Ouvrir le site <ArrowUpRight size={11}/></a></div>
 </div>;
}
