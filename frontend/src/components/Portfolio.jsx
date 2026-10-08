import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import CinematicMedia from './CinematicMedia.jsx';
import { projects as defaults } from '../data/projects.js';
import { projectPath, followProjectLink, visibleProjects } from '../lib/projects.js';
function Mockup({project,large=false}){const gym=project.url==='https://gym-ten-chi.vercel.app/';const phone=project.category==='Mobile';return <div className={`project-mockup ${phone?'mockup-phone':''} ${large?'mockup-large':''}`}><div className="mockup-bar"><span/><span/><span/><p>{project.url?new URL(project.url).hostname:'INNOVIA / CONCEPT'}</p></div><img src={gym?'/project-gym.jpg':project.image||'/innovia-material-study.jpg'} alt={gym?'Capture du site Gym Ten Chi — IronEdge':`Visuel d’illustration : ${project.title}`} loading="lazy"/><span className="mockup-caption">{gym?'CAPTURE DU SITE':'VISUEL D’ILLUSTRATION'}</span></div>;}
export default function Portfolio({loadedProjects}){
 const [filter,setFilter]=useState('Tous');const [selected,setSelected]=useState(null);const dialog=useRef(null);const reduced=useReducedMotion();
 const source=(Array.isArray(loadedProjects)?loadedProjects:defaults).filter(project=>project.visible!==false);
 const projects=visibleProjects(source).sort((a,b)=>Number(Boolean(b.url))-Number(Boolean(a.url)));
 const categories=['Tous',...new Set(projects.map(p=>p.category))];const visible=projects.filter(p=>filter==='Tous'||filter===p.category);
 useEffect(()=>{if(selected)dialog.current?.showModal();},[selected]);
 function close(){dialog.current?.close();setSelected(null);}
 return <section id="portfolio" className="studio-portfolio section-padding scroll-mt-20"><div className="container-shell">
 <div className="studio-section-heading"><span className="studio-kicker">02 / Sélection de projets</span><h2>Des idées devenues<br/><em>des expériences.</em></h2><p>Un aperçu du travail du studio. Les concepts sont distingués des sites consultables.</p></div>
 <div className="project-filters" role="group" aria-label="Filtrer les projets">{categories.map(c=><button type="button" key={c} aria-pressed={filter===c} className={filter===c?'is-active':''} onClick={()=>setFilter(c)}>{c}</button>)}</div>
 <p className="sr-only" aria-live="polite">{visible.length} {visible.length===1?'projet affiché':'projets affichés'}</p><div className="editorial-projects">{visible.map((project,index)=><motion.article key={project.id||project.title} initial={reduced?false:{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.65,ease:[.22,1,.36,1]}} className={`editorial-project ${index===0?'project-featured':''}`}>
 <a className="project-preview" href={projectPath(project)} onClick={event=>{if(!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey&&event.button===0)event.currentTarget.querySelector('img')?.style.setProperty('view-transition-name','project-visual');followProjectLink(event,projectPath(project));}} aria-label={`Voir le projet : ${project.title}`}><Mockup project={project}/><span className="preview-arrow"><ArrowUpRight size={24}/></span></a>
 <div className="project-description"><div><small>{project.category} / {project.url?'Site consultable':'Concept de solution'}</small><h3>{project.title}</h3></div><p>{project.description}</p></div><div className="project-meta"><span>{project.technologies.join(' · ')}</span><button type="button" onClick={()=>setSelected(project)}>Aperçu rapide<ArrowUpRight size={15}/></button><a href={projectPath(project)} onClick={event=>followProjectLink(event,projectPath(project))}>Explorer le projet<ArrowUpRight size={15}/></a></div>
 </motion.article>)}</div>
 <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={()=>setSelected(null)} onClick={e=>{if(e.target===dialog.current)close();}}>{selected&&<div className="project-dialog-inner"><button autoFocus type="button" className="dialog-close" onClick={close} aria-label="Fermer le projet"><X size={22}/></button><small>{selected.url?'Site consultable':'Concept de solution — visuel d’illustration'}</small><h2 id="project-dialog-title">{selected.title}</h2><Mockup project={selected} large/>{selected.url==='https://gym-ten-chi.vercel.app/' && <CinematicMedia name="gymCase"/>}<p>{selected.description}</p><p className="dialog-tech">{selected.technologies.join(' · ')}</p>{selected.url?<a className="studio-button" href={selected.url} target="_blank" rel="noreferrer">Visiter le site<ArrowUpRight size={17}/></a>:<a className="studio-button" href="#contact" onClick={close}>Parlons d’une solution similaire<ArrowUpRight size={17}/></a>}</div>}</dialog>
 </div></section>;
}
