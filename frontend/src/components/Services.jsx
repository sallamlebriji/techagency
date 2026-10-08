import CinematicMedia from './CinematicMedia.jsx';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SculptureView from './SculptureView.jsx';
import { services } from '../data/services.js';
const disciplines = [
 {title:'Sites web & e-commerce',description:'Une présence singulière, conçue pour faire découvrir votre marque et transformer l’intérêt en action.',tags:'Sites vitrines / E-commerce / Expériences web'},
 {title:'Applications web & mobiles',description:'Des interfaces fluides et des outils fiables, au plus près de vos utilisateurs et de leurs besoins.',tags:'Applications métier / Portails / Mobile'},
 {title:'SaaS & outils de gestion',description:'Des plateformes pensées autour de vos processus. Une architecture qui accompagne votre croissance.',tags:'SaaS / CRM & ERP / Tableaux de bord'},
 {title:'Intelligence artificielle',description:'Des assistants et des automatisations utiles, intégrés à vos données et à votre quotidien.',tags:'Assistants IA / Workflows / Analyse de données'},
 {title:'Identité visuelle & design',description:'Une direction claire, une identité cohérente et des expériences dont chaque détail porte votre marque.',tags:'Identité / UI & UX / Design systems'},
];
export default function Services({settings={}}) {
 const [active,setActive]=useState(0); const section=useRef(null); const reduced=useReducedMotion();
 useEffect(()=>{let cancelled=false;let context;if(!reduced) Promise.all([import('gsap'),import('gsap/ScrollTrigger')]).then(([{gsap},{ScrollTrigger}])=>{if(cancelled)return;gsap.registerPlugin(ScrollTrigger);context=gsap.context(()=>{section.current.querySelectorAll('.discipline').forEach((row,index)=>{ScrollTrigger.create({trigger:row,start:'top 55%',end:'bottom 55%',onEnter:()=>setActive(index),onEnterBack:()=>setActive(index)});});},section);});return()=>{cancelled=true;context?.revert();};},[reduced]);
 const technicalItems=settings.servicesItems?settings.servicesItems.split('\n').filter(Boolean).map(line=>{const [title,...description]=line.split('|');return {title,description:description.join(' ')};}):services;
 return <section ref={section} id="services" className="studio-services section-padding scroll-mt-20"><div className="container-shell">
 <div className="studio-section-heading"><span className="studio-kicker">01 / Nos expertises</span><h2>{settings.servicesTitle || <>Des compétences distinctes.<br/><em>Une vision commune.</em></>}</h2><p>{settings.servicesDescription || 'Chaque pièce a sa fonction. Ensemble, elles donnent forme à votre prochain projet digital.'}</p></div>
 <div className="services-story"><div className="services-art"><SculptureView mode="services" light active={active}/><div className="sculpture-selector" role="group" aria-label="Explorer les pièces de la sculpture">{disciplines.map((item,index)=><button type="button" key={item.title} aria-label={item.title} aria-pressed={active===index} onClick={()=>setActive(index)}>{String(index+1).padStart(2,'0')}</button>)}</div><p className="services-active-label"><span>{String(active+1).padStart(2,'0')}</span> {disciplines[active].title}</p></div><div className="services-disciplines">{disciplines.map((item,index)=><article className={`discipline ${active===index?'is-active':''}`} key={item.title} onMouseEnter={()=>setActive(index)} onFocus={()=>setActive(index)}><span className="discipline-number">0{index+1}</span><div><h3>{item.title}</h3><p>{item.description}</p><small>{item.tags}</small><a className="studio-text-link" href="#contact">Imaginer votre solution<ArrowUpRight size={15}/></a></div></article>)}</div></div>
 <details className="studio-details"><summary>Explorer notre expertise technique</summary><div className="technical-list">{technicalItems.map((item,index)=><div key={index}><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></details>
 <CinematicMedia name="sculpturePov"/></div></section>;
}
