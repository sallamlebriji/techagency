import {useState} from 'react';
import {ArrowUpRight,ArrowRight,Monitor,Smartphone,Check,Layers,MousePointer2,Route,Braces,ShieldCheck,Sparkles,Plus,LayoutGrid,CalendarDays,Folder,ChevronRight} from 'lucide-react';
import {hrefFor} from '../../../shared/content.js';

const directions={apps:['Votre idée.','Une expérience vivante.'],web:['Votre présence.','Une nouvelle dimension.'],saas:['Vos équipes.','Un espace commun.'],ai:['Vos données.','De nouvelles possibilités.'],automation:['Vos outils.','Enfin connectés.'],support:['Votre projet.','Toujours en mouvement.']};
const featureIcons=[Route,Layers,Braces,ShieldCheck];

function InterfaceScene({name}){
 const[device,setDevice]=useState('desktop');
 return <div className="sd-scene">
  <div className="sd-scene-orbit" aria-hidden="true"/>
  <div className="sd-device-switch" role="group" aria-label="Format de l’aperçu">
   <button aria-pressed={device==='desktop'} onClick={()=>setDevice('desktop')}><Monitor size={14}/>Ordinateur</button>
   <button aria-pressed={device==='mobile'} onClick={()=>setDevice('mobile')}><Smartphone size={14}/>Mobile</button>
  </div>
  <div className={'sd-device '+(device==='mobile'?'is-mobile':'')}>
   <div className="sd-device-bar"><span><i/><i/><i/></span><small>votre-espace.app</small><ShieldCheck size={12}/></div>
   <div className="sd-interface">
    <aside aria-hidden="true"><span className="sd-app-logo">✳</span><LayoutGrid/><Folder/><CalendarDays/><span className="sd-avatar">V</span></aside>
    <div className="sd-interface-main">
     <div className="sd-app-top"><span>Votre espace</span><span className="sd-app-plus"><Plus size={15}/></span></div>
     <strong className="sd-app-greeting">Bonjour, vous.</strong>
     <div className="sd-app-banner"><small>PLACE À VOS IDÉES</small><strong>Tout commence<br/>par un projet.</strong><span aria-hidden="true">✳</span></div>
     <div className="sd-app-section"><span>Votre parcours</span><small>Vue d’ensemble</small></div>
     <div className="sd-app-tasks">{['Imaginer','Créer','Lancer'].map((label,i)=><div key={label}><span className={'sd-task-icon task-'+i}>{i===0?<Sparkles size={17}/>:i===1?<Layers size={17}/>:<ArrowUpRight size={17}/>}</span><strong>{label}</strong><span className="sd-task-line"/><span className="sd-task-line short"/><small>0{i+1}<Check size={11}/></small></div>)}</div>
    </div>
   </div>
  </div>
  <div className="sd-floating-note" aria-hidden="true"><span><Check size={16}/></span><div>Une idée prend forme.<small>Du premier écran au dernier détail.</small></div></div>
  <div className="sd-cursor" aria-hidden="true"><MousePointer2 size={21} fill="currentColor"/><span>Votre prochaine idée</span></div>
  <div className="sd-scene-caption"><span>ÉTUDE D’INTERFACE</span><span>{name}</span></div>
 </div>;
}

function FeatureArt({index}){
 return <div className={'sd-feature-art art-'+index%4} aria-hidden="true">{index%4===0?<><i/><i/><i/><span className="sd-art-trail"/></>:index%4===1?<><span/><span/><span/></>:index%4===2?<><span>{'{'}<Braces size={25}/>{'}'}</span><i/><i/></>:<><span><ShieldCheck size={36} strokeWidth={1.2}/></span><i/><i/></>}</div>;
}

export default function ServiceDetail({entry,content,children}){
 const line=directions[entry.id]||['Votre ambition.','Notre savoir-faire.'];
 const related=content.services.filter(x=>x.id!==entry.id).slice(0,3);
 return <div className="sd-page wrap">
  <nav className="sd-breadcrumb" aria-label="Fil d’Ariane"><a href="/">Accueil</a><ChevronRight size={12}/><a href="/services">Services</a><ChevronRight size={12}/><span>{entry.title}</span></nav>
  <section className="sd-hero">
   <div className="sd-hero-grid" aria-hidden="true"/>
   <header className="sd-hero-copy"><span className="sd-kicker"><i/>DESIGN · DÉVELOPPEMENT · EXPÉRIENCE</span><h1>{entry.title}</h1><p>{entry.summary}</p><a className="sd-primary" href="/contact">Donnons vie à votre projet <ArrowUpRight size={18}/></a><div className="sd-hero-foot"><span>CONÇU AUTOUR DE VOUS</span><span aria-hidden="true">↘</span></div></header>
   {entry.image?<figure className="sd-custom-image"><img src={entry.image} alt={entry.imageAlt||entry.title}/></figure>:<InterfaceScene name={content.identity.name}/>}
  </section>
  <section className="sd-capabilities">
   <div className="sd-section-title"><span className="eyebrow">Du concept au concret</span><h2>{line[0]}<br/><em>{line[1]}</em></h2><span className="sd-section-symbol" aria-hidden="true">✳</span></div>
   <div className="sd-feature-grid">{(entry.features||[]).map((feature,i)=>{const Icon=featureIcons[i%featureIcons.length];return <article className="sd-feature-card" key={i}><div className="sd-feature-index"><Icon size={18}/><span>{String(i+1).padStart(2,'0')}</span></div><FeatureArt index={i}/><h3>{feature}</h3></article>;})}</div>
   {entry.body&&entry.body.trim()!==entry.summary?.trim()&&<p className="sd-extra-copy preserve-lines">{entry.body}</p>}
   {entry.context&&<p className="sd-extra-copy">{entry.context}</p>}{entry.need&&<p className="sd-extra-copy">{entry.need}</p>}
   {children}
  </section>
  <section className="sd-invitation"><div className="sd-invitation-art" aria-hidden="true"><span/><span/><ArrowUpRight size={65} strokeWidth={1}/></div><div><span className="eyebrow">À vous de jouer</span><h2>Et si on le<br/><em>créait ensemble ?</em></h2></div><a className="sd-round-link" href="/contact" aria-label="Discuter de votre projet"><ArrowUpRight size={30}/></a></section>
  {related.length>0&&<nav className="sd-related" aria-label="Autres expertises"><span>Explorer aussi</span>{related.map(service=><a key={service.id} href={hrefFor('services',service)}>{service.title}<ArrowRight size={16}/></a>)}</nav>}
 </div>;
}
