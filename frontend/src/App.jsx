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
  { key: 'testimonials', match: ['temoignage'], render: (content) => <Testimonials settings={content.settings} /> },
  { key: 'pricing', match: ['offre'], render: (content) => <Pricing offers={content.offers} settings={content.settings} /> },
  { key: 'contact', match: ['contact'], render: (content) => <Contact settings={content.settings} /> },
];

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
  const [publicContent, setPublicContent] = useState(null);
  const [contentError, setContentError] = useState('');
  const isAdminPage = window.location.pathname === '/admin';

  useEffect(() => {
    if (isAdminPage) return;
    let cancelled = false;

    async function loadPublicContent() {
      try {
        const response = await fetch(apiUrl('/api/public-content'));
        if (!response.ok) throw new Error('Impossible de charger le contenu public.');
        const content = await response.json();
        if (!cancelled) setPublicContent({ ...defaultPublicContent, ...content });
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

    if (mongoSections.length === 0) {
      return [
        <Hero key="hero" settings={publicContent.settings} />,
        <WebsiteModels key="modeles" />,
        <Portfolio key="portfolio" loadedProjects={publicContent.projects} />,
        <Services key="services" settings={publicContent.settings} />,
        <Audiences key="audiences" settings={publicContent.settings} />,
        <Solutions key="solutions" settings={publicContent.settings} />,
        <Process key="process" settings={publicContent.settings} />,
        <Technologies key="technologies" settings={publicContent.settings} />,
        <About key="about" settings={publicContent.settings} />,
        <Testimonials key="testimonials" settings={publicContent.settings} />,
        <Pricing key="pricing" offers={publicContent.offers} settings={publicContent.settings} />,
        <Contact key="contact" settings={publicContent.settings} />,
      ];
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
        sections.push(<div key={section.id || match.key}>{match.render(publicContent)}</div>);
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
    <div className="min-h-screen bg-white text-ink">
      <Navbar settings={publicContent.settings} sections={publicContent.sections} />
      <main>{renderedSections}</main>
      <Footer settings={publicContent.settings} />
    </div>
  );
}

export default App;
