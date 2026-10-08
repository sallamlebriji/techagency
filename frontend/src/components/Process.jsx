import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import CinematicMedia from './CinematicMedia.jsx';
const steps=[
 {title:'Analyse du besoin',text:'Audit, objectifs, utilisateurs, contraintes et priorités métier. Nous définissons le périmètre fonctionnel ensemble.'},
 {title:'Conception UI/UX',text:'Parcours, maquettes et structure des écrans. Le concept est validé avant le développement.'},
 {title:'Développement',text:'Architecture, frontend, backend, intégrations et gestion des données. La vision devient un produit.'},
 {title:'Test et validation',text:'Tests fonctionnels, sécurité, performance, correction des anomalies et recette client.'},
 {title:'Déploiement',text:'Mise en production, configuration cloud, sauvegardes et monitoring.'},
 {title:'Amélioration continue',text:'Maintenance, support et nouvelles fonctionnalités selon les retours du terrain.'},
];
export default function Process({settings={}}) {
 const configuredSteps = settings.processItems?.split('\n').filter(Boolean).map(line => {const [title,...text]=line.split('|');return {title,text:text.join(' | ')};});
 const displayedSteps = configuredSteps?.length ? configuredSteps : steps;
 const section=useRef(null);const reduced=useReducedMotion();
 useEffect(()=>{let cancelled=false;let context;if(!reduced) Promise.all([import('gsap'),import('gsap/ScrollTrigger')]).then(([{gsap},{ScrollTrigger}])=>{if(cancelled)return;gsap.registerPlugin(ScrollTrigger);context=gsap.context(()=>{gsap.from('.assembly-piece',{y:index=>index<2?-35:35,opacity:.15,stagger:.12,ease:'none',scrollTrigger:{trigger:section.current,start:'top 80%',end:'bottom 70%',scrub:.6}});},section);});return()=>{cancelled=true;context?.revert();};},[reduced]);
 return <section ref={section} id="processus" className="studio-process section-padding scroll-mt-20"><div className="container-shell">
 <div className="studio-section-heading"><span className="studio-kicker">03 / La méthode</span><h2>{settings.processTitle || <>De l’intuition<br/><em>à la réalisation.</em></>}</h2><p>{settings.processDescription || 'Un parcours lisible, des échanges réguliers et des décisions partagées. Chaque étape construit la suivante.'}</p></div>
 <div className="method-layout"><div className="method-assembly" aria-hidden="true"><svg viewBox="0 0 300 360"><defs><linearGradient id="assembly-metal" x2="1" y2="1"><stop stopColor="#e8e3da"/><stop offset=".5" stopColor="#8c8c88"/><stop offset="1" stopColor="#c3c0b8"/></linearGradient></defs><rect className="assembly-piece" x="58" y="40" width="90" height="35" rx="4" fill="url(#assembly-metal)"/><rect className="assembly-piece" x="152" y="40" width="90" height="35" rx="4" fill="url(#assembly-metal)"/><rect className="assembly-piece" x="133" y="79" width="34" height="202" rx="4" fill="#c4a16a"/><rect className="assembly-piece" x="58" y="285" width="90" height="35" rx="4" fill="url(#assembly-metal)"/><rect className="assembly-piece" x="152" y="285" width="90" height="35" rx="4" fill="url(#assembly-metal)"/></svg><span>L’IDÉE DEVIENT UN ENSEMBLE.</span></div><ol className="method-steps">{displayedSteps.map((step,index)=><li key={step.title}><span>{String(index+1).padStart(2,'0')}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></div>
 <div className="method-next"><p>Un périmètre clair. Une réalisation accompagnée.</p><a className="studio-text-link" href="#offres">Trouver l’offre adaptée ↗</a></div>
 <CinematicMedia name="materials"/></div></section>;
}
