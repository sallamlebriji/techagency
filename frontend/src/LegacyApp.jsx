import { useEffect, useMemo, useState } from 'react';

import Navbar from './components/Navbar.jsx';

import Hero from './components/Hero.jsx';

import Services from './components/Services.jsx';

import Audiences from './components/Audiences.jsx';

import Solutions from './components/Solutions.jsx';

import Process from './components/Process.jsx';

import Technologies from './components/Technologies.jsx';

import WebsiteModels from './components/WebsiteModels.jsx';

import Portfolio from './components/Portfolio.jsx';

import About from './components/About.jsx';

import Testimonials from './components/Testimonials.jsx';

import Pricing from './components/Pricing.jsx';

import AdminPanel from './components/AdminPanel.jsx';

import Contact from './components/Contact.jsx';

import Footer from './components/Footer.jsx';

import Maintenance from './components/Maintenance.jsx';

import { apiUrl } from './lib/api.js';
import StudioReveal from './components/StudioReveal.jsx';
import ProjectPage from './components/ProjectPage.jsx';
import { decodeProjectSlug } from './lib/projects.js';

const sectionMap = [

  { key: 'hero', match: ['hero'], render: (content) => <Hero settings={content.settings} /> },

  { key: 'modeles', match: ['modele', 'modeles'], render: () => <WebsiteModels /> },

  { key: 'portfolio', match: ['portfolio', 'projet'], render: (content) => <Portfolio loadedProjects={content.projects} /> },

  { key: 'services', match: ['service'], render: (content) => <Services settings={content.settings} /> },

  { key: 'audiences', match: ['pour qui', 'audience'], render: (content) => <Audiences settings={content.settings} /> },

  { key: 'solutions', match: ['solution'], render: (content) => <Solutions settings={content.settings} /> },

  { key: 'process', match: ['processus', 'process'], render: (content) => <Process settings={content.settings} /> },

  { key: 'technologies', match: ['technologie'], render: (content) => <Technologies settings={content.settings} /> },

  { key: 'about', match: ['apropos', 'a propos'], render: (content) => <About settings={content.settings} /> },

  { key: 'testimonials', match: ['temoignage'], render: (content) => content.settings.testimonialsVerified === true ? <Testimonials settings={content.settings} /> : null },

  { key: 'pricing', match: ['offre'], render: (content) => <Pricing offers={content.offers} settings={content.settings} /> },

  { key: 'contact', match: ['contact'], render: (content) => <Contact settings={content.settings} /> },

];

function rebrandContent(value) {

  if (typeof value === 'string') return value.replace(/Tech\s?Agency/g, 'INNOVIA').replace(/Software & AI Studio/g, 'Solutions digitales • Intelligence artificielle').replace(/\/techagency-logo(-mark)?\.svg/g, '/innovia-logo$1.svg');

  if (Array.isArray(value)) return value.map(rebrandContent);

  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, rebrandContent(item)]));

  return value;

}

// Replace only the former starter copy; authored CMS content remains authoritative.
const legacyHeadings = {
  heroTitle: 'Des plateformes digitales elegantes, solides et pretes a faire grandir votre activite.',
  heroDescription: 'INNOVIA concoit des applications web, logiciels metiers, systemes de gestion, plateformes mobiles et solutions IA avec une exigence de clarte, de securite et de performance.',
  heroPrimaryCta: 'Planifier un audit',
  heroSecondaryCta: 'Voir nos realisations',
  servicesTitle: 'Une expertise complete pour concevoir des solutions fiables et differenciantes.',
  servicesDescription: 'INNOVIA accompagne chaque decision produit et technique : cadrage, design, developpement, integration, deploiement, securite et amelioration continue.',
  processTitle: 'Une methode structuree pour livrer sans improvisation.',
  processDescription: 'Nous combinons cadrage produit, rigueur technique et cycles courts pour garder le projet lisible, maitrise et oriente resultat.',
  contactTitle: 'Donnez-nous le contexte, nous vous aidons a structurer la solution.',
  contactDescription: 'Decrivez votre besoin, vos contraintes et vos objectifs. Nous vous repondons avec une premiere lecture technique claire et des prochaines etapes concretes.',
};
const starterTitles = new Set(['Hero et message principal', 'Modeles de sites interactifs', 'Services', 'Solutions', 'Portfolio et projets', 'Temoignages', 'Offres', 'Pour qui ?', 'Processus', 'Technologies', 'A propos', 'Contact']);
function adaptPublicContent(content) {
  const result = rebrandContent(content);
  result.settings = { ...result.settings };
  Object.entries(legacyHeadings).forEach(([key, oldCopy]) => { if (result.settings[key] === oldCopy) delete result.settings[key]; });
  const starterOrders = ['Hero|Modeles|Services|Solutions|Portfolio|Temoignage|Offres|Audience|Processus|Technologies|A propos|Contact', 'Hero|Modeles|Services|Audience|Solutions|Processus|Technologies|A propos|Temoignage|Offres|Contact|Portfolio'];
  if (result.sections?.length && result.sections.every(section => starterTitles.has(section.title)) && starterOrders.includes(result.sections.map(section => section.type).join('|'))) {
    const order = ['Hero', 'Services', 'Solutions', 'Portfolio', 'Modeles', 'Processus', 'Offres', 'Audience', 'A propos', 'Technologies', 'Temoignage', 'Contact'];
    result.sections = [...result.sections].sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
  }
  return result;
}

