import { Download, Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import LogoMark from './LogoMark.jsx';

const quickLinks = [
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

const footerServices = ['Applications web', 'Mobile', 'Logiciels sur mesure', 'IA', 'Cloud & DevOps'];

function Footer({ settings }) {
  const agencyName = settings?.agencyName || 'TechAgency';
  const tagline = settings?.tagline || 'Digital systems studio';
  const email = settings?.email || 'contact@techagency.ma';
  const footerDescription =
    settings?.footerDescription ||
    'Agence technologique specialisee dans la conception et le developpement de solutions informatiques sur mesure, performantes et evolutives.';

  return (
    <footer className="bg-navy text-white">
      <div className="container-shell py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.8fr_0.7fr]">
          <div>
            <a href="#accueil" className="flex items-center gap-3">
              <LogoMark className="h-10 w-10 rounded-lg" />
              <span>
                <span className="block text-xl font-extrabold">{agencyName}</span>
                <span className="text-xs font-bold uppercase text-slate-400">{tagline}</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">{footerDescription}</p>
            <a
              href="/techagency-logo.svg"
              download
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-cyan/40 bg-cyan/10 px-4 py-3 text-sm font-extrabold text-cyan transition hover:bg-cyan hover:text-navy"
            >
              <Download size={17} />
              Telecharger le logo HD
            </a>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-white">Liens rapides</h3>
            <div className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <a key={link.href} href={link.href} className="block text-sm text-slate-300 transition hover:text-cyan">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-white">Services</h3>
            <div className="mt-4 space-y-3">
              {footerServices.map((service) => (
                <a key={service} href="#services" className="block text-sm text-slate-300 transition hover:text-cyan">
                  {service}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-white">Reseaux sociaux</h3>
            <div className="mt-4 flex gap-3">
              {[Linkedin, Twitter, Instagram, Github].map((Icon, index) => (
                <a
                  key={index}
                  href="#accueil"
                  aria-label="Reseau social"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition hover:border-cyan hover:bg-cyan hover:text-navy"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-400">{email}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {agencyName}. Tous droits reserves.</p>
          <p>Concu pour les entreprises ambitieuses.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
