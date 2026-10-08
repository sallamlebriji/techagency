import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

export default function LivingScene() {
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const sceneRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 70, damping: 20 });
  const rotateY = useSpring(y, { stiffness: 70, damping: 20 });
  const resting = paused || reducedMotion || !visible;
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .1 });
    observer.observe(sceneRef.current);
    return () => observer.disconnect();
  }, []);
  function move(event) {
    if (resting || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(-((event.clientY - rect.top) / rect.height - .5) * 8);
    y.set(((event.clientX - rect.left) / rect.width - .5) * 10);
  }
  function reset() { x.set(0); y.set(0); }
  return (
    <div ref={sceneRef} className={`living-scene ${resting ? 'scene-resting' : ''}`} onPointerMove={move} onPointerLeave={reset}>
      <div className="scene-aura" aria-hidden="true" />
      <motion.div className="scene-perspective" style={{rotateX: resting ? 0 : rotateX, rotateY: resting ? 0 : rotateY}} aria-hidden="true">
        <div className="scene-orbit orbit-one"><span /></div>
        <div className="scene-orbit orbit-two"><span /></div>
        <div className="scene-orbit orbit-three"><span /></div>
        <div className="scene-sculpture">
          <div className="sculpture-sphere">
            <div className="sphere-highlight" />
            <svg className="sphere-monogram" viewBox="0 0 100 150" fill="none"><path d="M22 16V133M78 38V133M22 41L78 111" stroke="url(#monogram-gold)" strokeWidth="3"/><path d="M22 41L78 111V125L22 55Z" fill="url(#monogram-gold)"/><defs><linearGradient id="monogram-gold" x1="10" y1="0" x2="100" y2="140" gradientUnits="userSpaceOnUse"><stop stopColor="#f4dfb8"/><stop offset=".5" stopColor="#c4a16a"/><stop offset="1" stopColor="#8d6c3a"/></linearGradient></defs></svg>
            <span className="sphere-wordmark">INNOVIA</span>
          </div>
        </div>
        <div className="scene-floor" />
      </motion.div>
      <div className="scene-caption"><span className="scene-live-dot" /><span>L’innovation, avec distinction</span></div>
      <button type="button" className="scene-toggle" aria-label={paused ? 'Reprendre les animations 3D' : 'Mettre les animations 3D en pause'} aria-pressed={paused} onClick={() => { setPaused(value => !value); reset(); }}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>
    </div>
  );
}
