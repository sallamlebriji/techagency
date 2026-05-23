import { useEffect, useState } from 'react';
import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Download,
  FileText,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Mail,
  MessageSquareText,
  Palette,
  PanelLeft,
  Phone,
  Plus,
  Save,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Users,
  UserRound,
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

const initialDashboardStats = {
  requests: 0,
  openQuotes: 0,
  activeModels: '0',
  responseRate: '0%',
};

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
    title: 'Services',
    type: 'Services',
    visible: true,
    blocks: ['Applications web', 'Mobile', 'IA', 'Cloud & DevOps'],
  },
  {
    id: 4,
    title: 'Pour qui ?',
    type: 'Audience',
    visible: true,
    blocks: ['PME / TPE', 'Startups', 'Ecoles', 'Commerce'],
  },
  {
    id: 5,
    title: 'Solutions',
    type: 'Solutions',
    visible: true,
    blocks: ['Gestion commerciale', 'Reservation', 'E-commerce', 'CRM / ERP'],
  },
  {
    id: 6,
    title: 'Processus',
    type: 'Processus',
    visible: true,
    blocks: ['Analyse', 'Conception', 'Developpement', 'Deploiement'],
  },
  {
    id: 7,
    title: 'Technologies',
    type: 'Technologies',
    visible: true,
    blocks: ['Frontend', 'Backend', 'Data', 'IA'],
  },
  {
    id: 8,
    title: 'A propos',
    type: 'A propos',
    visible: true,
    blocks: ['Texte agence', 'Image', 'Statistiques'],
  },
  {
    id: 9,
    title: 'Temoignages',
    type: 'Temoignage',
    visible: true,
    blocks: ['Clients verifies', 'Avis', 'Preuves'],
  },
  {
    id: 10,
    title: 'Offres',
    type: 'Offres',
    visible: true,
    blocks: ['Pack Digital', 'Pack Business System', 'Pack Sur Mesure'],
  },
  {
    id: 11,
    title: 'Contact',
    type: 'Contact',
    visible: true,
    blocks: ['Formulaire', 'Email', 'Telephone', 'Adresse'],
  },
  {
    id: 12,
    title: 'Portfolio et projets',
    type: 'Portfolio',
    visible: true,
    blocks: ['Projet 1', 'Projet 2', 'Projet 3'],
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

const adminTokenKey = 'techagency_admin_token';

function getAdminToken() {
  return window.localStorage.getItem(adminTokenKey) || '';
}

function setAdminToken(token) {
  if (token) {
    window.localStorage.setItem(adminTokenKey, token);
    return;
  }
  window.localStorage.removeItem(adminTokenKey);
}

function adminFetch(path, options = {}) {
  const token = getAdminToken();
  const headers = new Headers(options.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);

  return fetch(apiUrl(path), {
    ...options,
    headers,
    credentials: 'include',
  });
}

function imageFileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file?.type?.startsWith('image/')) {
      reject(new Error('Selectionne une image valide.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Impossible de lire l image.'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('Image invalide.'));
      image.onload = () => {
        const maxWidth = 1200;
        const scale = Math.min(1, maxWidth / image.width);
        const width = Math.round(image.width * scale);
        const height = Math.round(image.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL('image/webp', 0.82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function loadDashboardData() {
  const response = await adminFetch('/api/admin-dashboard');
  if (!response.ok) throw new Error(`Dashboard indisponible (${response.status})`);
  return response.json();
}

async function loadLeadsData() {
  const response = await adminFetch('/api/admin-leads');
  if (!response.ok) throw new Error(`Demandes indisponibles (${response.status})`);
  return response.json();
}

const leadStatuses = [
  { value: 'new', label: 'Nouveau' },
  { value: 'open', label: 'Ouvert' },
  { value: 'in_progress', label: 'En traitement' },
  { value: 'pending', label: 'En attente' },
  { value: 'answered', label: 'Repondu' },
  { value: 'closed', label: 'Cloture' },
  { value: 'archived', label: 'Archive' },
];

function getStatusLabel(status) {
  return leadStatuses.find((item) => item.value === status)?.label || status || 'Nouveau';
}

function normalizeLabel(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function csvCell(value) {
  const text = String(value || '').replace(/\r?\n/g, ' ');
  return `"${text.replace(/"/g, '""')}"`;
}

function AdminLoginPage({
  adminEmail,
  adminPassword,
  apiStatus,
  isSubmitting,
  loginAdmin,
  savedMessage,
  setAdminEmail,
  setAdminPassword,
  setShowAdminPassword,
  showAdminPassword,
}) {
  return (
    <section className="flex min-h-screen items-center bg-cloud py-10">
      <div className="container-shell">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-premium lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-navy p-8 text-white sm:p-10">
            <a href="/" className="flex items-center gap-3">
              <LogoMark className="h-12 w-12 rounded-lg shadow-sm" />
              <span>
                <span className="block text-xl font-extrabold leading-none">TechAgency</span>
                <span className="text-xs font-extrabold uppercase text-cyan">Console admin</span>
              </span>
            </a>

            <div className="mt-16">
              <span className="inline-flex items-center gap-2 rounded-md border border-cyan/40 bg-cyan/10 px-3 py-1 text-xs font-extrabold uppercase text-cyan">
                <LockKeyhole size={15} />
                Acces securise
              </span>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight">Connexion administrateur</h1>
              <p className="mt-5 text-sm font-semibold leading-7 text-slate-300">
                Connecte-toi pour gerer le contenu du site, les demandes clients, les offres, les projets et les
                parametres publics.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <form onSubmit={loginAdmin} className="space-y-5">
              <label className="block">
                <span className="text-sm font-extrabold text-navy">Email admin</span>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(event) => setAdminEmail(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10"
                  placeholder="admin@techagency.local"
                  autoComplete="username"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-extrabold text-navy">Mot de passe admin</span>
                <span className="mt-2 flex overflow-hidden rounded-lg border border-slate-200 bg-white focus-within:border-cyan focus-within:ring-4 focus-within:ring-cyan/10">
                  <input
                    type={showAdminPassword ? 'text' : 'password'}
                    value={adminPassword}
                    onChange={(event) => setAdminPassword(event.target.value)}
                    className="min-w-0 flex-1 px-4 py-3 text-sm font-semibold text-navy outline-none"
                    placeholder="Entrer le mot de passe"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPassword((value) => !value)}
                    className="flex w-12 items-center justify-center border-l border-slate-200 text-slate-500 transition hover:text-cyan"
                    aria-label={showAdminPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showAdminPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </span>
              </label>

              {savedMessage && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
                  {savedMessage}
                </p>
              )}

              <div className="rounded-lg border border-slate-200 bg-cloud px-4 py-3 text-xs font-bold text-slate-600">
                <p>API: {getApiBaseUrl()}</p>
                <p className="mt-1">{apiStatus}</p>
              </div>

              <button type="submit" disabled={isSubmitting} className="primary-button w-full disabled:cursor-wait disabled:opacity-70">
                <LockKeyhole size={18} />
                {isSubmitting ? 'Connexion...' : "Acceder a l'admin"}
              </button>
            </form>

            <a href="/" className="secondary-button mt-4 w-full">
              <PanelLeft size={17} />
              Retour au site
            </a>
          </div>
        </div>
      </div>
    </section>
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
  const [dashboardStats, setDashboardStats] = useState(initialDashboardStats);
  const [dashboardLeads, setDashboardLeads] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState('');
  const [leadFilter, setLeadFilter] = useState('all');
  const [savedMessage, setSavedMessage] = useState('');
  const [databaseStatus, setDatabaseStatus] = useState('Chargement MongoDB...');
  const [apiStatus, setApiStatus] = useState('Verification API...');
  const [isSaving, setIsSaving] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [siteSettings, setSiteSettings] = useState({
    agencyName: 'TechAgency',
    tagline: 'Software & AI Studio',
    email: 'contact@techagency.ma',
    phone: '+212 6 00 00 00 00',
    address: 'Casablanca, Maroc',
    domain: 'techagency.ma',
    primaryColor: '#081A33',
    accentColor: '#25D7D7',
    logoImage: '',
    logoFileName: 'techagency-logo.svg',
    maintenance: false,
    notifications: true,
    backups: true,
    adminProtection: true,
    dashboardModelsActive: '3',
    dashboardResponseRate: '94%',
    heroEyebrow: 'Agence tech premium pour solutions sur mesure',
    heroTitle: 'Des plateformes digitales elegantes, solides et pretes a faire grandir votre activite.',
    heroDescription:
      'TechAgency concoit des applications web, logiciels metiers, systemes de gestion, plateformes mobiles et solutions IA avec une exigence de clarte, de securite et de performance.',
    heroPrimaryCta: 'Planifier un audit',
    heroSecondaryCta: 'Voir nos realisations',
    servicesEyebrow: 'Services',
    servicesTitle: 'Une expertise complete pour concevoir des solutions fiables et differenciantes.',
    servicesDescription:
      'TechAgency accompagne chaque decision produit et technique : cadrage, design, developpement, integration, deploiement, securite et amelioration continue.',
    servicesItems:
      'Developpement d applications web|Portails, plateformes SaaS et interfaces metier performantes, securisees et faciles a utiliser.\nDeveloppement mobile|Experiences mobiles fluides pour Android et iOS, pensees pour vos clients et vos equipes terrain.\nLogiciels sur mesure|Logiciels concus autour de vos processus, regles metier, donnees et objectifs operationnels.\nSystemes de gestion|ERP, CRM, back-offices et systemes internes pour centraliser vos operations critiques.\nIntelligence artificielle|Chatbots, analyse de donnees, assistants intelligents et automatisation augmentee par l IA.\nAutomatisation des processus|Workflows robustes pour reduire les taches repetitives et fiabiliser les operations.\nCloud & DevOps|Architecture cloud, CI/CD, supervision et deploiements stables pour evoluer sereinement.\nCybersecurite|Protection des donnees, durcissement applicatif et pratiques de securite des la conception.',
    servicesProofPoints:
      'Architecture scalable et maintenable\nInterfaces sobres, rapides et orientees conversion\nDeploiement securise avec support continu',
    solutionsEyebrow: 'Solutions',
    solutionsTitle: 'Des produits digitaux concus pour resoudre de vrais problemes metier.',
    solutionsDescription:
      'Nous partons de vos flux operationnels pour creer des systemes precis : utiles des le premier jour, evolutifs sur le long terme et suffisamment clairs pour etre adoptes par vos equipes.',
    solutionsItems:
      'Gestion commerciale|Ventes, stocks, facturation, clients, paiements et tableaux de bord operationnels.\nGestion scolaire et universitaire|Inscriptions, etudiants, notes, emplois du temps, absences et administration.\nApplication de reservation|Disponibilites, planning, paiement, notifications et gestion des demandes.\nPlateforme e-commerce|Catalogue, panier, paiement, promotions, stock et back-office de pilotage.\nBI et reporting|KPI, dashboards, visualisation de donnees et rapports de decision.\nCRM / ERP personnalise|Suivi commercial, workflow interne, automatisation et gestion multi-roles.\nApplication mobile metier|Outils mobiles pour equipes terrain, clients, agents et partenaires.\nChatbot intelligent|Support client, qualification de demandes et reponses connectees aux donnees internes.',
    processEyebrow: 'Processus',
    processTitle: 'Une methode structuree pour livrer sans improvisation.',
    processDescription:
      'Nous combinons cadrage produit, rigueur technique et cycles courts pour garder le projet lisible, maitrise et oriente resultat.',
    processItems:
      'Analyse du besoin|Audit, objectifs, utilisateurs, contraintes, priorites metier et perimetre fonctionnel.\nConception UI/UX|Parcours, maquettes, experience utilisateur, structure des ecrans et validation du concept.\nDeveloppement|Architecture, developpement frontend/backend, integrations et gestion des donnees.\nTest et validation|Tests fonctionnels, securite, performance, correction des anomalies et recette client.\nDeploiement|Mise en production, cloud, CI/CD, configuration, sauvegardes et monitoring.\nAmelioration continue|Maintenance, support, nouvelles fonctionnalites et optimisation selon les retours terrain.',
    pricingEyebrow: 'Offres',
    pricingTitle: 'Des packs simples pour cadrer rapidement votre projet.',
    pricingDescription:
      'Comme une vraie demarche produit, chaque offre clarifie le perimetre, les priorites et le niveau d accompagnement necessaire avant de passer au developpement.',
    pricingCta: 'Demander un devis',
    pricingEstimatorEyebrow: 'Simulation rapide',
    pricingEstimatorTitle: 'Estimez votre site ou systeme en quelques clics.',
    pricingEstimatorDescription:
      'Cette estimation donne une premiere fourchette indicative avec des prix raisonnables. Le devis final depend du perimetre exact, des integrations et des priorites.',
    pricingEstimatorCurrency: 'MAD',
    pricingEstimatorNote: 'Prix indicatifs et communicables selon le perimetre exact du projet.',
    pricingEstimatorScreenPrice: '200',
    pricingEstimatorItems:
      'Site vitrine|2500|Presence professionnelle, pages essentielles et formulaire.\nLanding page|1500|Page de conversion rapide pour une offre ou campagne.\nSysteme de gestion|9000|Back-office, roles, donnees et workflows metier.\nPlateforme e-commerce|8000|Catalogue, panier, paiement et gestion commerciale.\nApplication web|12000|Produit web sur mesure avec espace client/admin.\nApplication mobile|15000|Experience mobile Android/iOS connectee au backend.\nSolution IA / automatisation|6000|Chatbot, workflows automatises ou analyse de donnees.',
    pricingEstimatorOptions:
      'Espace admin|1800\nPaiement en ligne|1500\nAuthentification|1200\nAutomatisation / IA|2500\nTableaux de bord|1800\nMaintenance initiale|900',
    pricingEstimatorComplexities:
      'Simple|1|Structure claire, peu de regles metier.\nBusiness|1.35|Parcours avances, admin et integrations.\nSur mesure|1.85|Architecture specifique, logique metier complexe.',
    pricingEstimatorDelivery:
      'Flexible|1|Delai standard.\nPrioritaire|1.1|Priorite de production.\nUrgent|1.2|Organisation acceleree.',
    contactTitle: 'Donnez-nous le contexte, nous vous aidons a structurer la solution.',
    contactDescription:
      'Decrivez votre besoin, vos contraintes et vos objectifs. Nous vous repondons avec une premiere lecture technique claire et des prochaines etapes concretes.',
    contactHighlights:
      'Reponse structuree sous 24h ouvrees\nAnalyse initiale de votre besoin\nEstimation claire du perimetre et des priorites',
    footerDescription:
      'Agence technologique specialisee dans la conception et le developpement de solutions informatiques sur mesure, performantes et evolutives.',
    footerBottomText: 'Concu pour les entreprises ambitieuses.',
    formRecipientEmail: 'contact@techagency.ma',
    formSuccessMessage: 'Votre demande a ete envoyee avec succes.',
    linkedinUrl: '#accueil',
    twitterUrl: '#accueil',
    instagramUrl: '#accueil',
    githubUrl: '#accueil',
    footerQuickLinks:
      'Accueil|#accueil\nModeles|#modeles\nPortfolio|#portfolio\nServices|#services\nPour qui ?|#pour-qui\nSolutions|#solutions\nProcessus|#processus\nOffres|#offres\nContact|#contact',
    footerServices: 'Applications web\nMobile\nLogiciels sur mesure\nIA\nCloud & DevOps',
    projectTypes: 'Application web\nApplication mobile\nLogiciel sur mesure\nAutomatisation\nSolution IA\nCloud & DevOps',
  });
  const ActiveIcon = tabs.find((tab) => tab.id === activeTab)?.icon || LayoutDashboard;
  const selectedSection = sections.find((section) => section.id === selectedSectionId) || sections[0];
  const filteredLeads = (dashboardLeads.length > 0 ? dashboardLeads : leads).filter((lead) => leadFilter === 'all' || lead.status === leadFilter);
  const selectedLead = filteredLeads.find((lead) => lead.id === selectedLeadId) || filteredLeads[0];
  const newLeadCount = dashboardLeads.filter((lead) => lead.status === 'new').length;
  const activeLeadCount = dashboardLeads.filter((lead) => ['new', 'open', 'in_progress', 'pending'].includes(lead.status)).length;

  useEffect(() => {
    let cancelled = false;

    async function loadAdminConfig() {
      try {
        const healthResponse = await fetch(apiUrl('/api/health'), { credentials: 'include' });
        if (!healthResponse.ok) throw new Error(`API indisponible (${healthResponse.status})`);
        if (!cancelled) setApiStatus('API connectee');

        const authResponse = await adminFetch('/api/admin-me');
        const auth = await authResponse.json();
        if (cancelled) return;
        setAdminAuthenticated(Boolean(auth.authenticated));
        setAuthLoading(false);

        if (!auth.authenticated) {
          setDatabaseStatus('Connecte-toi pour charger MongoDB');
          return;
        }

        const response = await adminFetch('/api/admin-config');
        if (!response.ok) {
          if (response.status === 401) {
            setAdminAuthenticated(false);
            setDatabaseStatus('Connecte-toi pour charger MongoDB');
            throw new Error('Session admin expiree');
          }
          throw new Error(`API indisponible (${response.status})`);
        }
        const config = await response.json();
        if (cancelled) return;

        setSections(config.sections || initialSections);
        setOffers(config.offers || initialOffers);
        setProjects(config.projects || initialProjects);
        setSiteSettings((current) => ({ ...current, ...(config.settings || {}) }));
        setSelectedSectionId((config.sections || initialSections)[0]?.id || 0);
        const dashboard = await loadDashboardData();
        const leadsData = await loadLeadsData();
        if (cancelled) return;
        setDashboardStats({ ...initialDashboardStats, ...(dashboard.stats || {}) });
        setDashboardLeads(leadsData.leads || dashboard.leads || []);
        setSelectedLeadId((leadsData.leads || dashboard.leads || [])[0]?.id || '');
        setDatabaseStatus('MongoDB connecte');
      } catch (error) {
        if (cancelled) return;
        setApiStatus(`API non joignable: ${error.message}`);
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
    const response = await adminFetch('/api/admin-config');
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Session admin expiree. Reconnecte-toi.');
      }
      throw new Error(`API indisponible (${response.status})`);
    }
    const config = await response.json();
    setSections(config.sections || initialSections);
    setOffers(config.offers || initialOffers);
    setProjects(config.projects || initialProjects);
    setSiteSettings((current) => ({ ...current, ...(config.settings || {}) }));
    setSelectedSectionId((config.sections || initialSections)[0]?.id || 0);
    const dashboard = await loadDashboardData();
    const leadsData = await loadLeadsData();
    setDashboardStats({ ...initialDashboardStats, ...(dashboard.stats || {}) });
    setDashboardLeads(leadsData.leads || dashboard.leads || []);
    setSelectedLeadId((leadsData.leads || dashboard.leads || [])[0]?.id || '');
    setApiStatus('API connectee');
    setDatabaseStatus('MongoDB connecte');
  };

  const loginAdmin = async (event) => {
    event.preventDefault();
    setSavedMessage('');
    setLoginLoading(true);

    try {
      const response = await adminFetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Mot de passe incorrect');
      }

      const loginData = await response.json();
      setAdminToken(loginData.token);
      await loadConfigAfterLogin();
      setAdminAuthenticated(true);
      setAdminEmail('');
      setAdminPassword('');
      setShowAdminPassword(false);
      setSavedMessage('');
    } catch (error) {
      setSavedMessage(
        error.message === 'Failed to fetch'
          ? `Impossible de joindre l API (${getApiBaseUrl()}). Verifie VITE_API_URL, Render et CORS FRONTEND_URL.`
          : error.message,
      );
    } finally {
      setLoginLoading(false);
    }
  };

  const logoutAdmin = async () => {
    try {
      await adminFetch('/api/admin-logout', { method: 'POST' });
    } catch (error) {
      console.warn(error.message || 'Deconnexion admin incomplete.');
    } finally {
      setAdminToken('');
      setAdminAuthenticated(false);
      setAdminPassword('');
      setShowAdminPassword(false);
      setSavedMessage('');
      setDatabaseStatus('Connecte-toi pour charger MongoDB');
    }
  };

  const saveAdminState = async () => {
    setIsSaving(true);
    setSavedMessage('');

    try {
      const response = await adminFetch('/api/admin-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections, offers, projects, settings: siteSettings }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        const message = error.message || 'Erreur sauvegarde';
        const statusMessage =
          response.status === 401 ? 'Session admin expiree - reconnecte-toi' : `Erreur API (${response.status})`;
        throw new Error(`${statusMessage}: ${message}`);
      }

      setDatabaseStatus('MongoDB connecte');
      setSavedMessage('Modifications enregistrees dans MongoDB');
      const dashboard = await loadDashboardData();
      const leadsData = await loadLeadsData();
      setDashboardStats({ ...initialDashboardStats, ...(dashboard.stats || {}) });
      setDashboardLeads(leadsData.leads || dashboard.leads || []);
    } catch (error) {
      setSavedMessage(error.message);
      setDatabaseStatus(error.message.includes('Mongo') ? 'Erreur de connexion MongoDB' : 'API connectee - sauvegarde refusee');
    } finally {
      setIsSaving(false);
      window.setTimeout(() => setSavedMessage(''), 2600);
    }
  };

  const updateSetting = (key, value) => {
    setSiteSettings((current) => ({ ...current, [key]: value }));
  };

  const selectSectionByKeyword = (keyword) => {
    const normalizedKeyword = normalizeLabel(keyword);
    const match = sections.find((section) => {
      const title = normalizeLabel(section.title);
      const type = normalizeLabel(section.type);
      return title.includes(normalizedKeyword) || type.includes(normalizedKeyword);
    });
    if (match) setSelectedSectionId(match.id);
    return match;
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

  const moveSection = (id, direction) => {
    setSections((current) => {
      const index = current.findIndex((section) => section.id === id);
      const targetIndex = index + direction;
      if (index < 0 || targetIndex < 0 || targetIndex >= current.length) return current;

      const next = [...current];
      const [section] = next.splice(index, 1);
      next.splice(targetIndex, 0, section);
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

  const addQuickOffer = () => {
    const nextOffer = {
      id: Date.now(),
      name: 'Nouvelle offre',
      price: 'Sur devis',
      status: 'Publie',
      description: 'Description commerciale a personnaliser.',
      featuresText: 'Cadrage du besoin\nEstimation claire\nPlan d action priorise',
    };

    setOffers((current) => [...current, nextOffer]);
    setNewOfferName('');
    setActiveTab('offers');
    setSavedMessage('Nouvelle offre publiee en brouillon local. Clique Enregistrer pour la sauvegarder dans MongoDB.');
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

  const importProjectImage = async (id, file) => {
    if (!file) return;
    try {
      const image = await imageFileToDataUrl(file);
      updateProject(id, { image, imageName: file.name });
      setSavedMessage('Image importee. Clique Enregistrer pour la sauvegarder dans MongoDB.');
    } catch (error) {
      setSavedMessage(error.message);
    }
  };

  const importLogoImage = async (file) => {
    if (!file) return;
    try {
      const logoImage = await imageFileToDataUrl(file);
      updateSetting('logoImage', logoImage);
      updateSetting('logoFileName', file.name);
      setSavedMessage('Logo importe. Clique Enregistrer pour le sauvegarder dans MongoDB.');
    } catch (error) {
      setSavedMessage(error.message);
    }
  };

  const deleteProject = (id) => {
    setProjects((current) => current.filter((project) => project.id !== id));
  };

  const refreshLeads = async () => {
    const [dashboard, leadsData] = await Promise.all([loadDashboardData(), loadLeadsData()]);
    const nextLeads = leadsData.leads || dashboard.leads || [];
    setDashboardStats({ ...initialDashboardStats, ...(dashboard.stats || {}) });
    setDashboardLeads(nextLeads);
    setSelectedLeadId((current) => (nextLeads.some((lead) => lead.id === current) ? current : nextLeads[0]?.id || ''));
  };

  const updateLeadStatus = async (id, status) => {
    try {
      const response = await adminFetch(`/api/admin-leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Impossible de modifier le statut.');
      await refreshLeads();
      setSavedMessage('Statut de la demande mis a jour.');
    } catch (error) {
      setSavedMessage(error.message);
    }
  };

  const deleteLead = async (id) => {
    try {
      const response = await adminFetch(`/api/admin-leads/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Impossible de supprimer la demande.');
      await refreshLeads();
      setSavedMessage('Demande supprimee.');
    } catch (error) {
      setSavedMessage(error.message);
    }
  };

  const addQuickService = () => {
    const title = 'Nouveau service';
    const description = 'Description du service a personnaliser.';
    const servicesSection = selectSectionByKeyword('services');

    if (servicesSection) {
      setSections((current) =>
        current.map((section) =>
          section.id === servicesSection.id
            ? { ...section, blocks: [...(section.blocks || []), title] }
            : section,
        ),
      );
    }

    setSiteSettings((current) => {
      const existing = String(current.servicesItems || '').trim();
      const nextLine = `${title}|${description}`;
      return { ...current, servicesItems: existing ? `${existing}\n${nextLine}` : nextLine };
    });

    setActiveTab('content');
    setSavedMessage('Service ajoute. Modifie son nom/texte puis clique Enregistrer pour MongoDB.');
  };

  const editQuickModel = () => {
    const match = selectSectionByKeyword('modeles') || selectSectionByKeyword('modele');
    setActiveTab('content');
    setSavedMessage(
      match
        ? 'Section Modeles ouverte. Tu peux modifier les blocs, la visibilite et l ordre.'
        : 'Onglet Contenu ouvert. Ajoute ou selectionne une section Modeles.',
    );
  };

  const exportLeadsCsv = () => {
    const rows = dashboardLeads.length > 0 ? dashboardLeads : leads;
    if (!rows.length) {
      setSavedMessage('Aucune demande a exporter.');
      return;
    }

    const header = ['Nom', 'Email', 'Telephone', 'Type projet', 'Statut', 'Date', 'Message'];
    const lines = [
      header.map(csvCell).join(','),
      ...rows.map((lead) =>
        [
          lead.name,
          lead.email,
          lead.phone,
          lead.type,
          getStatusLabel(lead.status),
          lead.value || lead.createdAt,
          lead.message,
        ]
          .map(csvCell)
          .join(','),
      ),
    ];
    const blob = new Blob([`\ufeff${lines.join('\n')}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `techagency-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setSavedMessage('Export CSV des leads telecharge.');
  };

  const handleQuickAction = (action) => {
    if (action === 'service') addQuickService();
    if (action === 'model') editQuickModel();
    if (action === 'offer') addQuickOffer();
    if (action === 'export') exportLeadsCsv();
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
      <AdminLoginPage
        adminEmail={adminEmail}
        adminPassword={adminPassword}
        apiStatus={apiStatus}
        isSubmitting={loginLoading}
        loginAdmin={loginAdmin}
        savedMessage={savedMessage}
        setAdminEmail={setAdminEmail}
        setAdminPassword={setAdminPassword}
        setShowAdminPassword={setShowAdminPassword}
        showAdminPassword={showAdminPassword}
      />
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
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/" className="secondary-button">
                <PanelLeft size={17} />
                Retour au site
              </a>
              <button type="button" onClick={logoutAdmin} className="secondary-button border-red-200 text-red-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700">
                <LogOut size={17} />
                Deconnexion
              </button>
            </div>
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
                      ['Demandes', dashboardStats.requests, Users],
                      ['Devis ouverts', dashboardStats.openQuotes, BriefcaseBusiness],
                      ['Modeles actifs', dashboardStats.activeModels, Sparkles],
                      ['Taux reponse', dashboardStats.responseRate, Bell],
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
                        {(dashboardLeads.length > 0 ? dashboardLeads : leads).map((lead) => (
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
                        {[
                          { label: 'Ajouter un service', action: 'service' },
                          { label: 'Modifier un modele', action: 'model' },
                          { label: 'Publier une offre', action: 'offer' },
                          { label: 'Exporter les leads', action: 'export' },
                        ].map((item) => (
                          <button
                            key={item.action}
                            type="button"
                            onClick={() => handleQuickAction(item.action)}
                            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold transition hover:border-cyan hover:text-cyan"
                          >
                            {item.label}
                            <SlidersHorizontal size={17} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'leads' && (
                <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
                  <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-xl font-extrabold text-navy">Demandes clients</h3>
                        <p className="mt-1 text-sm font-semibold text-slate-500">Suivi des messages envoyes depuis le formulaire du site.</p>
                      </div>
                      <button type="button" onClick={refreshLeads} className="secondary-button">
                        <SlidersHorizontal size={17} />
                        Actualiser
                      </button>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {[
                        ['Total', dashboardStats.requests, Users],
                        ['Nouvelles', newLeadCount, Bell],
                        ['Actives', activeLeadCount, BriefcaseBusiness],
                      ].map(([label, value, Icon]) => (
                        <div key={label} className="rounded-lg border border-slate-200 bg-cloud p-4">
                          <Icon size={19} className="text-cyan" />
                          <p className="mt-3 text-2xl font-extrabold text-navy">{value}</p>
                          <p className="text-xs font-extrabold uppercase text-slate-500">{label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {[{ value: 'all', label: 'Toutes' }, ...leadStatuses].map((status) => (
                        <button
                          key={status.value}
                          type="button"
                          onClick={() => setLeadFilter(status.value)}
                          className={`rounded-md px-3 py-2 text-xs font-extrabold transition ${
                            leadFilter === status.value ? 'bg-navy text-white' : 'bg-cloud text-slate-600 hover:bg-cyan/10 hover:text-cyan'
                          }`}
                        >
                          {status.label}
                        </button>
                      ))}
                    </div>

                    <div className="mt-5 space-y-3">
                      {filteredLeads.map((lead) => (
                        <button
                          key={lead.id || lead.name}
                          type="button"
                          onClick={() => setSelectedLeadId(lead.id)}
                          className={`w-full rounded-lg border p-4 text-left transition ${
                            selectedLead?.id === lead.id ? 'border-cyan bg-navy text-white' : 'border-slate-200 bg-cloud text-navy hover:border-cyan'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="truncate font-extrabold">{lead.name}</p>
                              <p className={`mt-1 text-sm font-semibold ${selectedLead?.id === lead.id ? 'text-slate-300' : 'text-slate-500'}`}>
                                {lead.type}
                              </p>
                            </div>
                            <span className="rounded-md bg-cyan/10 px-3 py-1 text-xs font-extrabold text-cyan">
                              {getStatusLabel(lead.status)}
                            </span>
                          </div>
                          <div className={`mt-3 grid gap-2 text-xs font-semibold ${selectedLead?.id === lead.id ? 'text-slate-300' : 'text-slate-500'} sm:grid-cols-2`}>
                            <span className="flex items-center gap-2"><Mail size={14} />{lead.email || 'Email absent'}</span>
                            <span className="flex items-center gap-2"><CalendarDays size={14} />{lead.value || 'Date absente'}</span>
                          </div>
                        </button>
                      ))}
                      {filteredLeads.length === 0 && (
                        <div className="rounded-lg border border-dashed border-slate-300 bg-cloud p-6 text-center">
                          <p className="font-extrabold text-navy">Aucune demande pour ce filtre.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    {selectedLead ? (
                      <>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="eyebrow">Fiche demande</span>
                            <h3 className="mt-3 text-2xl font-extrabold text-navy">{selectedLead.name}</h3>
                            <p className="mt-2 text-sm font-semibold text-slate-500">{selectedLead.type}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => deleteLead(selectedLead.id)}
                            className="flex h-11 w-11 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
                            aria-label="Supprimer la demande"
                          >
                            <Trash2 size={19} />
                          </button>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          <a href={`mailto:${selectedLead.email}`} className="rounded-lg border border-slate-200 bg-cloud p-4 transition hover:border-cyan">
                            <Mail size={20} className="text-cyan" />
                            <p className="mt-3 text-xs font-extrabold uppercase text-slate-500">Email</p>
                            <p className="mt-1 break-all text-sm font-bold text-navy">{selectedLead.email || 'Non renseigne'}</p>
                          </a>
                          <a href={selectedLead.phone ? `tel:${selectedLead.phone}` : undefined} className="rounded-lg border border-slate-200 bg-cloud p-4 transition hover:border-cyan">
                            <Phone size={20} className="text-cyan" />
                            <p className="mt-3 text-xs font-extrabold uppercase text-slate-500">Telephone</p>
                            <p className="mt-1 text-sm font-bold text-navy">{selectedLead.phone || 'Non renseigne'}</p>
                          </a>
                        </div>

                        <label className="mt-5 block">
                          <span className="text-xs font-extrabold uppercase text-slate-500">Statut de traitement</span>
                          <select
                            value={selectedLead.status || 'new'}
                            onChange={(event) => updateLeadStatus(selectedLead.id, event.target.value)}
                            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10"
                          >
                            {leadStatuses.map((status) => (
                              <option key={status.value} value={status.value}>{status.label}</option>
                            ))}
                          </select>
                        </label>

                        <div className="mt-5 rounded-lg border border-slate-200 bg-cloud p-5">
                          <div className="flex items-center gap-3">
                            <MessageSquareText size={21} className="text-cyan" />
                            <h4 className="font-extrabold text-navy">Message client</h4>
                          </div>
                          <p className="mt-4 whitespace-pre-wrap text-sm font-semibold leading-7 text-slate-700">
                            {selectedLead.message || 'Aucun message detaille.'}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="flex min-h-[360px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-cloud p-6 text-center">
                        <div>
                          <UserRound size={34} className="mx-auto text-cyan" />
                          <p className="mt-4 font-extrabold text-navy">Selectionne une demande.</p>
                        </div>
                      </div>
                    )}
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
                            <p className="mt-1 text-sm font-semibold text-slate-500">
                              L'ordre et la visibilite pilotent le site public et la navbar.
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => moveSection(selectedSection.id, -1)}
                              className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-navy transition hover:border-cyan hover:text-cyan"
                              aria-label="Monter la section"
                            >
                              <ChevronUp size={20} />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveSection(selectedSection.id, 1)}
                              className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-navy transition hover:border-cyan hover:text-cyan"
                              aria-label="Descendre la section"
                            >
                              <ChevronDown size={20} />
                            </button>
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
                            Ces modifications sont persistantes apres Enregistrer: le contenu est stocke dans MongoDB et
                            recharge par le site public.
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
                            <EditableTextarea
                              label="Description"
                              value={offer.description || ''}
                              onChange={(value) => updateOffer(offer.id, { description: value })}
                              rows={3}
                            />
                            <EditableTextarea
                              label="Fonctionnalites - une ligne par point"
                              value={offer.featuresText || (Array.isArray(offer.features) ? offer.features.join('\n') : '')}
                              onChange={(value) => updateOffer(offer.id, { featuresText: value })}
                              rows={5}
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
                        </div>

                        <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
                          <div className="grid gap-4 md:grid-cols-[10rem_1fr] md:items-center">
                            <div className="overflow-hidden rounded-lg border border-slate-200 bg-cloud">
                              {project.image ? (
                                <img src={project.image} alt={project.title} className="h-28 w-full object-cover" />
                              ) : (
                                <div className="flex h-28 items-center justify-center text-xs font-extrabold uppercase text-slate-400">
                                  Aucune image
                                </div>
                              )}
                            </div>
                            <div>
                              <span className="text-xs font-extrabold uppercase text-slate-500">Image du projet</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => importProjectImage(project.id, event.target.files?.[0])}
                                className="mt-2 block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy file:mr-4 file:rounded-md file:border-0 file:bg-cyan/10 file:px-3 file:py-2 file:text-xs file:font-extrabold file:text-cyan"
                              />
                              <p className="mt-2 text-xs font-semibold text-slate-500">
                                L'image est optimisee puis stockee dans MongoDB apres Enregistrer.
                              </p>
                              <EditableInput
                                label="URL image optionnelle"
                                value={project.image?.startsWith('data:') ? project.imageName || 'Image importee dans MongoDB' : project.image || ''}
                                onChange={(value) => updateProject(project.id, { image: value, imageName: '' })}
                              />
                            </div>
                          </div>
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
                    <LogoMark src={siteSettings.logoImage} className="h-20 w-20 rounded-lg shadow-sm" />
                    <h3 className="mt-5 text-xl font-extrabold text-navy">Logo TechAgency</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      Le logo est sauvegarde dans MongoDB et utilise automatiquement sur le site public.
                    </p>
                    <label className="mt-5 block">
                      <span className="text-xs font-extrabold uppercase text-slate-500">Importer un nouveau logo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => importLogoImage(event.target.files?.[0])}
                        className="mt-2 block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy file:mr-4 file:rounded-md file:border-0 file:bg-cyan/10 file:px-3 file:py-2 file:text-xs file:font-extrabold file:text-cyan"
                      />
                    </label>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <a
                        href={siteSettings.logoImage || '/techagency-logo.svg'}
                        download={siteSettings.logoFileName || 'techagency-logo.svg'}
                        className="primary-button"
                      >
                        <Download size={17} />
                        Telecharger
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          updateSetting('logoImage', '');
                          updateSetting('logoFileName', 'techagency-logo.svg');
                        }}
                        className="secondary-button"
                      >
                        Logo par defaut
                      </button>
                    </div>
                    <EditableInput
                      label="Nom du fichier logo"
                      value={siteSettings.logoFileName || ''}
                      onChange={(value) => updateSetting('logoFileName', value)}
                    />
                    <EditableInput
                      label="URL logo optionnelle"
                      value={siteSettings.logoImage?.startsWith('data:') ? 'Logo importe dans MongoDB' : siteSettings.logoImage || ''}
                      onChange={(value) => updateSetting('logoImage', value)}
                    />
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
                      <EditableInput
                        label="Modeles actifs dashboard"
                        value={siteSettings.dashboardModelsActive || ''}
                        onChange={(value) => updateSetting('dashboardModelsActive', value)}
                      />
                      <EditableInput
                        label="Taux reponse dashboard"
                        value={siteSettings.dashboardResponseRate || ''}
                        onChange={(value) => updateSetting('dashboardResponseRate', value)}
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
                        label="Badge Services"
                        value={siteSettings.servicesEyebrow}
                        onChange={(value) => updateSetting('servicesEyebrow', value)}
                      />
                      <EditableTextarea
                        label="Titre Services"
                        value={siteSettings.servicesTitle}
                        onChange={(value) => updateSetting('servicesTitle', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Description Services"
                        value={siteSettings.servicesDescription}
                        onChange={(value) => updateSetting('servicesDescription', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Cartes Services - format Titre|Description"
                        value={siteSettings.servicesItems}
                        onChange={(value) => updateSetting('servicesItems', value)}
                        rows={8}
                      />
                      <EditableTextarea
                        label="Preuves Services - une ligne par point"
                        value={siteSettings.servicesProofPoints}
                        onChange={(value) => updateSetting('servicesProofPoints', value)}
                        rows={4}
                      />
                      <EditableInput
                        label="Badge Solutions"
                        value={siteSettings.solutionsEyebrow}
                        onChange={(value) => updateSetting('solutionsEyebrow', value)}
                      />
                      <EditableTextarea
                        label="Titre Solutions"
                        value={siteSettings.solutionsTitle}
                        onChange={(value) => updateSetting('solutionsTitle', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Description Solutions"
                        value={siteSettings.solutionsDescription}
                        onChange={(value) => updateSetting('solutionsDescription', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Cartes Solutions - format Titre|Description"
                        value={siteSettings.solutionsItems}
                        onChange={(value) => updateSetting('solutionsItems', value)}
                        rows={8}
                      />
                      <EditableInput
                        label="Badge Processus"
                        value={siteSettings.processEyebrow}
                        onChange={(value) => updateSetting('processEyebrow', value)}
                      />
                      <EditableTextarea
                        label="Titre Processus"
                        value={siteSettings.processTitle}
                        onChange={(value) => updateSetting('processTitle', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Description Processus"
                        value={siteSettings.processDescription}
                        onChange={(value) => updateSetting('processDescription', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Etapes Processus - format Titre|Description"
                        value={siteSettings.processItems || ''}
                        onChange={(value) => updateSetting('processItems', value)}
                        rows={7}
                      />
                      <EditableTextarea
                        label="Liens navigation - format Label|#ancre"
                        value={siteSettings.navLinks || siteSettings.footerQuickLinks || ''}
                        onChange={(value) => updateSetting('navLinks', value)}
                        rows={6}
                      />
                      <EditableInput
                        label="Badge Pour qui"
                        value={siteSettings.audiencesEyebrow || ''}
                        onChange={(value) => updateSetting('audiencesEyebrow', value)}
                      />
                      <EditableTextarea
                        label="Titre Pour qui"
                        value={siteSettings.audiencesTitle || ''}
                        onChange={(value) => updateSetting('audiencesTitle', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Description Pour qui"
                        value={siteSettings.audiencesDescription || ''}
                        onChange={(value) => updateSetting('audiencesDescription', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Audiences - format Nom|URL image optionnelle"
                        value={siteSettings.audiencesItems || ''}
                        onChange={(value) => updateSetting('audiencesItems', value)}
                        rows={6}
                      />
                      <EditableInput
                        label="Texte cartes mobile Pour qui"
                        value={siteSettings.audiencesCardText || ''}
                        onChange={(value) => updateSetting('audiencesCardText', value)}
                      />
                      <EditableInput
                        label="Phrase finale Pour qui"
                        value={siteSettings.audiencesBottomText || ''}
                        onChange={(value) => updateSetting('audiencesBottomText', value)}
                      />
                      <EditableInput
                        label="Badge Technologies"
                        value={siteSettings.technologiesEyebrow || ''}
                        onChange={(value) => updateSetting('technologiesEyebrow', value)}
                      />
                      <EditableTextarea
                        label="Titre Technologies"
                        value={siteSettings.technologiesTitle || ''}
                        onChange={(value) => updateSetting('technologiesTitle', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Description Technologies"
                        value={siteSettings.technologiesDescription || ''}
                        onChange={(value) => updateSetting('technologiesDescription', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Groupes technologies - format Groupe|Item, Item"
                        value={siteSettings.technologiesGroups || ''}
                        onChange={(value) => updateSetting('technologiesGroups', value)}
                        rows={5}
                      />
                      <EditableInput
                        label="Badge A propos"
                        value={siteSettings.aboutEyebrow || ''}
                        onChange={(value) => updateSetting('aboutEyebrow', value)}
                      />
                      <EditableTextarea
                        label="Titre A propos"
                        value={siteSettings.aboutTitle || ''}
                        onChange={(value) => updateSetting('aboutTitle', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Description A propos"
                        value={siteSettings.aboutDescription || ''}
                        onChange={(value) => updateSetting('aboutDescription', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Texte secondaire A propos"
                        value={siteSettings.aboutSecondaryText || ''}
                        onChange={(value) => updateSetting('aboutSecondaryText', value)}
                        rows={3}
                      />
                      <EditableInput
                        label="Image A propos"
                        value={siteSettings.aboutImage || ''}
                        onChange={(value) => updateSetting('aboutImage', value)}
                      />
                      <EditableTextarea
                        label="Statistiques A propos - format Valeur|Texte"
                        value={siteSettings.aboutStats || ''}
                        onChange={(value) => updateSetting('aboutStats', value)}
                        rows={4}
                      />
                      <EditableInput
                        label="Badge Pourquoi nous choisir"
                        value={siteSettings.chooseEyebrow || ''}
                        onChange={(value) => updateSetting('chooseEyebrow', value)}
                      />
                      <EditableTextarea
                        label="Titre Pourquoi nous choisir"
                        value={siteSettings.chooseTitle || ''}
                        onChange={(value) => updateSetting('chooseTitle', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Description Pourquoi nous choisir"
                        value={siteSettings.chooseDescription || ''}
                        onChange={(value) => updateSetting('chooseDescription', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Avantages - une ligne par avantage"
                        value={siteSettings.chooseItems || ''}
                        onChange={(value) => updateSetting('chooseItems', value)}
                        rows={7}
                      />
                      <EditableInput
                        label="Badge Temoignages"
                        value={siteSettings.testimonialsEyebrow || ''}
                        onChange={(value) => updateSetting('testimonialsEyebrow', value)}
                      />
                      <EditableTextarea
                        label="Titre Temoignages"
                        value={siteSettings.testimonialsTitle || ''}
                        onChange={(value) => updateSetting('testimonialsTitle', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Description Temoignages"
                        value={siteSettings.testimonialsDescription || ''}
                        onChange={(value) => updateSetting('testimonialsDescription', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Avis - format Nom|Role|Societe|Texte"
                        value={siteSettings.testimonialsItems || ''}
                        onChange={(value) => updateSetting('testimonialsItems', value)}
                        rows={6}
                      />
                      <EditableInput
                        label="Badge avis"
                        value={siteSettings.testimonialsBadge || ''}
                        onChange={(value) => updateSetting('testimonialsBadge', value)}
                      />
                      <EditableInput
                        label="Badge Offres"
                        value={siteSettings.pricingEyebrow || ''}
                        onChange={(value) => updateSetting('pricingEyebrow', value)}
                      />
                      <EditableTextarea
                        label="Titre Offres"
                        value={siteSettings.pricingTitle || ''}
                        onChange={(value) => updateSetting('pricingTitle', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Description Offres"
                        value={siteSettings.pricingDescription || ''}
                        onChange={(value) => updateSetting('pricingDescription', value)}
                        rows={3}
                      />
                      <EditableInput
                        label="CTA Offres"
                        value={siteSettings.pricingCta || ''}
                        onChange={(value) => updateSetting('pricingCta', value)}
                      />
                      <EditableInput
                        label="Badge simulateur prix"
                        value={siteSettings.pricingEstimatorEyebrow || ''}
                        onChange={(value) => updateSetting('pricingEstimatorEyebrow', value)}
                      />
                      <EditableTextarea
                        label="Titre simulateur prix"
                        value={siteSettings.pricingEstimatorTitle || ''}
                        onChange={(value) => updateSetting('pricingEstimatorTitle', value)}
                        rows={3}
                      />
                      <EditableTextarea
                        label="Description simulateur prix"
                        value={siteSettings.pricingEstimatorDescription || ''}
                        onChange={(value) => updateSetting('pricingEstimatorDescription', value)}
                        rows={3}
                      />
                      <EditableInput
                        label="Devise simulateur"
                        value={siteSettings.pricingEstimatorCurrency || ''}
                        onChange={(value) => updateSetting('pricingEstimatorCurrency', value)}
                      />
                      <EditableInput
                        label="Prix par page / ecran"
                        value={siteSettings.pricingEstimatorScreenPrice || ''}
                        onChange={(value) => updateSetting('pricingEstimatorScreenPrice', value)}
                      />
                      <EditableInput
                        label="Note prix communicables"
                        value={siteSettings.pricingEstimatorNote || ''}
                        onChange={(value) => updateSetting('pricingEstimatorNote', value)}
                      />
                      <EditableTextarea
                        label="Prix de base simulateur - format Type|Prix|Description"
                        value={siteSettings.pricingEstimatorItems || ''}
                        onChange={(value) => updateSetting('pricingEstimatorItems', value)}
                        rows={7}
                      />
                      <EditableTextarea
                        label="Options simulateur - format Option|Prix"
                        value={siteSettings.pricingEstimatorOptions || ''}
                        onChange={(value) => updateSetting('pricingEstimatorOptions', value)}
                        rows={6}
                      />
                      <EditableTextarea
                        label="Complexite simulateur - format Nom|Multiplicateur|Note"
                        value={siteSettings.pricingEstimatorComplexities || ''}
                        onChange={(value) => updateSetting('pricingEstimatorComplexities', value)}
                        rows={4}
                      />
                      <EditableTextarea
                        label="Delais simulateur - format Nom|Multiplicateur|Note"
                        value={siteSettings.pricingEstimatorDelivery || ''}
                        onChange={(value) => updateSetting('pricingEstimatorDelivery', value)}
                        rows={4}
                      />
                      <EditableInput
                        label="Email contact"
                        value={siteSettings.email}
                        onChange={(value) => updateSetting('email', value)}
                      />
                      <EditableInput
                        label="Email destinataire du formulaire"
                        value={siteSettings.formRecipientEmail}
                        onChange={(value) => updateSetting('formRecipientEmail', value)}
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
                      <EditableInput
                        label="Message succes formulaire"
                        value={siteSettings.formSuccessMessage}
                        onChange={(value) => updateSetting('formSuccessMessage', value)}
                      />
                      <EditableTextarea
                        label="Types de projets - une ligne par option"
                        value={siteSettings.projectTypes}
                        onChange={(value) => updateSetting('projectTypes', value)}
                        rows={5}
                      />
                      <EditableTextarea
                        label="Liens rapides footer - format Label|#lien"
                        value={siteSettings.footerQuickLinks}
                        onChange={(value) => updateSetting('footerQuickLinks', value)}
                        rows={6}
                      />
                      <EditableTextarea
                        label="Services footer - une ligne par service"
                        value={siteSettings.footerServices}
                        onChange={(value) => updateSetting('footerServices', value)}
                        rows={5}
                      />
                      <EditableInput
                        label="Texte bas footer"
                        value={siteSettings.footerBottomText}
                        onChange={(value) => updateSetting('footerBottomText', value)}
                      />
                      <EditableInput
                        label="LinkedIn URL"
                        value={siteSettings.linkedinUrl}
                        onChange={(value) => updateSetting('linkedinUrl', value)}
                      />
                      <EditableInput
                        label="Twitter/X URL"
                        value={siteSettings.twitterUrl}
                        onChange={(value) => updateSetting('twitterUrl', value)}
                      />
                      <EditableInput
                        label="Instagram URL"
                        value={siteSettings.instagramUrl}
                        onChange={(value) => updateSetting('instagramUrl', value)}
                      />
                      <EditableInput
                        label="GitHub URL"
                        value={siteSettings.githubUrl}
                        onChange={(value) => updateSetting('githubUrl', value)}
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
