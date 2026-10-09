import { useEffect, useRef, useState } from 'react';

import { ArrowRight, Menu, X } from 'lucide-react';

import LogoMark from './LogoMark.jsx';
import StudioMenu from './StudioMenu.jsx';

const links = [

  { label: 'Accueil', href: '#accueil' },

  { label: 'Services', href: '#services' },

  { label: 'Solutions', href: '#solutions' },

  { label: 'Projets', href: '#portfolio' },

  { label: 'Modèles', href: '#modeles' },

  { label: 'Méthode', href: '#processus' },

  { label: 'Offres', href: '#offres' },

  { label: 'Pour qui ?', href: '#pour-qui' },
  { label: 'Le studio', href: '#apropos' },
  { label: 'Technologies', href: '#technologies' },

  { label: 'Contact', href: '#contact' },

];

function parseLinks(value, fallback) {

  const parsed = String(value || '')

    .split('\n')

    .map((line) => line.trim())

    .filter(Boolean)

    .map((line) => {

      const [label, href] = line.split('|').map((part) => part.trim());

      return { label, href: href || '#accueil' };

    });

  return parsed.length > 0 ? parsed : fallback;

}

function getSectionInfo(section) {

  const haystack = `${section?.title || ''} ${section?.type || ''}`.toLowerCase();

  if (haystack.includes('hero')) return { key: 'hero', href: '#accueil', label: 'Accueil' };

  if (haystack.includes('modele')) return { key: 'modeles', href: '#modeles', label: 'Modeles' };

  if (haystack.includes('portfolio') || haystack.includes('projet')) return { key: 'portfolio', href: '#portfolio', label: 'Portfolio' };

  if (haystack.includes('service')) return { key: 'services', href: '#services', label: 'Services' };

  if (haystack.includes('pour qui') || haystack.includes('audience')) return { key: 'audiences', href: '#pour-qui', label: 'Pour qui ?' };

  if (haystack.includes('solution')) return { key: 'solutions', href: '#solutions', label: 'Solutions' };

  if (haystack.includes('process')) return { key: 'process', href: '#processus', label: 'Processus' };

  if (haystack.includes('technologie')) return { key: 'technologies', href: '#technologies', label: 'Technologies' };

  if (haystack.includes('apropos') || haystack.includes('a propos')) return { key: 'about', href: '#apropos', label: 'A propos' };

  if (haystack.includes('temoignage')) return { key: 'testimonials', href: '#temoignages', label: 'Temoignages' };

  if (haystack.includes('offre')) return { key: 'pricing', href: '#offres', label: 'Offres' };

  if (haystack.includes('contact')) return { key: 'contact', href: '#contact', label: 'Contact' };

  return null;

}

function buildNavLinks(settings, sections) {

  const configuredLinks = parseLinks(settings?.navLinks || settings?.footerQuickLinks, links);

  const labelByHref = new Map(configuredLinks.map((link) => [link.href, link.label]));

  const visibleSections = Array.isArray(sections) ? sections.filter((section) => section.visible !== false) : [];

  if (!Array.isArray(sections) || sections.length === 0) return configuredLinks;

  const usedHrefs = new Set();

  return visibleSections

    .map(getSectionInfo)

    .filter(Boolean)

    .filter((link) => {

      if (usedHrefs.has(link.href)) return false;

      usedHrefs.add(link.href);

      return true;

    })

    .map((link) => ({ ...link, label: labelByHref.get(link.href) || link.label }));

}

function Navbar({ settings, sections, projectPage = false }) {

  const [scrolled, setScrolled] = useState(false);

  const [open, setOpen] = useState(false);



  const navLinks = buildNavLinks(settings, sections).map(link=>({...link,href:projectPage&&link.href.startsWith('#')?`/${link.href}`:link.href}));
  const primaryOrder = ['#services', '#portfolio', '#modeles', '#processus', '#offres'];
  const sectionHref = href=>href.replace(/^\/#/,'#');
  const desktopLinks = navLinks.filter(link => primaryOrder.includes(sectionHref(link.href))).sort((a,b) => primaryOrder.indexOf(sectionHref(a.href))-primaryOrder.indexOf(sectionHref(b.href))).map(link => ({...link,label:({'#portfolio':'Projets','#modeles':'Modèles','#processus':'Méthode'})[sectionHref(link.href)]||link.label}));
  const menuButton = useRef(null);
  useEffect(() => { if (!open) return; const escape = event => { if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); } }; window.addEventListener('keydown', escape); return () => window.removeEventListener('keydown', escape); }, [open]);

  useEffect(() => {

    const handleScroll = () => setScrolled(window.scrollY > 12);

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, []);

  return (

    <header

      className={`studio-navbar fixed inset-x-0 top-0 z-50 transition duration-300 ${

        scrolled

          ? 'border-b border-slate-200/70 bg-white/95 shadow-soft backdrop-blur-xl'

          : 'border-b border-white/50 bg-white/80 backdrop-blur-md'

      }`}

    >

      <nav className="container-shell flex h-16 items-center justify-between sm:h-20">

        <a href={projectPage?'/#accueil':'#accueil'} className="flex items-center gap-3" onClick={() => setOpen(false)}>

          <LogoMark className="h-9 w-9 sm:h-10 sm:w-10" />

          <span>
            <span className="brand-wordmark block text-sm text-navy sm:text-lg">INNOVIA</span>



            <span className="mt-1 block text-[8px] uppercase tracking-[.2em] text-slate-500">Studio digital</span>

          </span>

        </a>

        <div className="hidden items-center gap-5 lg:flex">

          {desktopLinks.map((link) => (

            <a

              key={link.href}

              href={link.href}

              className="text-[13px] font-bold text-slate-700 transition hover:text-cyan xl:text-sm"

            >

              {link.label}

            </a>

          ))}

        </div>

        <a

          href={projectPage?'/#contact':'#contact'}

          className="hidden items-center gap-2 rounded-lg bg-navy px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:opacity-90 hover:bg-cyan hover:text-navy hover:shadow-glow lg:inline-flex"

        >

          Parlons de votre projet

          <ArrowRight size={17} />

        </a>

        <button

          type="button"

          ref={menuButton}
          aria-expanded={open}
          aria-controls="studio-full-menu"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}

          onClick={() => setOpen((value) => !value)}

          className="studio-menu-toggle flex h-9 w-9 items-center justify-center border border-slate-200 text-navy"

        >

          {open ? <X size={21} /> : <Menu size={21} />}

        </button>

      </nav>

      <StudioMenu open={open} onClose={() => {setOpen(false);menuButton.current?.focus();}} links={navLinks} settings={settings}/>
    </header>

  );

}

export default Navbar;
