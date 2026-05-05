import { useEffect, useState } from 'react';
import {
  Bell,
  BriefcaseBusiness,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  Palette,
  PanelLeft,
  Plus,
  Save,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Users,
  Eye,
  EyeOff,
} from 'lucide-react';
import LogoMark from './LogoMark.jsx';
import { apiUrl, getApiBaseUrl } from '../lib/api.js';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'leads', label: 'Demandes', icon: Mail },
  { id: 'content', label: 'Contenu', icon: FileText },
  { id: 'projects', label: 'Projets', icon: BriefcaseBusiness },
  { id: 'offers', label: 'Offres', icon: CreditCard },
  { id: 'brand', label: 'Branding', icon: Palette },
  { id: 'settings', label: 'Parametres', icon: Settings },
];

const leads = [
  { name: 'Cabinet medical Atlas', type: 'Site medecin', status: 'Nouveau', value: 'Priorite haute' },
  { name: 'Startup SaaS RH', type: 'Application web', status: 'En cadrage', value: 'Devis a preparer' },
  { name: 'Coach business', type: 'Modele interactif', status: 'Relance', value: 'Appel planifie' },
];

const initialSections = [
  {
    id: 1,
    title: 'Hero et message principal',
    type: 'Hero',
    visible: true,
    blocks: ['Titre principal', 'Texte descriptif', 'Boutons CTA', 'Visuel TechAgency'],
  },
  {
    id: 2,
    title: 'Modeles de sites interactifs',
    type: 'Modeles',
    visible: true,
    blocks: ['Demo Psy', 'Demo Coach', 'Demo Medecin', 'Scroll simulation'],
  },
  {
    id: 3,
    title: 'Services et solutions',
    type: 'Cards',
    visible: true,
    blocks: ['Applications web', 'Mobile', 'IA', 'Cloud & DevOps'],
  },
  {
    id: 4,
    title: 'Portfolio et projets',
    type: 'Portfolio',
    visible: true,
    blocks: ['Projet 1', 'Projet 2', 'Projet 3'],
  },
  {
    id: 5,
    title: 'Temoignages et offres',
    type: 'Conversion',
    visible: true,
    blocks: ['Temoignages', 'Pack Digital', 'Pack Business System'],
  },
];

const initialOffers = [
  { id: 1, name: 'Pack Digital', price: 'Sur devis', status: 'Actif' },
  { id: 2, name: 'Pack Business System', price: 'Sur devis', status: 'Populaire' },
  { id: 3, name: 'Pack Sur Mesure', price: 'Audit gratuit', status: 'Actif' },
];

const initialProjects = [
  {
    id: 1,
    title: 'Site vitrine Gym Ten Chi',
    description: 'Site moderne pour une salle de sport avec presentation des offres et parcours de conversion.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
    technologies: 'React, Vercel, Responsive',
    url: 'https://gym-ten-chi.vercel.app/',
    visible: true,
  },
];

function EditableInput({ label, value, onChange, type = 'text' }) {
  return (
    <label className="block">
      <span className="text-xs font-extrabold uppercase text-slate-500">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10"
      />
    </label>
  );
}

function EditableTextarea({ label, value, onChange, rows = 4 }) {
  return (
    <label className="block">
      <span className="text-xs font-extrabold uppercase text-slate-500">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10"
      />
    </label>
  );
}

