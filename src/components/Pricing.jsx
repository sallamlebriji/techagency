import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const packs = [
  {
    label: 'Essentiel pour démarrer',
    name: 'Pack Digital',
    price: 'Sur devis',
    description: 'Idéal pour lancer une présence digitale professionnelle ou un premier produit métier.',
    features: ['Site vitrine ou landing premium', 'Design responsive', 'Formulaire & contact', 'SEO technique de base', 'Mise en ligne sécurisée'],
  },
  {
    label: 'Le plus demandé',
    name: 'Pack Business System',
    price: 'Sur devis',
    popular: true,
    description: 'Pour créer une plateforme web ou un système de gestion complet et évolutif.',
    features: ['Application web sur mesure', 'Espace admin', 'Base de données', 'Automatisation métier', 'Cloud, sauvegarde & support'],
  },
  {
    label: 'Projet spécifique',
    name: 'Pack Sur Mesure',
    price: 'Audit gratuit',
    description: 'Pour les besoins avancés : IA, mobile, ERP/CRM, intégrations complexes ou refonte complète.',
    features: ['Cadrage fonctionnel', 'Architecture personnalisée', 'IA & intégrations API', 'Roadmap produit', 'Accompagnement continu'],
  },
];

function normalizeOffer(offer, index) {
  return {
    label: offer.status || `Offre ${index + 1}`,
    name: offer.name,
    price: offer.price,
    popular: String(offer.status || '').toLowerCase().includes('populaire'),
    description: offer.description || 'Offre configurable depuis l espace admin.',
    features: Array.isArray(offer.features)
      ? offer.features
      : ['Perimetre configurable', 'Accompagnement TechAgency', 'Mise en ligne securisee'],
  };
}

function Pricing({ offers }) {
  const displayedPacks = Array.isArray(offers) && offers.length > 0 ? offers.map(normalizeOffer) : packs;

  return (
    <section id="offres" className="section-padding scroll-mt-24 bg-cloud">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <span className="eyebrow">Offres</span>
            <h2 className="section-title">Des packs simples pour cadrer rapidement votre projet.</h2>
          </div>
          <p className="text-base leading-8 text-slate-600 sm:text-lg">
            Comme une vraie démarche produit, chaque offre clarifie le périmètre, les priorités et le niveau
            d’accompagnement nécessaire avant de passer au développement.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {displayedPacks.map((pack, index) => (
            <motion.article
              key={pack.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className={`relative overflow-hidden rounded-lg border p-6 transition duration-300 hover:-translate-y-1 ${
                pack.popular ? 'border-cyan bg-navy text-white shadow-premium' : 'border-slate-200 bg-white text-navy shadow-sm hover:shadow-premium'
              }`}
            >
              <div className={`absolute inset-x-0 top-0 h-1 ${pack.popular ? 'bg-cyan' : 'bg-slate-100'}`} />
              {pack.popular && (
                <span className="absolute right-5 top-5 rounded-md bg-cyan px-3 py-1 text-xs font-extrabold text-navy">
                  Populaire
                </span>
              )}
              <p className={`text-sm font-extrabold ${pack.popular ? 'text-cyan' : 'text-cyan'}`}>{pack.label}</p>
              <h3 className="mt-3 font-display text-2xl font-bold">{pack.name}</h3>
              <p className={`mt-4 text-3xl font-extrabold ${pack.popular ? 'text-white' : 'text-navy'}`}>{pack.price}</p>
              <p className={`mt-4 text-sm leading-7 ${pack.popular ? 'text-slate-300' : 'text-slate-600'}`}>
                {pack.description}
              </p>

              <div className="mt-6 space-y-3">
                {pack.features.map((feature) => (
                  <div key={feature} className={`flex items-start gap-3 text-sm font-bold ${pack.popular ? 'text-slate-200' : 'text-slate-700'}`}>
                    <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-cyan" />
                    {feature}
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className={`mt-7 inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-extrabold transition hover:-translate-y-1 ${
                  pack.popular ? 'bg-cyan text-navy hover:bg-white' : 'bg-navy text-white hover:bg-cyan hover:text-navy'
                }`}
              >
                Demander un devis
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
