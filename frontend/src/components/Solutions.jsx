import { motion } from 'framer-motion';
import {
  BarChart3,
  Bot,
  CalendarCheck,
  GraduationCap,
  LineChart,
  PackageCheck,
  ShoppingCart,
  Smartphone,
} from 'lucide-react';

const defaultSolutions = [
  {
    title: 'Gestion commerciale',
    description: 'Ventes, stocks, facturation, clients, paiements et tableaux de bord operationnels.',
    icon: PackageCheck,
  },
  {
    title: 'Gestion scolaire et universitaire',
    description: 'Inscriptions, etudiants, notes, emplois du temps, absences et administration.',
    icon: GraduationCap,
  },
  {
    title: 'Application de reservation',
    description: 'Disponibilites, planning, paiement, notifications et gestion des demandes.',
    icon: CalendarCheck,
  },
  {
    title: 'Plateforme e-commerce',
    description: 'Catalogue, panier, paiement, promotions, stock et back-office de pilotage.',
    icon: ShoppingCart,
  },
  {
    title: 'BI et reporting',
    description: 'KPI, dashboards, visualisation de donnees et rapports de decision.',
    icon: BarChart3,
  },
  {
    title: 'CRM / ERP personnalise',
    description: 'Suivi commercial, workflow interne, automatisation et gestion multi-roles.',
    icon: LineChart,
  },
  {
    title: 'Application mobile metier',
    description: 'Outils mobiles pour equipes terrain, clients, agents et partenaires.',
    icon: Smartphone,
  },
  {
    title: 'Chatbot intelligent',
    description: 'Support client, qualification de demandes et reponses connectees aux donnees internes.',
    icon: Bot,
  },
];

function parseItems(value, fallback) {
  const lines = String(value || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

  if (lines.length === 0) return fallback;

  return lines.map((line) => {
    const [title, ...descriptionParts] = line.split('|').map((part) => part.trim());
    return {
      title,
      description: descriptionParts.join(' | ') || 'Description a modifier depuis l espace admin.',
    };
  });
}

function Solutions({ settings = {} }) {
  const solutions = parseItems(settings.solutionsItems, defaultSolutions);

  return (
    <section id="solutions" className="section-padding scroll-mt-24 bg-cloud">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <span className="eyebrow">{settings.solutionsEyebrow || 'Solutions'}</span>
            <h2 className="section-title">
              {settings.solutionsTitle || 'Des produits digitaux concus pour resoudre de vrais problemes metier.'}
            </h2>
          </div>
          <p className="text-base leading-8 text-slate-600 sm:text-lg">
            {settings.solutionsDescription ||
              'Nous partons de vos flux operationnels pour creer des systemes precis : utiles des le premier jour, evolutifs sur le long terme et suffisamment clairs pour etre adoptes par vos equipes.'}
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution, index) => {
            const Icon = solution.icon || defaultSolutions[index % defaultSolutions.length]?.icon || PackageCheck;
            return (
              <motion.article
                key={`${solution.title}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="premium-card group p-5"
              >
                <div className="flex items-center justify-between">
                  <Icon size={26} className="text-cyan" />
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-extrabold text-slate-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-extrabold text-navy">{solution.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{solution.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Solutions;