function AdminPanel({ standalone = false }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sections, setSections] = useState(initialSections);
  const [selectedSectionId, setSelectedSectionId] = useState(initialSections[0].id);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newBlockTitle, setNewBlockTitle] = useState('');
  const [offers, setOffers] = useState(initialOffers);
  const [newOfferName, setNewOfferName] = useState('');
  const [projects, setProjects] = useState(initialProjects);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const [databaseStatus, setDatabaseStatus] = useState('Chargement MongoDB...');
  const [isSaving, setIsSaving] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [siteSettings, setSiteSettings] = useState({
    agencyName: 'TechAgency',
    tagline: 'Software & AI Studio',
    email: 'contact@techagency.ma',
    phone: '+212 6 00 00 00 00',
    address: 'Casablanca, Maroc',
    domain: 'techagency.ma',
    primaryColor: '#081A33',
    accentColor: '#25D7D7',
    maintenance: false,
    notifications: true,
    backups: true,
    adminProtection: true,
    heroEyebrow: 'Agence tech premium pour solutions sur mesure',
    heroTitle: 'Des plateformes digitales elegantes, solides et pretes a faire grandir votre activite.',
    heroDescription:
      'TechAgency concoit des applications web, logiciels metiers, systemes de gestion, plateformes mobiles et solutions IA avec une exigence de clarte, de securite et de performance.',
    heroPrimaryCta: 'Planifier un audit',
    heroSecondaryCta: 'Voir nos realisations',
    contactTitle: 'Donnez-nous le contexte, nous vous aidons a structurer la solution.',
    contactDescription:
      'Decrivez votre besoin, vos contraintes et vos objectifs. Nous vous repondons avec une premiere lecture technique claire et des prochaines etapes concretes.',
    contactHighlights:
      'Reponse structuree sous 24h ouvrees\nAnalyse initiale de votre besoin\nEstimation claire du perimetre et des priorites',
    footerDescription:
      'Agence technologique specialisee dans la conception et le developpement de solutions informatiques sur mesure, performantes et evolutives.',
  });
  const ActiveIcon = tabs.find((tab) => tab.id === activeTab)?.icon || LayoutDashboard;
  const selectedSection = sections.find((section) => section.id === selectedSectionId) || sections[0];

  useEffect(() => {
    let cancelled = false;

    async function loadAdminConfig() {
      try {
        const authResponse = await fetch(apiUrl('/api/admin-me'), { credentials: 'include' });
        const auth = await authResponse.json();
        if (cancelled) return;
        setAdminAuthenticated(Boolean(auth.authenticated));
        setAuthLoading(false);

        if (!auth.authenticated) {
          setDatabaseStatus('Authentification admin requise');
          return;
        }

        const response = await fetch(apiUrl('/api/admin-config'), { credentials: 'include' });
        if (!response.ok) throw new Error('API indisponible');
        const config = await response.json();
        if (cancelled) return;

        setSections(config.sections || initialSections);
        setOffers(config.offers || initialOffers);
        setProjects(config.projects || initialProjects);
        setSiteSettings((current) => ({ ...current, ...(config.settings || {}) }));
        setSelectedSectionId((config.sections || initialSections)[0]?.id || 0);
        setDatabaseStatus('MongoDB connecte');
      } catch (error) {
        if (cancelled) return;
        setAuthLoading(false);
        setDatabaseStatus('MongoDB non connecte - lance le serveur et verifie MONGODB_URI');
        setSavedMessage(error.message);
      }
    }

    loadAdminConfig();

    return () => {
      cancelled = true;
    };
  }, []);

  const loadConfigAfterLogin = async () => {
    const response = await fetch(apiUrl('/api/admin-config'), { credentials: 'include' });
    if (!response.ok) throw new Error('API indisponible');
    const config = await response.json();
    setSections(config.sections || initialSections);
    setOffers(config.offers || initialOffers);
    setProjects(config.projects || initialProjects);
    setSiteSettings((current) => ({ ...current, ...(config.settings || {}) }));
    setSelectedSectionId((config.sections || initialSections)[0]?.id || 0);
    setDatabaseStatus('MongoDB connecte');
  };

  const loginAdmin = async (event) => {
    event.preventDefault();
    setSavedMessage('');

    try {
      const response = await fetch(apiUrl('/api/admin-login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password: adminPassword }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Mot de passe incorrect');
      }

      setAdminAuthenticated(true);
      setAdminPassword('');
      await loadConfigAfterLogin();
    } catch (error) {
      setSavedMessage(error.message);
    }
  };

  const saveAdminState = async () => {
    setIsSaving(true);
    setSavedMessage('');

    try {
      const response = await fetch(apiUrl('/api/admin-config'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ sections, offers, projects, settings: siteSettings }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Erreur sauvegarde MongoDB');
      }

      setDatabaseStatus('MongoDB connecte');
      setSavedMessage('Modifications enregistrees dans MongoDB');
    } catch (error) {
      setSavedMessage(error.message);
      setDatabaseStatus('Erreur de connexion MongoDB');
    } finally {
      setIsSaving(false);
      window.setTimeout(() => setSavedMessage(''), 2600);
    }
  };

  const updateSetting = (key, value) => {
    setSiteSettings((current) => ({ ...current, [key]: value }));
  };

  const updateSection = (id, updates) => {
    setSections((current) => current.map((section) => (section.id === id ? { ...section, ...updates } : section)));
  };

  const addSection = () => {
    const title = newSectionTitle.trim();
    if (!title) return;

    const nextSection = {
      id: Date.now(),
      title,
      type: 'Nouvelle section',
      visible: true,
      blocks: ['Nouveau bloc'],
    };

    setSections((current) => [...current, nextSection]);
    setSelectedSectionId(nextSection.id);
    setNewSectionTitle('');
  };

  const deleteSection = (id) => {
    setSections((current) => {
      const next = current.filter((section) => section.id !== id);
      if (selectedSectionId === id) {
        setSelectedSectionId(next[0]?.id || 0);
      }
      return next;
    });
  };

  const addBlock = () => {
    const title = newBlockTitle.trim();
    if (!title || !selectedSection) return;
    updateSection(selectedSection.id, { blocks: [...selectedSection.blocks, title] });
    setNewBlockTitle('');
  };

  const updateBlock = (blockIndex, value) => {
    if (!selectedSection) return;
    updateSection(selectedSection.id, {
      blocks: selectedSection.blocks.map((block, index) => (index === blockIndex ? value : block)),
    });
  };

  const deleteBlock = (blockIndex) => {
    if (!selectedSection) return;
    updateSection(selectedSection.id, {
      blocks: selectedSection.blocks.filter((_, index) => index !== blockIndex),
    });
  };

  const addOffer = () => {
    const name = newOfferName.trim();
    if (!name) return;
    setOffers((current) => [...current, { id: Date.now(), name, price: 'Sur devis', status: 'Brouillon' }]);
    setNewOfferName('');
  };

  const updateOffer = (id, updates) => {
    setOffers((current) => current.map((offer) => (offer.id === id ? { ...offer, ...updates } : offer)));
  };

  const deleteOffer = (id) => {
    setOffers((current) => current.filter((offer) => offer.id !== id));
  };

  const addProject = () => {
    const title = newProjectTitle.trim();
    if (!title) return;

    setProjects((current) => [
      ...current,
      {
        id: Date.now(),
        title,
        description: 'Description du projet a modifier.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        technologies: 'React, Vercel',
        url: '',
        visible: true,
      },
    ]);
    setNewProjectTitle('');
  };

  const updateProject = (id, updates) => {
    setProjects((current) => current.map((project) => (project.id === id ? { ...project, ...updates } : project)));
  };

  const deleteProject = (id) => {
    setProjects((current) => current.filter((project) => project.id !== id));
  };

  if (authLoading) {
    return (
      <section className="min-h-screen bg-cloud py-10">
        <div className="container-shell">
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft">
            <LogoMark className="mx-auto h-14 w-14 rounded-lg" />
            <p className="mt-5 text-lg font-extrabold text-navy">Chargement de l'espace admin...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!adminAuthenticated) {
    return (
      <section className="min-h-screen bg-cloud py-10">
        <div className="container-shell">
          <div className="mx-auto max-w-lg rounded-lg border border-slate-200 bg-white p-6 shadow-premium sm:p-8">
            <a href="/" className="flex items-center gap-3">
              <LogoMark className="h-12 w-12 rounded-lg shadow-sm" />
              <span>
                <span className="block text-xl font-extrabold leading-none text-navy">TechAgency Admin</span>
                <span className="text-xs font-extrabold uppercase text-cyan">Acces securise</span>
              </span>
            </a>

            <form onSubmit={loginAdmin} className="mt-8">
              <label className="block">
                <span className="text-sm font-extrabold text-navy">Mot de passe admin</span>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(event) => setAdminPassword(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10"
                  placeholder="Entrer le mot de passe"
                />
              </label>
              {savedMessage && (
                <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
                  {savedMessage}
                </p>
              )}
              <button type="submit" className="primary-button mt-6 w-full">
                <LockKeyhole size={18} />
                Acceder a l'admin
              </button>
            </form>

            <a href="/" className="secondary-button mt-4 w-full">
              <PanelLeft size={17} />
              Retour au site
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="admin" className={`${standalone ? 'min-h-screen py-8' : 'section-padding scroll-mt-24 bg-white'}`}>
      <div className="container-shell">
        {standalone && (
          <div className="mb-8 flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <a href="/" className="flex items-center gap-3">
              <LogoMark className="h-11 w-11 rounded-lg shadow-sm" />
              <span>
                <span className="block text-lg font-extrabold leading-none text-navy">TechAgency Admin</span>
                <span className="text-xs font-extrabold uppercase text-cyan">Console de gestion</span>
              </span>
            </a>
            <a href="/" className="secondary-button">
              <PanelLeft size={17} />
              Retour au site
            </a>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="eyebrow">
              <LockKeyhole size={14} />
              Espace admin
            </span>
            <h2 className="section-title">Un back-office pour piloter TechAgency au quotidien.</h2>
          </div>
          <p className="text-base leading-8 text-slate-600 sm:text-lg">
            Cette partie centralise les demandes clients, les modeles, les offres, le branding et les parametres
            essentiels de l'agence. C'est une base d'interface admin prete a connecter a un backend.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-lg border border-slate-200 bg-cloud shadow-premium">
          <div className="flex flex-col border-b border-slate-200 bg-white lg:flex-row">
            <div className="flex items-center gap-3 border-b border-slate-200 p-5 lg:w-72 lg:border-b-0 lg:border-r">
              <LogoMark className="h-12 w-12 rounded-lg shadow-sm" />
              <div>
                <p className="font-display text-xl font-bold leading-none text-navy">TechAgency</p>
                <p className="mt-1 text-xs font-extrabold uppercase text-cyan">Admin console</p>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-between gap-4 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy text-cyan">
                  <ActiveIcon size={22} />
                </span>
                <div>
                  <p className="text-xs font-extrabold uppercase text-slate-500">Module actif</p>
                  <h3 className="text-lg font-extrabold text-navy">
                    {tabs.find((tab) => tab.id === activeTab)?.label}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={saveAdminState}
                disabled={isSaving}
                className="hidden items-center gap-2 rounded-lg bg-navy px-4 py-3 text-sm font-extrabold text-white transition hover:bg-cyan hover:text-navy sm:inline-flex"
              >
                <Save size={17} />
                {isSaving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[18rem_1fr]">
            <aside className="border-b border-slate-200 bg-white p-4 lg:border-b-0 lg:border-r">
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-extrabold transition ${
                        isActive ? 'bg-navy text-white shadow-sm' : 'text-slate-600 hover:bg-cloud hover:text-navy'
                      }`}
                    >
                      <Icon size={18} className={isActive ? 'text-cyan' : 'text-slate-400'} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-lg border border-cyan/20 bg-cyan/10 p-4">
                <p className="text-xs font-extrabold uppercase text-cyan">Statut agence</p>
                <p className="mt-2 text-sm font-bold leading-6 text-navy">
                  {databaseStatus}
                </p>
                <p className="mt-2 break-all text-xs font-semibold text-slate-600">
                  API: {getApiBaseUrl()}
                </p>
              </div>
            </aside>

            <div className="min-h-[560px] p-5 sm:p-7">
              {savedMessage && (
                <div className="mb-5 rounded-lg border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm font-extrabold text-navy">
                  {savedMessage}
                </div>
              )}

              {activeTab === 'dashboard' && (
                <div>
                  <div className="grid gap-4 md:grid-cols-4">
                    {[
                      ['Demandes', '18', Users],
                      ['Devis ouverts', '7', BriefcaseBusiness],
                      ['Modeles actifs', '3', Sparkles],
                      ['Taux reponse', '94%', Bell],
                    ].map(([label, value, Icon]) => (
                      <div key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                        <Icon size={21} className="text-cyan" />
                        <p className="mt-4 text-3xl font-extrabold text-navy">{value}</p>
                        <p className="mt-1 text-sm font-bold text-slate-500">{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                      <h3 className="text-lg font-extrabold text-navy">Pipeline commercial</h3>
                      <div className="mt-5 space-y-4">
                        {leads.map((lead) => (
                          <div key={lead.name} className="rounded-lg border border-slate-200 bg-cloud p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="font-extrabold text-navy">{lead.name}</p>
                                <p className="mt-1 text-sm font-semibold text-slate-500">{lead.type}</p>
                              </div>
                              <span className="rounded-md bg-cyan/10 px-3 py-1 text-xs font-extrabold text-cyan">
                                {lead.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-navy p-5 text-white shadow-sm">
                      <h3 className="text-lg font-extrabold">Actions rapides</h3>
                      <div className="mt-5 grid gap-3">
                        {['Ajouter un service', 'Modifier un modele', 'Publier une offre', 'Exporter les leads'].map((item) => (
                          <button
                            key={item}
                            type="button"
                            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold transition hover:border-cyan hover:text-cyan"
                          >
                            {item}
                            <SlidersHorizontal size={17} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'leads' && (
                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-extrabold text-navy">Demandes clients</h3>
                  <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
                    {leads.map((lead) => (
                      <div key={lead.name} className="grid gap-3 border-b border-slate-200 p-4 last:border-b-0 md:grid-cols-4">
                        <p className="font-extrabold text-navy">{lead.name}</p>
                        <p className="text-sm font-semibold text-slate-600">{lead.type}</p>
                        <p className="text-sm font-bold text-cyan">{lead.status}</p>
                        <p className="text-sm font-semibold text-slate-500">{lead.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'content' && (
                <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-extrabold text-navy">Sections du site</h3>
                        <p className="mt-1 text-sm font-semibold text-slate-500">Ajouter, masquer, modifier ou supprimer.</p>
                      </div>
                      <span className="rounded-md bg-cyan/10 px-3 py-1 text-xs font-extrabold text-cyan">
                        {sections.length} sections
                      </span>
                    </div>

                    <div className="mt-5 flex gap-2">
                      <input
                        type="text"
                        value={newSectionTitle}
                        onChange={(event) => setNewSectionTitle(event.target.value)}
                        placeholder="Nouvelle section"
                        className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10"
                      />
                      <button
                        type="button"
                        onClick={addSection}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy text-cyan transition hover:bg-cyan hover:text-navy"
                        aria-label="Ajouter une section"
                      >
                        <Plus size={20} />
                      </button>
                    </div>

                    <div className="mt-5 space-y-3">
                      {sections.map((section, index) => (
                        <button
                          key={section.id}
                          type="button"
                          onClick={() => setSelectedSectionId(section.id)}
                          className={`flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm font-extrabold transition ${
                            selectedSectionId === section.id
                              ? 'border-cyan bg-navy text-white'
                              : 'border-slate-200 bg-cloud text-navy hover:border-cyan'
                          }`}
                        >
                          <span>
                            <span className="block">{section.title}</span>
                            <span className={`mt-1 block text-xs ${selectedSectionId === section.id ? 'text-slate-300' : 'text-slate-500'}`}>
                              {String(index + 1).padStart(2, '0')} - {section.type} - {section.blocks.length} blocs
                            </span>
                          </span>
                          {section.visible ? <Eye size={18} className="shrink-0 text-cyan" /> : <EyeOff size={18} className="shrink-0 text-slate-400" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    {selectedSection ? (
                      <>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="text-xl font-extrabold text-navy">Modifier la section</h3>
                            <p className="mt-1 text-sm font-semibold text-slate-500">Toutes les parties sont modifiables dans ce prototype.</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => updateSection(selectedSection.id, { visible: !selectedSection.visible })}
                              className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-navy transition hover:border-cyan hover:text-cyan"
                              aria-label="Changer la visibilite"
                            >
                              {selectedSection.visible ? <Eye size={19} /> : <EyeOff size={19} />}
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteSection(selectedSection.id)}
                              className="flex h-11 w-11 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
                              aria-label="Supprimer la section"
                            >
                              <Trash2 size={19} />
                            </button>
                          </div>
                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          <EditableInput
                            label="Nom de la section"
                            value={selectedSection.title}
                            onChange={(value) => updateSection(selectedSection.id, { title: value })}
                          />
                          <EditableInput
                            label="Type / layout"
                            value={selectedSection.type}
                            onChange={(value) => updateSection(selectedSection.id, { type: value })}
                          />
                        </div>

                        <div className="mt-6 rounded-lg border border-slate-200 bg-cloud p-4">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <h4 className="font-extrabold text-navy">Blocs de la section</h4>
                              <p className="mt-1 text-sm font-semibold text-slate-500">Modifier chaque bloc, ou ajouter un nouveau bloc.</p>
                            </div>
                            <span className="rounded-md bg-white px-3 py-1 text-xs font-extrabold text-cyan">
                              {selectedSection.blocks.length} blocs
                            </span>
                          </div>

                          <div className="mt-4 space-y-3">
                            {selectedSection.blocks.map((block, blockIndex) => (
                              <div key={`${selectedSection.id}-${blockIndex}`} className="flex gap-2">
                                <input
                                  type="text"
                                  value={block}
                                  onChange={(event) => updateBlock(blockIndex, event.target.value)}
                                  className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10"
                                />
                                <button
                                  type="button"
                                  onClick={() => deleteBlock(blockIndex)}
                                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
                                  aria-label="Supprimer le bloc"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 flex gap-2">
                            <input
                              type="text"
                              value={newBlockTitle}
                              onChange={(event) => setNewBlockTitle(event.target.value)}
                              placeholder="Nouveau bloc"
                              className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10"
                            />
                            <button type="button" onClick={addBlock} className="primary-button">
                              <Plus size={17} />
                              Ajouter
                            </button>
                          </div>
                        </div>

                        <div className="mt-6 rounded-lg border border-cyan/20 bg-cyan/10 p-4">
                          <p className="text-sm font-bold leading-7 text-navy">
                            Pour rendre ces modifications persistantes, il faudra connecter ce panneau a une base de donnees
                            ou a un CMS. L'interface est deja structuree pour ca.
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="rounded-lg border border-slate-200 bg-cloud p-6 text-center">
                        <p className="font-extrabold text-navy">Aucune section selectionnee.</p>
                        <p className="mt-2 text-sm text-slate-600">Ajoutez une section pour commencer la configuration.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'offers' && (
                <div>
                  <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <h3 className="text-xl font-extrabold text-navy">Gestion des offres</h3>
                        <p className="mt-1 text-sm font-semibold text-slate-500">Ajouter, modifier ou supprimer les packs commerciaux.</p>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newOfferName}
                          onChange={(event) => setNewOfferName(event.target.value)}
                          placeholder="Nouvelle offre"
                          className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10"
                        />
                        <button type="button" onClick={addOffer} className="primary-button">
                          <Plus size={17} />
                          Ajouter
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-5 md:grid-cols-3">
                      {offers.map((offer, index) => (
                        <div key={offer.id} className="rounded-lg border border-slate-200 bg-cloud p-5 shadow-sm">
                          <p className="text-xs font-extrabold uppercase text-cyan">Offre {index + 1}</p>
                          <div className="mt-4 grid gap-3">
                            <EditableInput
                              label="Nom"
                              value={offer.name}
                              onChange={(value) => updateOffer(offer.id, { name: value })}
                            />
                            <EditableInput
                              label="Prix"
                              value={offer.price}
                              onChange={(value) => updateOffer(offer.id, { price: value })}
                            />
                            <EditableInput
                              label="Statut"
                              value={offer.status}
                              onChange={(value) => updateOffer(offer.id, { status: value })}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => deleteOffer(offer.id)}
                            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-3 text-sm font-extrabold text-red-500 transition hover:bg-red-50"
                          >
                            <Trash2 size={17} />
                            Supprimer
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h3 className="text-xl font-extrabold text-navy">Gestion des projets</h3>
                      <p className="mt-1 text-sm font-semibold text-slate-500">
                        Ajouter, modifier, masquer ou supprimer les projets affiches dans le portfolio.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newProjectTitle}
                        onChange={(event) => setNewProjectTitle(event.target.value)}
                        placeholder="Nouveau projet"
                        className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10"
                      />
                      <button type="button" onClick={addProject} className="primary-button">
                        <Plus size={17} />
                        Ajouter
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-5 xl:grid-cols-2">
                    {projects.map((project, index) => (
                      <div key={project.id} className="rounded-lg border border-slate-200 bg-cloud p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-extrabold uppercase text-cyan">Projet {index + 1}</p>
                            <h4 className="mt-2 text-lg font-extrabold text-navy">{project.title}</h4>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => updateProject(project.id, { visible: !project.visible })}
                              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-navy transition hover:border-cyan hover:text-cyan"
                              aria-label="Changer la visibilite du projet"
                            >
                              {project.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteProject(project.id)}
                              className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-200 bg-white text-red-500 transition hover:bg-red-50"
                              aria-label="Supprimer le projet"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          <EditableInput
                            label="Titre"
                            value={project.title}
                            onChange={(value) => updateProject(project.id, { title: value })}
                          />
                          <EditableInput
                            label="Technologies"
                            value={project.technologies}
                            onChange={(value) => updateProject(project.id, { technologies: value })}
                          />
                          <EditableInput
                            label="URL du site"
                            value={project.url}
                            onChange={(value) => updateProject(project.id, { url: value })}
                          />
                          <EditableInput
                            label="Image"
                            value={project.image}
                            onChange={(value) => updateProject(project.id, { image: value })}
                          />
                        </div>

                        <label className="mt-4 block">
                          <span className="text-xs font-extrabold uppercase text-slate-500">Description</span>
                          <textarea
                            value={project.description}
                            onChange={(event) => updateProject(project.id, { description: event.target.value })}
                            rows="4"
                            className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10"
                          />
                        </label>

                        <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">
                          <span className="text-sm font-extrabold text-navy">Visible dans le portfolio</span>
                          <input
                            type="checkbox"
                            checked={project.visible}
                            onChange={(event) => updateProject(project.id, { visible: event.target.checked })}
                            className="h-5 w-5 accent-cyan"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'brand' && (
                <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                  <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <LogoMark className="h-20 w-20 rounded-lg shadow-sm" />
                    <h3 className="mt-5 text-xl font-extrabold text-navy">Logo TechAgency</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      Logo vectoriel disponible pour site web, cartes de visite, presentations et documents commerciaux.
                    </p>
                    <a href="/techagency-logo.svg" download className="primary-button mt-5">
                      <Download size={17} />
                      Telecharger
                    </a>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-xl font-extrabold text-navy">Identite visuelle</h3>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <EditableInput
                        label="Couleur principale"
                        value={siteSettings.primaryColor}
                        onChange={(value) => updateSetting('primaryColor', value)}
                      />
                      <EditableInput
                        label="Couleur accent"
                        value={siteSettings.accentColor}
                        onChange={(value) => updateSetting('accentColor', value)}
                      />
                      <EditableInput
                        label="Nom public"
                        value={siteSettings.agencyName}
                        onChange={(value) => updateSetting('agencyName', value)}
                      />
                      <EditableInput
                        label="Signature"
                        value={siteSettings.tagline}
                        onChange={(value) => updateSetting('tagline', value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                  <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-xl font-extrabold text-navy">Parametres generaux</h3>
                    <div className="mt-5 grid gap-4">
                      <EditableInput
                        label="Nom agence"
                        value={siteSettings.agencyName}
                        onChange={(value) => updateSetting('agencyName', value)}
                      />
                      <EditableInput
                        label="Adresse"
                        value={siteSettings.address}
                        onChange={(value) => updateSetting('address', value)}
                      />
                      <EditableInput
                        label="Domaine"
                        value={siteSettings.domain}
                        onChange={(value) => updateSetting('domain', value)}
                      />
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
                    <h3 className="text-xl font-extrabold text-navy">Textes du site public</h3>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      Ces champs pilotent les grandes zones visibles : accueil, contact et footer.
                    </p>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <EditableInput
                        label="Badge Hero"
                        value={siteSettings.heroEyebrow}
                        onChange={(value) => updateSetting('heroEyebrow', value)}
                      />
                      <EditableInput
                        label="CTA principal"
                        value={siteSettings.heroPrimaryCta}
                        onChange={(value) => updateSetting('heroPrimaryCta', value)}
                      />
                      <EditableTextarea
                        label="Titre Hero"
                        value={siteSettings.heroTitle}
                        onChange={(value) => updateSetting('heroTitle', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Description Hero"
                        value={siteSettings.heroDescription}
                        onChange={(value) => updateSetting('heroDescription', value)}
                        rows={3}
                      />
                      <EditableInput
                        label="CTA secondaire"
                        value={siteSettings.heroSecondaryCta}
                        onChange={(value) => updateSetting('heroSecondaryCta', value)}
                      />
                      <EditableInput
                        label="Email contact"
                        value={siteSettings.email}
                        onChange={(value) => updateSetting('email', value)}
                      />
                      <EditableInput
                        label="Telephone"
                        value={siteSettings.phone}
                        onChange={(value) => updateSetting('phone', value)}
                      />
                      <EditableTextarea
                        label="Titre Contact"
                        value={siteSettings.contactTitle}
                        onChange={(value) => updateSetting('contactTitle', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Description Contact"
                        value={siteSettings.contactDescription}
                        onChange={(value) => updateSetting('contactDescription', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Points forts Contact - une ligne par point"
                        value={siteSettings.contactHighlights}
                        onChange={(value) => updateSetting('contactHighlights', value)}
                        rows={4}
                      />
                      <EditableTextarea
                        label="Description Footer"
                        value={siteSettings.footerDescription}
                        onChange={(value) => updateSetting('footerDescription', value)}
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-xl font-extrabold text-navy">Securite & systeme</h3>
                    <div className="mt-5 space-y-3">
                      {[
                        ['notifications', 'Notifications email actives'],
                        ['backups', 'Sauvegarde automatique'],
                        ['maintenance', 'Mode maintenance'],
                        ['adminProtection', 'Protection admin par mot de passe'],
                      ].map(([key, label]) => (
                        <label key={key} className="flex cursor-pointer items-center justify-between gap-3 rounded-lg bg-cloud p-4 text-sm font-extrabold text-navy">
                          <span className="flex items-center gap-3">
                            <CheckCircle2 size={20} className={siteSettings[key] ? 'text-cyan' : 'text-slate-300'} />
                            {label}
                          </span>
                          <input
                            type="checkbox"
                            checked={siteSettings[key]}
                            onChange={(event) => updateSetting(key, event.target.checked)}
                            className="h-5 w-5 accent-cyan"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminPanel;
