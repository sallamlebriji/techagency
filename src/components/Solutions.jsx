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

const solutions = [
  {
    title: 'Gestion commerciale',
    description: 'Ventes, stocks, facturation, clients, paiements et tableaux de bord opérationnels.',
    icon: PackageCheck,
  },
  {
    title: 'Gestion scolaire et universitaire',
    description: 'Inscriptions, étudiants, notes, emplois du temps, absences et administration.',
    icon: GraduationCap,
  },
  {
    title: 'Application de réservation',
    description: 'Disponibilités, planning, paiement, notifications et gestion des demandes.',
    icon: CalendarCheck,
  },
  {
    title: 'Plateforme e-commerce',
    description: 'Catalogue, panier, paiement, promotions, stock et back-office de pilotage.',
    icon: ShoppingCart,
  },
  {
    title: 'BI et reporting',
    description: 'KPI, dashboards, visualisation de données et rapports de décision.',
    icon: BarChart3,
  },
  {
    title: 'CRM / ERP personnalisé',
    description: 'Suivi commercial, workflow interne, automatisation et gestion multi-rôles.',
    icon: LineChart,
  },
  {
    title: 'Application mobile métier',
    description: 'Outils mobiles pour équipes terrain, clients, agents et partenaires.',
    icon: Smartphone,
  },
  {
    title: 'Chatbot intelligent',
    description: 'Support client, qualification de demandes et réponses connectées aux données internes.',
    icon: Bot,
  },
];

function Solutions() {
  return (
    <section id="solutions" className="section-padding scroll-mt-24 bg-cloud">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <span className="eyebrow">Solutions</span>
            <h2 className="section-title">Des produits digitaux conçus pour résoudre de vrais problèmes métier.</h2>
          </div>
          <p className="text-base leading-8 text-slate-600 sm:text-lg">
            Nous partons de vos flux opérationnels pour créer des systèmes précis : utiles dès le premier jour,
            évolutifs sur le long terme et suffisamment clairs pour être adoptés par vos équipes.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.article
                key={solution.title}
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
