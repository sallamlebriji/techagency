import {useExperience} from './ExperienceContext.jsx';
import {ArrowUpRight,Check,Plus} from 'lucide-react';
import './offers.css';

function OfferArt({index}){
 return <div className={'offer-sculpture sculpture-'+index%4} aria-hidden="true"><div className="offer-art-orbit"/>{index%4===0?<><span className="offer-art-disc"/><span className="offer-art-disc small"/></>:index%4===1?<><span className="offer-art-layer one"/><span className="offer-art-layer two"/><span className="offer-art-layer three"/></>:index%4===2?<><span className="offer-art-arch"/><span className="offer-art-arch inner"/><span className="offer-art-pearl"/></>:<><span className="offer-art-cube one"/><span className="offer-art-cube two"/><span className="offer-art-cube three"/></>}<span className="offer-art-star">✳</span></div>;
}

export default function OfferShowcase({content}){
 const experience=useExperience();
 return <div className="offer-showcase" style={{'--offer-columns':experience.offerColumns}}>{content.offers.map((entry,i)=>{
  const features=entry.features?.length?entry.features:(entry.featuresText||'').split(/\r?\n/).map(x=>x.replace(/^[^\p{L}\p{N}]+/u,'').trim()).filter(Boolean);
  const title=entry.name||entry.title,price=entry.price||'Sur devis',parts=price.match(/^(.*?)(\s*(?:DH|MAD)\s*\/\s*an)$/i);
  return <article className={'offer-plan offer-plan-'+i%4} key={entry.id}>
   <div className="offer-plan-meta"><span>{entry.title===title?'ACCOMPAGNEMENT':entry.title}</span><span>{String(i+1).padStart(2,'0')}</span></div>
   {experience.offerArt&&<OfferArt index={i}/>}
   <h2>{title}</h2><p className="offer-plan-summary">{entry.summary}</p>
   {content.options.showPrices&&<div className="offer-plan-price"><strong>{parts?parts[1]:price}</strong>{parts&&<span>{parts[2].trim()}</span>}</div>}
   <a className="offer-plan-cta" href={'/contact?offre='+encodeURIComponent(title)}>{experience.offerCta} <ArrowUpRight size={17}/></a>
   {features.length>0&&<div className="offer-plan-features"><span className="offer-features-label">CE QUE COMPREND L’OFFRE</span><ul>{features.slice(0,experience.offerFeatures).map((f,j)=><li key={j}><Check size={13}/><span>{f}</span></li>)}</ul>{features.length>experience.offerFeatures&&<details><summary>Voir les {features.length-experience.offerFeatures} autres fonctionnalités <Plus size={14}/></summary><ul>{features.slice(experience.offerFeatures).map((f,j)=><li key={j}><Check size={13}/><span>{f}</span></li>)}</ul></details>}</div>}
  </article>;
 })}</div>;
}
