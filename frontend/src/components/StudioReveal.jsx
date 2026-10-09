import { useEffect } from 'react';

// CSS owns these reveals; existing Framer and GSAP targets are excluded.
export default function StudioReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    const observe = () => document.querySelectorAll('.studio-section-heading, .contact-intro, .method-steps li').forEach(node => {
      if (node.classList.contains('is-revealed')) return;
      node.dataset.reveal = 'true';
      observer.observe(node);
    });
    observe();
    const updates = new MutationObserver(observe);
    updates.observe(document.querySelector('main'), { childList: true, subtree: true });
    return () => {
      observer.disconnect(); updates.disconnect();
      document.querySelectorAll('[data-reveal]').forEach(node => { delete node.dataset.reveal; });
    };
  }, []);
  return null;
}
