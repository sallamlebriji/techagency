import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import LogoMark from './LogoMark.jsx';

const links = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Modeles', href: '#modeles' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Pour qui ?', href: '#pour-qui' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Processus', href: '#processus' },
  { label: 'Offres', href: '#offres' },
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

  if (visibleSections.length === 0) return configuredLinks;

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

function Navbar({ settings, sections }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const agencyName = settings?.agencyName || 'TechAgency';
  const tagline = settings?.tagline || 'Software & AI Studio';
  const navLinks = buildNavLinks(settings, sections);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled
          ? 'border-b border-slate-200/70 bg-white/95 shadow-soft backdrop-blur-xl'
          : 'border-b border-white/50 bg-white/80 backdrop-blur-md'
      }`}
    >
      <nav className="container-shell flex h-20 items-center justify-between">
        <a href="#accueil" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <LogoMark src={settings?.logoImage} className="h-10 w-10 rounded-lg shadow-soft" />
          <span>
            <span className="block text-lg font-extrabold leading-none text-navy sm:text-xl">{agencyName}</span>
            <span className="hidden text-[11px] font-bold uppercase text-slate-500 sm:block">{tagline}</span>
          </span>
        </a>

        <div className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
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
          href="#contact"
          className="hidden items-center gap-2 rounded-lg bg-navy px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-1 hover:bg-cyan hover:text-navy hover:shadow-glow lg:inline-flex"
        >
          Audit gratuit
          <ArrowRight size={17} />
        </a>

        <button
          type="button"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-navy lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="container-shell flex flex-col gap-2 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-cloud hover:text-cyan"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-3 text-sm font-bold text-white"
            >
              Audit gratuit
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
