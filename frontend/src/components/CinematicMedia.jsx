import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { studioMedia } from '../data/studioMedia.js';

// A pre-rendered film supplements the interactive sculpture; it never replaces it.
export default function CinematicMedia({ name }) {
  const media = studioMedia[name];
  const reduced = useReducedMotion();
  const wrapper = useRef(null);
  const video = useRef(null);
  const visibleRef = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!media?.src || reduced) return;
    let visible = false;
    function sync() {
      if (!video.current) return;
      if (visible && !document.hidden) video.current.play().catch(() => {});
      else video.current.pause();
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visibleRef.current = visible;
      if (visible) setLoaded(true);
      sync();
    });
    observer.observe(wrapper.current);
    document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); video.current?.pause(); };
  }, [media?.src, reduced]);
  if (!media?.src) return null;
  return <figure className="cinematic-media" ref={wrapper}>
    {reduced || failed ? <img src={media.poster} alt={media.caption} style={{ aspectRatio: media.ratio }} /> : <video ref={video} src={loaded ? media.src : undefined} poster={media.poster} preload="none" muted playsInline loop controls onLoadedData={() => { if (visibleRef.current && !document.hidden) video.current?.play().catch(() => {}); }} onError={() => setFailed(true)} aria-label={media.caption} style={{ aspectRatio: media.ratio }} />}
    <figcaption>{media.caption}</figcaption>
  </figure>;
}