const defaultPublicContent = {

  sections: [],

  projects: undefined,

  offers: undefined,

  settings: {},

};

function GenericSection({ section }) {

  return (

    <section className="section-padding bg-white">

      <div className="container-shell">

        <span className="eyebrow">{section.type || 'Section'}</span>

        <h2 className="section-title">{section.title}</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">

          {(section.blocks || []).map((block) => (

            <div key={block} className="rounded-lg border border-slate-200 bg-cloud p-5 text-sm font-extrabold text-navy">

              {block}

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

function App() {
  const [location, setLocation] = useState(window.location.pathname);
  useEffect(() => { const update=()=>setLocation(window.location.pathname);window.addEventListener('popstate',update);return()=>window.removeEventListener('popstate',update); }, []);

  const [publicContent, setPublicContent] = useState(defaultPublicContent);

  const [contentError, setContentError] = useState('');

  const isAdminPage = location === '/admin';
  const isProjectPage = location.startsWith('/projets/');
  useEffect(()=>{if(isProjectPage||isAdminPage)return;const frame=requestAnimationFrame(()=>{if(window.location.hash)document.getElementById(window.location.hash.slice(1))?.scrollIntoView({behavior:'instant'});});return()=>cancelAnimationFrame(frame);},[location,isProjectPage,isAdminPage]);

  useEffect(() => {

    if (isAdminPage) return;

    let cancelled = false;

    async function loadPublicContent() {

      try {

        const response = await fetch(apiUrl('/api/public-content'), { signal: AbortSignal.timeout(7000) });

        if (!response.ok) throw new Error('Impossible de charger le contenu public.');

        const content = await response.json();

        if (!cancelled) setPublicContent({ ...defaultPublicContent, ...adaptPublicContent(content) });

      } catch (error) {

        console.warn(error.message || 'Impossible de charger le contenu public.');

        if (!cancelled) setPublicContent(defaultPublicContent);

      }

    }

    loadPublicContent();

    return () => {

      cancelled = true;

    };

  }, [isAdminPage]);

  const renderedSections = useMemo(() => {

    if (!publicContent) return [];

    const mongoSections = Array.isArray(publicContent.sections) ? publicContent.sections.filter((section) => section.visible !== false) : [];

    if (!Array.isArray(publicContent.sections) || publicContent.sections.length === 0) {

      const order = ['hero', 'services', 'solutions', 'portfolio', 'modeles', 'process', 'pricing', 'audiences', 'about', 'technologies', 'testimonials', 'contact'];
      return order.map(key => {
        const item = sectionMap.find(section => section.key === key);
        return <div key={key}>{item.render(publicContent)}</div>;
      });

    }

    const usedKeys = new Set();

    const hiddenKeys = new Set();

    const sections = [];

    (publicContent.sections || [])

      .filter((section) => section.visible === false)

      .forEach((section) => {

        const haystack = `${section.title || ''} ${section.type || ''}`.toLowerCase();

        const match = sectionMap.find((item) => item.match.some((word) => haystack.includes(word)));

        if (match) hiddenKeys.add(match.key);

      });

    mongoSections.forEach((section) => {

      const haystack = `${section.title || ''} ${section.type || ''}`.toLowerCase();

      const match = sectionMap.find((item) => !usedKeys.has(item.key) && !hiddenKeys.has(item.key) && item.match.some((word) => haystack.includes(word)));

      if (match) {

        usedKeys.add(match.key);

        sections.push(<div key={match.key}>{match.render(publicContent)}</div>);

      } else {

        sections.push(<GenericSection key={section.id || section.title} section={section} />);

      }

    });

    sectionMap.forEach((item) => {

      if (!usedKeys.has(item.key) && !hiddenKeys.has(item.key)) {

        sections.push(<div key={item.key}>{item.render(publicContent)}</div>);

      }

    });

    return sections;

  }, [publicContent]);

  if (isAdminPage) {

    return (

      <div className="min-h-screen bg-cloud text-ink">

        <AdminPanel standalone />

      </div>

    );

  }

  if (!publicContent) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-cloud px-4 text-center text-navy">

        <div>

          <p className="font-display text-2xl font-bold">

            {contentError || 'Chargement du contenu...'}

          </p>

          {contentError ? <p className="mt-3 text-sm text-slate-600">Verifie la connexion API et MongoDB.</p> : null}

        </div>

      </div>

    );

  }

  if (publicContent.settings?.maintenance) {

    return <Maintenance settings={publicContent.settings} />;

  }

  return (

    <div className="public-site min-h-screen bg-white text-ink">

      <Navbar settings={publicContent.settings} sections={publicContent.sections} projectPage={isProjectPage} />

      <a href="#contenu" className="studio-skip">Aller au contenu</a>
      {isProjectPage ? <ProjectPage key={location} slug={decodeProjectSlug(location.slice('/projets/'.length))} loadedProjects={publicContent.projects}/> : <><main id="contenu" tabIndex={-1}>{renderedSections}</main><StudioReveal /></>}

      <Footer settings={publicContent.settings} projectPage={isProjectPage} />

    </div>

  );

}

export default App;
