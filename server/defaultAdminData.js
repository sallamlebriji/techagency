export const defaultAdminConfig = {
  sections: [
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
  ],
  offers: [
    { id: 1, name: 'Pack Digital', price: 'Sur devis', status: 'Actif' },
    { id: 2, name: 'Pack Business System', price: 'Sur devis', status: 'Populaire' },
    { id: 3, name: 'Pack Sur Mesure', price: 'Audit gratuit', status: 'Actif' },
  ],
  projects: [
    {
      id: 1,
      title: 'Site vitrine Gym Ten Chi',
      description: 'Site moderne pour une salle de sport avec presentation des offres et parcours de conversion.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
      technologies: 'React, Vercel, Responsive',
      url: 'https://gym-ten-chi.vercel.app/',
      visible: true,
    },
  ],
  settings: {
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
    navLinks:
      'Accueil|#accueil\nModeles|#modeles\nPortfolio|#portfolio\nServices|#services\nPour qui ?|#pour-qui\nSolutions|#solutions\nProcessus|#processus\nOffres|#offres\nContact|#contact',
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
    audiencesEyebrow: 'Pour qui ?',
    audiencesTitle: 'TechAgency accompagne les organisations qui veulent passer a un niveau superieur.',
    audiencesDescription:
      'Entreprises, etablissements, startups et services : nous transformons votre expertise metier en plateformes claires, modernes et performantes.',
    audiencesItems:
      'PME / TPE\nStartups\nEcoles\nCommerce\nCabinets\nServices',
    audiencesCardText: 'Solution digitale adaptee a votre activite.',
    audiencesBottomText: 'A vous l expertise, a nous la digitalisation.',
    technologiesEyebrow: 'Technologies',
    technologiesTitle: 'Un stack moderne, choisi pour la performance et la perennite.',
    technologiesDescription:
      'Nous privilegions les outils robustes, largement adoptes et adaptes a votre contexte : securite, budget, delais, integrations et maintenance.',
    technologiesGroups:
      'Frontend & experience|React, Tailwind CSS, Interfaces responsive, Design systems\nBackend & API|Node.js, Express, Laravel, Django / FastAPI\nData & infrastructure|MySQL, PostgreSQL, MongoDB, Docker, AWS / Cloud\nIA & automatisation|Python, Machine Learning, Chatbots IA, Workflows automatises',
    aboutEyebrow: 'A propos',
    aboutTitle: 'Une agence technologique pour transformer les idees en systemes solides.',
    aboutDescription:
      'TechAgency concoit et developpe des solutions informatiques sur mesure pour les entreprises, etablissements et startups qui veulent moderniser leurs operations.',
    aboutSecondaryText:
      'Notre approche reunit conseil, experience utilisateur, architecture logicielle et accompagnement technique.',
    aboutImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1100&q=85',
    aboutImageAlt: 'Equipe technologique en atelier de conception',
    aboutStats: '+50|projets realises\n+20|clients accompagnes\n+5|annees d experience\n24/7|support technique continu',
    chooseEyebrow: 'Pourquoi nous choisir',
    chooseTitle: 'Le niveau d exigence d une equipe produit, la proximite d un partenaire agile.',
    chooseDescription:
      'Nous concevons des solutions qui restent propres apres la livraison : documentation, structure, securite, maintenabilite et support font partie de la prestation.',
    chooseItems:
      'Solutions sur mesure\nDesign moderne\nSecurite renforcee\nCode propre et maintenable\nAccompagnement complet\nLivraison rapide\nSupport apres livraison',
    testimonialsEyebrow: 'Temoignages',
    testimonialsTitle: 'Des clients qui choisissent la clarte, la vitesse et la qualite.',
    testimonialsDescription:
      'Nous privilegions une relation transparente : des decisions expliquees, des livrables visibles et un accompagnement serieux apres mise en production.',
    testimonialsBadge: 'Client verifie',
    testimonialsItems:
      'Amine El Fassi|Directeur general|Atlas Retail|TechAgency a transforme notre gestion commerciale avec une plateforme claire, rapide et parfaitement adaptee a nos equipes.\nSara Benali|Responsable operations|MedBooking|L accompagnement a ete tres professionnel, de la conception UI/UX au deploiement.\nYoussef Rahmani|Fondateur|SmartSupport AI|Ils ont livre un chatbot IA connecte a nos donnees internes avec une excellente qualite technique.',
    pricingEyebrow: 'Offres',
    pricingTitle: 'Des packs simples pour cadrer rapidement votre projet.',
    pricingDescription:
      'Comme une vraie demarche produit, chaque offre clarifie le perimetre, les priorites et le niveau d accompagnement necessaire avant de passer au developpement.',
    pricingCta: 'Demander un devis',
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
  },
};
