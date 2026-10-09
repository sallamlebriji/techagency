import {ArrowUpRight,ArrowRight,ChevronRight,Check,Globe,Layers} from 'lucide-react';
import {hrefFor} from '../../../shared/content.js';
import LivePreview from './LivePreview.jsx';
import './project-detail.css';

export default function ProjectDetail({entry,content,children}){
 const url=entry.url||entry.demoUrl,related=content.projects.filter(p=>p.id!==entry.id).slice(0,2);
 const sections=[['01','Le contexte',entry.context],['02','Le besoin',entry.need],['03','La solution',entry.body]].filter(([, ,text])=>text);
 return <div className="wrap project-case">
  <nav className="case-breadcrumb" aria-label="Fil d’Ariane"><a href="/">Accueil</a><ChevronRight size={12}/><a href="/realisations">Réalisations</a><ChevronRight size={12}/><span>{entry.title}</span></nav>
  <header className="case-hero"><div><span className="case-label"><i/>{entry.example?'Concept de démonstration':entry.category||'Réalisation digitale'}</span><h1>{entry.title}</h1><p>{entry.summary}</p><div className="case-actions">{url&&<a className="case-primary" href="#project-demo">Explorer le projet <ArrowRight size={17}/></a>}<a className="case-secondary" href="/contact">Un projet similaire ? <ArrowUpRight size={16}/></a></div></div><div className="case-symbol" aria-hidden="true"><div className="case-orbit"/><div className="case-orbit inner"/><div className="case-symbol-core"><Globe size={55} strokeWidth={.8}/></div><span className="case-symbol-dot"/><span className="case-symbol-note"><Layers size={15}/>De l’idée à l’expérience.</span></div><div className="case-hero-bottom"><span>INNOVIA / CRÉATION DIGITALE</span><span>Design · Développement · Expérience</span></div></header>
  {(url||entry.image)&&<section className="case-demo" id="project-demo" aria-label="Aperçu du projet"><div className="case-demo-heading"><div><span className="eyebrow">Explorez à votre rythme</span><h2>Le projet, en action.</h2></div>{url&&<a href={url} target="_blank" rel="noopener noreferrer">Ouvrir le site <ArrowUpRight size={16}/></a>}</div><div className="case-preview-frame">{url?<LivePreview url={url} title={entry.title} image={entry.image}/>:<img src={entry.image} alt={entry.imageAlt||entry.title}/>}</div></section>}
  <div className="case-story">{sections.map(([number,title,text])=><article key={number}><span>{number} /</span><h2>{title}</h2><p className="preserve-lines">{text}</p></article>)}</div>
  {(entry.features?.length>0||entry.technologies?.length>0)&&<section className="case-deliverables"><div><span className="eyebrow">Dans les détails</span><h2>Une solution.<br/><em>Chaque détail compte.</em></h2></div><div>{entry.features?.length>0&&<ul>{entry.features.map((f,i)=><li key={i}><Check size={15}/>{f}</li>)}</ul>}{entry.technologies?.length>0&&<div className="case-technologies">{entry.technologies.map((tech,i)=><span key={i}>{tech}</span>)}</div>}</div></section>}
  {children}
  <section className="case-contact"><div><span className="eyebrow">Et votre projet ?</span><h2>Créons la suite.<br/><em>Ensemble.</em></h2></div><a href="/contact">Parlons de votre idée <ArrowUpRight size={25}/></a></section>
  {related.length>0&&<nav className="case-related" aria-label="Autres réalisations"><span>Continuer l’exploration</span>{related.map(p=><a href={hrefFor('projects',p)} key={p.id}>{p.title}<ArrowUpRight size={17}/></a>)}</nav>}
 </div>;
}
