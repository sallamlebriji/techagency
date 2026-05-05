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

function Navbar({ settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const agencyName = settings?.agencyName || 'TechAgency';
  const tagline = settings?.tagline || 'Software & AI Studio';

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
          <LogoMark className="h-10 w-10 rounded-lg shadow-soft" />
          <span>
            <span className="block text-lg font-extrabold leading-none text-navy sm:text-xl">{agencyName}</span>
            <span className="hidden text-[11px] font-bold uppercase text-slate-500 sm:block">{tagline}</span>
          </span>
        </a>

        <div className="hidden items-center gap-5 lg:flex">
          {links.map((link) => (
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
            {links.map((link) => (
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
