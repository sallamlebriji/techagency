import { useEffect, useState } from 'react';
import { ArrowUpRight, LoaderCircle } from 'lucide-react';
import { apiUrl } from '../lib/api.js';
import SculptureView from './SculptureView.jsx';
import { CornerButton } from './ui/CornerButton.tsx';

export default function Contact({ settings = {} }) {
 const types=settings.projectTypes?.split('\n').filter(Boolean)||['Site web / e-commerce','Application web ou mobile','SaaS / outil de gestion','Intelligence artificielle','Identité visuelle / design'];
 const empty={name:'',email:'',phone:'',projectType:types[0],message:''};
 const [form,setForm]=useState(empty);const [status,setStatus]=useState(null);const [sending,setSending]=useState(false);
 const [context,setContext]=useState('');
 useEffect(()=>{const choose=event=>{const text=event.detail?.text;if(!text)return;setContext(text);setForm(current=>({...current,message:current.message?`${current.message}\n\n${text}`:text}));};window.addEventListener('innovia:project-request',choose);return()=>window.removeEventListener('innovia:project-request',choose);},[]);
 const email=settings.email||'contact@techagency.ma';
 const phone=settings.phone && !settings.phone.includes('00 00 00')?settings.phone:null;
 function field(name,event){setForm(current=>({...current,[name]:event.target.value}));}
 async function submit(event){event.preventDefault();if(sending)return;
  const payload={...form,name:form.name.trim(),email:form.email.trim(),phone:form.phone.trim(),message:form.message.trim()};
  if(payload.name.length<2||payload.message.length<10){setStatus({ok:false,text:'Indiquez votre nom et décrivez votre projet en au moins 10 caractères.'});event.currentTarget.elements.namedItem(payload.name.length<2?'name':'message')?.focus();return;}
  setSending(true);setStatus(null);
  try {const response=await fetch(apiUrl('/api/contact'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(15000)});const data=await response.json().catch(()=>({}));if(!response.ok||data.ok!==true)throw new Error(data.message||'La demande n’a pas pu être enregistrée. Vous pouvez nous contacter par email.');setStatus({ok:true,text:'Votre demande a été enregistrée. Merci, nous reviendrons vers vous.'});setForm(empty);setContext('');}
  catch(error){setStatus({ok:false,text:error.name==='TimeoutError'?'Le service met trop de temps à répondre. Réessayez ou contactez-nous par email.':error.message||'Le service est momentanément indisponible.'});}
  finally{setSending(false);}
 }
 return <section id="contact" className="studio-contact section-padding scroll-mt-20"><div className="container-shell">
  <div className="contact-intro"><span className="studio-kicker">04 / Commençons</span><h2>{settings.contactTitle || <>Votre prochaine étape<br/><em>commence ici.</em></>}</h2><p>{settings.contactDescription||'Une idée à préciser, un produit à construire ou une marque à faire évoluer ? Parlons de ce qui vient ensuite.'}</p></div>
  <div className="contact-layout"><div className="contact-art"><SculptureView mode="contact"/><div className="contact-coordinates"><a href={`mailto:${email}`}>{email}<ArrowUpRight size={19}/></a>{phone&&<a href={`tel:${phone.replace(/\s/g,'')}`}>{phone}</a>}{settings.address&&<p>{settings.address}</p>}</div></div>
  <form onSubmit={submit} className="studio-form" aria-busy={sending}>{context&&<div className="request-context" role="status"><span>Votre sélection</span><p>{context}</p></div>}<div className="form-grid">
   <label>Votre nom<input name="name" autoComplete="name" required minLength={2} maxLength={160} value={form.name} onChange={e=>field('name',e)} placeholder="Nom complet"/></label>
   <label>Votre email<input name="email" autoComplete="email" type="email" required maxLength={254} value={form.email} onChange={e=>field('email',e)} placeholder="vous@entreprise.com"/></label>
   <label>Téléphone <small>(facultatif)</small><input name="phone" autoComplete="tel" type="tel" value={form.phone} onChange={e=>field('phone',e)} placeholder="+212…"/></label>
   <label>Votre projet<select name="projectType" value={form.projectType} onChange={e=>field('projectType',e)}>{types.map(type=><option key={type}>{type}</option>)}</select></label>
  </div><label className="form-message">Quelques mots sur votre idée<textarea name="message" required minLength={10} rows={5} maxLength={10000} value={form.message} onChange={e=>field('message',e)} placeholder="Votre besoin, vos ambitions, vos échéances…"/></label>
  <p className="form-privacy">Ces informations servent à répondre à votre demande.</p><CornerButton type="submit" disabled={sending} accentColor="#c4a16a" wrapperClassName="studio-corner-wrapper" className="studio-corner-button" icon={sending?<LoaderCircle size={18} className="animate-spin"/>:<ArrowUpRight size={18}/>} >{sending?'Enregistrement…':'Envoyer la demande'}</CornerButton>
  <div role="status" aria-live="polite">{status&&<p className={`form-status ${status.ok?'is-success':'is-error'}`}>{status.text}</p>}</div>
  </form></div>
 </div></section>;
}
