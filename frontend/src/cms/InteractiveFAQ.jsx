import {useExperience} from './ExperienceContext.jsx';
import {useId,useState} from 'react';
import {ArrowUpRight,ArrowRight,MessageCircle,Sparkles,Pause,Play} from 'lucide-react';
import './interactive-faq.css';

export default function InteractiveFAQ({items=[]}){
 const experience=useExperience();
 const [selected,setSelected]=useState(null),[paused,setPaused]=useState(false),id=useId();
 if(!items.length)return null;
 const index=Math.max(0,items.findIndex(x=>x.id===selected)),item=items[index];
 return <div className="faq-studio" data-paused={paused}>
  <div className="faq-studio-questions"><div className="faq-studio-label"><MessageCircle size={15}/><span>{experience.faqIntro}</span></div>{items.map((question,i)=>{const current=i===index;return <div className={'faq-studio-item'+(current?' is-active':'')} key={question.id}><button id={id+'-question-'+i} aria-expanded={current} aria-controls={id+'-answer-'+i} onClick={()=>setSelected(question.id)}><span className="faq-question-number">{String(i+1).padStart(2,'0')}</span><strong>{question.title}</strong><span className="faq-question-arrow"><ArrowUpRight size={18}/></span></button><div className="faq-mobile-answer" id={id+'-answer-'+i} role="region" aria-labelledby={id+'-question-'+i} hidden={!current}><p>{question.summary||question.body}</p></div></div>;})}<a className="faq-another-question" href="/contact">{experience.faqContact} <ArrowUpRight size={15}/></a></div>
  <div className="faq-answer-card">
   <div className="faq-answer-top"><span><i/> UN PEU PLUS DE CLARTÉ</span><button aria-label={paused?'Reprendre l’animation':'Mettre en pause l’animation'} aria-pressed={paused} onClick={()=>setPaused(p=>!p)}>{paused?<Play size={13}/>:<Pause size={13}/>}</button></div>
   <div className={'faq-orbit faq-orbit-'+index%3} style={experience.faqAnimated?undefined:{display:'none'}} aria-hidden="true"><div className="faq-orbit-ring"/><div className="faq-orbit-ring inner"/><span className="faq-orbit-satellite one"/><span className="faq-orbit-satellite two"/><div className="faq-orbit-core"><MessageCircle size={35} strokeWidth={1.2}/><Sparkles size={16}/></div><span className="faq-orbit-bubble">{index%3===0?'De l’idée au projet':index%3===1?'À vous de créer':'Toujours à vos côtés'}</span></div>
   <div className="faq-answer-copy" key={item.id}><span className="faq-answer-count">RÉPONSE {String(index+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}</span><h3>{item.title}</h3><p>{item.summary||item.body}</p></div>
   <a className="faq-answer-contact" href="/contact">{experience.faqAnswerCta} <ArrowRight size={16}/></a>
  </div>
 </div>;
}
