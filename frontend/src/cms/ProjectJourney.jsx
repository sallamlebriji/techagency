import {useExperience} from './ExperienceContext.jsx';
import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight,ChevronLeft,ChevronRight,Pause,Play} from 'lucide-react';
import './journey.css';

function JourneyIllustration({stage}) {
  return <div className={'journey-illustration art-stage-'+stage} aria-hidden="true">
    <div className="journey-art-grid"/>
    <svg viewBox="0 0 300 240" fill="none">
      {stage===0?<>
        <circle className="art-ring outer" cx="150" cy="120" r="88"/>
        <circle className="art-ring inner" cx="150" cy="120" r="59"/>
        <path className="art-cross" d="M150 17v24M150 199v24M47 120h24M229 120h24"/>
        <g className="art-orbit"><circle className="art-dot" cx="150" cy="32" r="6"/></g>
        <circle className="art-core" cx="150" cy="120" r="24"/>
        <path className="art-check" d="m139 120 7 7 16-16"/>
      </>:stage===1?<>
        <g className="art-sheet rear"><rect x="58" y="29" width="180" height="160" rx="12"/></g>
        <g className="art-sheet front"><rect x="42" y="48" width="180" height="160" rx="12"/><path d="M42 82h180"/><circle cx="57" cy="65" r="3"/><circle cx="70" cy="65" r="3"/><rect x="60" y="99" width="65" height="89" rx="5"/><path d="M140 104h61M140 119h45M140 146h61M140 161h52M140 176h34"/></g>
        <g className="art-pen"><path d="m183 174 53-53 13 13-53 53-21 8 8-21Z"/><path d="m228 129 13 13"/></g>
      </>:stage===2?<>
        <rect className="art-editor" x="36" y="37" width="228" height="166" rx="13"/>
        <path className="art-cross" d="M36 69h228"/>
        <circle className="art-dot" cx="52" cy="53" r="3"/><circle className="art-dot" cx="65" cy="53" r="3"/>
        <path className="art-code left" d="m112 97-30 33 30 33"/><path className="art-code right" d="m188 97 30 33-30 33"/>
        <path className="art-slash" d="m164 93-28 75"/>
        <path className="art-scan" d="M53 188h194"/>
      </>:<>
        <path className="art-trail" d="M48 194c45 0 40-49 82-49s33-55 101-55"/>
        <g className="art-launch"><path d="M133 130c0-44 28-70 72-76 1 45-21 76-62 86l-10-10Z"/><path d="m139 100-29 3-12 25 35 2M164 136l-2 28-25 15 6-39"/><circle cx="179" cy="83" r="10"/><path className="art-flame" d="m125 142-19 25 29-17"/></g>
        <circle className="art-star one" cx="76" cy="65" r="4"/><circle className="art-star two" cx="239" cy="153" r="5"/>
      </>}
    </svg>
    <span className="journey-art-caption">{['De l’écoute à la vision','De la vision à l’expérience','De l’expérience à la solution','De la solution au quotidien'][stage]}</span>
  </div>;
}

export default function ProjectJourney({steps=[]}) {
  const experience=useExperience();
  const [index,setIndex]=useState(0);
  const [paused,setPaused]=useState(false);
  const journeyRef=useRef(null);
  useEffect(()=>{
    if(paused||!experience.journeyAuto||steps.length<2)return;
    const timer=window.setInterval(()=>{
      const journey=journeyRef.current;
      if(!journey||document.hidden||window.matchMedia('(prefers-reduced-motion: reduce)').matches||journey.closest('.no-motion'))return;
      const bounds=journey.getBoundingClientRect();
      if(bounds.bottom<=0||bounds.top>=window.innerHeight)return;
      setIndex(current=>(current+1)%steps.length);
    },experience.journeySeconds*1000);
    return()=>window.clearInterval(timer);
  },[paused,index,steps.length,experience.journeyAuto,experience.journeySeconds]);
  if(!steps.length)return null;
  const n=Math.min(index,steps.length-1),step=steps[n];
  return <div ref={journeyRef} className="project-journey creative-journey" data-paused={paused}>
    <div className="journey-track" role="group" aria-label="Étapes du projet">
      {steps.map((s,i)=><button key={i} onClick={()=>setIndex(i)} aria-pressed={i===n} aria-controls="journey-panel" className={i<n?'completed':''}><span>{String(i+1).padStart(2,'0')}</span><strong>{s.title}</strong><i/></button>)}
    </div>
    <div className="journey-detail" id="journey-panel" key={n}>
      <div className="journey-copy" aria-live="polite" aria-atomic="true"><span className="eyebrow">Étape {String(n+1).padStart(2,'0')} / {String(steps.length).padStart(2,'0')}</span><h3>{step.title}</h3><p>{step.body}</p><span className="journey-copy-mark" aria-hidden="true"><ArrowUpRight size={20}/> Chaque étape fait avancer votre idée.</span></div>
      <JourneyIllustration stage={n%4}/>
    </div>
    <div className="journey-controls"><span>{experience.journeyFooter}</span><button className="journey-pause" aria-label={paused?'Reprendre l’animation':'Mettre en pause l’animation'} aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?<Play size={16}/>:<Pause size={16}/>}</button><button aria-label="Étape précédente" disabled={n===0} onClick={()=>setIndex(n-1)}><ChevronLeft size={18}/></button><button aria-label="Étape suivante" disabled={n===steps.length-1} onClick={()=>setIndex(n+1)}><ChevronRight size={18}/></button></div>
  </div>;
}
