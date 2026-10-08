import {useState} from 'react';
import {Pause,Play} from 'lucide-react';

const expertises=['Sites web','Applications','Logiciels & SaaS','Intelligence artificielle','Automatisation'];
export default function ExpertiseMarquee(){
 const[paused,setPaused]=useState(false);
 return <section className="expertise-strip expertise-marquee" aria-label="Nos expertises" data-paused={paused}>
  <div className="expertise-marquee-mask"><div className="expertise-marquee-track">
   {[0,1].map(copy=><div className="expertise-marquee-group" key={copy} aria-hidden={copy===1?true:undefined}>
    {expertises.map(label=><span className="expertise-marquee-item" key={label}><span>{label}</span><b aria-hidden="true">✦</b></span>)}
   </div>)}
  </div></div>
  <button type="button" className="expertise-marquee-toggle" onClick={()=>setPaused(!paused)} aria-label={paused?'Reprendre le défilement des expertises':'Mettre en pause le défilement des expertises'} aria-pressed={paused}>{paused?<Play size={13}/>:<Pause size={13}/>}</button>
 </section>;
}
