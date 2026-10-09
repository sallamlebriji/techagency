import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

export default function SculptureView({ mode = 'hero', active = -1, light = false }) {
  const host = useRef(null);
  const wrapper = useRef(null);
  const engine = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [finish, setFinish] = useState('signature');
  const finishRef = useRef(finish);
  const drag = useRef(null);
  const reduced = useReducedMotion();
  const pausedRef = useRef(paused);
  const visibleRef = useRef(false);
  const staticMode = new URLSearchParams(window.location.search).get('render') === 'static';

  useEffect(() => {
    if (staticMode) return;
    let cancelled = false;
    let loading = false;
    let visible = false;
    let scrollContext;
    const node = host.current;
    function sync() { engine.current?.setRunning(visible && !document.hidden); }
    async function load() {
      if (loading || engine.current) return;
      loading = true;
      try {
        const { createSculpture } = await import('../lib/sculpture.js');
        if (cancelled) return;
        engine.current = createSculpture(node, { light, reduced, onFailure: () => setFailed(true) });
        engine.current.state.paused = pausedRef.current || reduced;
        engine.current.setFinish(finishRef.current);
        setReady(true);
        sync();
        if (!reduced) {
          const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
          if (cancelled) return;
          gsap.registerPlugin(ScrollTrigger);
          const section = wrapper.current.closest('section');
          scrollContext = gsap.context(() => {
            const state = engine.current.state;
            if (mode === 'services') {
              gsap.to(state, { explode: 1, ease: 'none', scrollTrigger: { trigger: section, start: 'top 75%', end: 'bottom 55%', scrub: .7 }, onUpdate: () => engine.current?.refresh() });
            } else if (mode === 'contact') {
              state.explode = .85;
              gsap.to(state, { explode: 0, ease: 'none', scrollTrigger: { trigger: section, start: 'top 95%', end: 'top 25%', scrub: .6 }, onUpdate: () => engine.current?.refresh() });
            } else {
              gsap.to(state, { approach: 1, explode: .22, ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: .6 }, onUpdate: () => engine.current?.refresh() });
            }
          }, wrapper);
        }
      } catch (error) {
        if (!cancelled) { console.warn('Sculpture: affichage de remplacement.', error.message); setFailed(true); }
      }
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; visibleRef.current = visible; if (visible) load(); sync(); }, { threshold: .02 });
    observer.observe(node);
    document.addEventListener('visibilitychange', sync);
    return () => {
      cancelled = true;
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      scrollContext?.revert();
      engine.current?.dispose();
      engine.current = null;
    };
  }, [mode, light, reduced, staticMode]);

  useEffect(() => { if (engine.current) { engine.current.state.active = active; engine.current.refresh(); } }, [active, ready]);
  useEffect(() => {finishRef.current=finish;engine.current?.setFinish(finish);},[finish,ready]);
  useEffect(() => {
    pausedRef.current = paused;
    if (engine.current) { engine.current.state.paused = paused || reduced; engine.current.setRunning(visibleRef.current && !document.hidden); }
  }, [paused, reduced]);

  function pointer(event) {
    if (mode==='hero' && drag.current) {
      const movement=event.clientX-drag.current.x;
      const vertical=event.clientY-drag.current.y;
      if(event.pointerType==='touch' && (Math.abs(movement)<8 || Math.abs(movement)<Math.abs(vertical)))return;
      engine.current?.rotateBy((event.clientX-drag.current.lastX)*.008);
      drag.current.lastX=event.clientX;
      return;
    }
    if (event.pointerType === 'touch' || paused || reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    engine.current?.setPointer((event.clientX - rect.left) / rect.width - .5, (event.clientY - rect.top) / rect.height - .5);
  }
  function startDrag(event) {
    if(mode!=='hero'||!ready||failed||event.button!==0||event.target.closest('button'))return;
    drag.current={x:event.clientX,y:event.clientY,lastX:event.clientX};
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function stopDrag(event) {drag.current=null;if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);}
  return (
    <><div ref={wrapper} className={`sculpture-view ${light ? 'sculpture-light' : ''} ${mode==='hero'&&ready&&!failed?'sculpture-explorable':''}`} onPointerDown={startDrag} onPointerUp={stopDrag} onPointerCancel={stopDrag} onPointerMove={pointer} onPointerLeave={() => engine.current?.setPointer(0, 0)}>
      <div className="sculpture-shadow" aria-hidden="true" />
      <img className={`sculpture-fallback ${ready && !failed ? 'is-hidden' : ''}`} src="/innovia-sculpture.svg" alt="Sculpture architecturale INNOVIA, cinq éléments de métal et de verre assemblés en N" />
      <div className={`sculpture-canvas ${failed ? 'is-hidden' : ''}`} ref={host} aria-hidden="true" data-mode={mode} />
      <div className="sculpture-note"><span>MONOGRAMME INNOVIA — N / 01</span><span>{mode === 'services' ? 'Une pièce. Une expertise.' : mode === 'contact' ? 'De l’idée à l’ensemble.' : 'Design × Technologie'}</span></div>
      {ready && !failed && !reduced && <button type="button" className="sculpture-pause" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Reprendre la sculpture 3D' : 'Mettre la sculpture 3D en pause'} aria-pressed={paused}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>}
    </div>{mode==='hero'&&ready&&!failed&&<div className="sculpture-tools"><p>Glissez pour explorer</p><div role="group" aria-label="Matière de la sculpture">{[['signature','Signature'],['chrome','Chrome'],['glass','Verre']].map(([value,label])=><button type="button" key={value} aria-pressed={finish===value} onClick={()=>{setFinish(value);engine.current?.setFinish(value);}}>{label}</button>)}</div><div className="sculpture-direction"><button type="button" aria-label="Tourner la sculpture à gauche" onClick={()=>engine.current?.rotateBy(-.35)}>←</button><button type="button" aria-label="Tourner la sculpture à droite" onClick={()=>engine.current?.rotateBy(.35)}>→</button><button type="button" onClick={()=>engine.current?.resetOrientation()}>Recentrer</button></div></div>}</>
  );
}
