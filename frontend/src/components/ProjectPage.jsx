import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects as defaults } from '../data/projects.js';
import { externalProjectUrl, followProjectLink, projectPath, projectSlug, visibleProjects } from '../lib/projects.js';
import CinematicMedia from './CinematicMedia.jsx';

export default function ProjectPage({slug,loadedProjects}) {
  const projects = visibleProjects(Array.isArray(loadedProjects)?loadedProjects:defaults);
  const project = projects.find(project=>projectSlug(project)===slug || (!Array.isArray(loadedProjects)&&projectSlug(project)===slug.replace(/-\d+$/,'')));
  useEffect(()=>{window.scrollTo({top:0,behavior:'instant'});document.querySelector('.case-page h1')?.focus();},[slug]);
  useEffect(()=>{const previous=document.title;document.title=project?`${project.title} — INNOVIA`:'Projet indisponible — INNOVIA';return()=>{document.title=previous;};},[project?.title]);
  const next = project && projects[(projects.indexOf(project)+1)%projects.length];
  if(!project) return <main className="case-page" id="contenu"><div className="container-shell"><a href="/#portfolio" onClick={event=>followProjectLink(event,'/#portfolio')} className="studio-text-link"><ArrowLeft size={18}/>Retour aux projets</a><h1 tabIndex={-1}>Projet indisponible.</h1><p>Ce projet n’est pas publié ou son adresse a changé.</p></div></main>;
  const url=externalProjectUrl(project);
  const gym=url==='https://gym-ten-chi.vercel.app/';
  return <main className="case-page" id="contenu"><div className="container-shell"><div className="case-top"><a href="/#portfolio" onClick={event=>followProjectLink(event,'/#portfolio')} className="studio-text-link"><ArrowLeft size={18}/>Retour aux projets</a><span>INNOVIA / {url?'PROJET CONSULTABLE':'CONCEPT DE SOLUTION'}</span></div>
    <header className="case-header"><span className="studio-kicker">{project.category}</span><h1 tabIndex={-1}>{project.title}</h1><p>{project.description}</p></header>
    <figure className="case-visual"><div className="case-screen"><div className="mockup-bar"><span/><span/><span/><p>{url?new URL(url).hostname:'INNOVIA / CONCEPT'}</p></div><img style={{viewTransitionName:'project-visual'}} src={gym?'/project-gym.jpg':project.image||'/innovia-material-study.jpg'} alt={gym?'Capture du site Gym Ten Chi':`Illustration du concept ${project.title}`} fetchpriority="high"/></div><figcaption>{gym?'Capture du site consultable':'Visuel d’illustration — ce visuel ne constitue pas une capture du produit.'}</figcaption></figure>
    <div className="case-details"><div><span className="studio-kicker">Le projet</span><h2>{url?'Une expérience à découvrir.':'Une piste à explorer ensemble.'}</h2></div><div><p>{project.description}</p>{project.details&&<p>{project.details}</p>}<dl><div><dt>Domaine</dt><dd>{project.category}</dd></div><div><dt>Technologies</dt><dd>{project.technologies.join(' · ')||'À préciser'}</dd></div><div><dt>Statut</dt><dd>{url?'Lien public disponible':'Concept de solution'}</dd></div></dl>{url?<a className="studio-button" href={url} target="_blank" rel="noreferrer">Découvrir le site<ArrowUpRight size={18}/></a>:<a className="studio-button" href="/#contact" onClick={event=>followProjectLink(event,'/#contact')}>Discuter de ce concept<ArrowUpRight size={18}/></a>}</div></div>
    {gym&&<CinematicMedia name="gymCase"/>}
    {next&&next!==project&&<a className="case-next" href={projectPath(next)} onClick={event=>followProjectLink(event,projectPath(next))}><span className="studio-kicker">Projet suivant</span><strong>{next.title}</strong><ArrowUpRight size={35}/></a>}
  </div></main>;
}
