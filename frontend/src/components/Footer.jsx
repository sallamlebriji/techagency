import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import LogoMark from './LogoMark.jsx';

const defaultQuickLinks = [
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

const defaultFooterServices = ['Applications web', 'Mobile', 'Logiciels sur mesure', 'IA', 'Cloud & DevOps'];

function parseLinks(value) {
  const links = String(value || '')
    .split('\n')
    .map((line) => {
      const [label, href] = line.split('|').map((part) => part?.trim());
      return label && href ? { label, href } : null;
    })
    .filter(Boolean);
  return links.length > 0 ? links : defaultQuickLinks;
}

function Footer({ settings }) {
  const agencyName = settings?.agencyName || 'TechAgency';
  const tagline = settings?.tagline || 'Digital systems studio';
  const email = settings?.email || 'contact@techagency.ma';
  const footerDescription =
    settings?.footerDescription ||
    'Agence technologique specialisee dans la conception et le developpement de solutions informatiques sur mesure, performantes et evolutives.';
  const quickLinks = parseLinks(settings?.footerQuickLinks);
  const footerServices = String(settings?.footerServices || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
  const displayedFooterServices = footerServices.length > 0 ? footerServices : defaultFooterServices;
  const bottomText = settings?.footerBottomText || 'Concu pour les entreprises ambitieuses.';
  const socialLinks = [
    { Icon: Linkedin, href: settings?.linkedinUrl || '#accueil', label: 'LinkedIn' },
    { Icon: Twitter, href: settings?.twitterUrl || '#accueil', label: 'Twitter' },
    { Icon: Instagram, href: settings?.instagramUrl || '#accueil', label: 'Instagram' },
    { Icon: Github, href: settings?.githubUrl || '#accueil', label: 'GitHub' },
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="container-shell py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.8fr_0.7fr]">
          <div>
            <a href="#accueil" className="flex items-center gap-3">
              <LogoMark src={settings?.logoImage} className="h-10 w-10 rounded-lg" />
              <span>
                <span className="block text-xl font-extrabold">{agencyName}</span>
                <span className="text-xs font-bold uppercase text-slate-400">{tagline}</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">{footerDescription}</p>
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
              {displayedFooterServices.map((service) => (
                <a key={service} href="#services" className="block text-sm text-slate-300 transition hover:text-cyan">
                  {service}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-white">Reseaux sociaux</h3>
            <div className="mt-4 flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
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
          <p>{bottomText}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
