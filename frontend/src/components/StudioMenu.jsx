import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

export default function StudioMenu({ open, onClose, links, settings = {} }) {
  const dialog = useRef(null);
  const [selected, setSelected] = useState(0);
  const current = links[selected] || links[0];
  const projectPreview = current?.href?.endsWith('#portfolio');
  useEffect(() => {
    if (!open) { dialog.current?.close(); return; }
    const previousOverflow = document.body.style.overflow;
    dialog.current.showModal();
    dialog.current.querySelector('.menu-close')?.focus();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; dialog.current?.close(); };
  }, [open]);
  return <dialog ref={dialog} id="studio-full-menu" className="studio-full-menu" aria-label="Navigation du studio" onCancel={event => { event.preventDefault(); onClose(); }}>
    <div className="menu-top"><a href={links.some(link=>link.href.startsWith('/#'))?'/#accueil':'#accueil'} onClick={onClose} className="menu-brand">INNOVIA<span>STUDIO DIGITAL</span></a><button autoFocus className="menu-close" onClick={onClose} type="button" aria-label="Fermer le menu">Fermer <X size={20}/></button></div>
    <div className="menu-composition"><nav aria-label="Navigation complète"><p className="studio-kicker">Explorer le studio</p><ol>{links.map((link,index) => <li key={`${link.href}-${index}`}><a href={link.href} onClick={onClose} onMouseEnter={() => setSelected(index)} onFocus={() => setSelected(index)} className={selected===index?'is-selected':''}><small aria-hidden="true">{String(index+1).padStart(2,'0')}</small><span>{link.label}</span><ArrowUpRight size={24}/></a></li>)}</ol></nav>
      <aside className="menu-preview" aria-hidden="true"><div className={`menu-preview-image ${projectPreview?'menu-preview-project':''}`}><img key={projectPreview?'project':'material'} src={projectPreview?'/project-gym.jpg':'/innovia-material-study.jpg'} alt=""/><span>FORME / FONCTION</span></div><p>{projectPreview?'Gym Ten Chi — projet consultable':'L’idée devient une expérience.'}</p><strong>{current?.label || 'INNOVIA'}</strong></aside></div>
    <div className="menu-bottom"><a href={`mailto:${settings.email||'contact@techagency.ma'}`}>{settings.email||'contact@techagency.ma'}</a><span>STRATÉGIE · DESIGN · TECHNOLOGIE</span><a href={links.some(link=>link.href.startsWith('/#'))?'/#contact':'#contact'} onClick={onClose}>Parlons de votre projet <ArrowUpRight size={15}/></a></div>
  </dialog>;
}
