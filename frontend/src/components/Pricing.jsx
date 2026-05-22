import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle2, MousePointerClick, Sparkles } from 'lucide-react';

const packs = [
  {
    label: 'Essentiel pour demarrer',
    name: 'Pack Digital',
    price: 'Sur devis',
    description: 'Ideal pour lancer une presence digitale professionnelle ou un premier produit metier.',
    features: ['Site vitrine ou landing premium', 'Design responsive', 'Formulaire & contact', 'SEO technique de base', 'Mise en ligne securisee'],
  },
  {
    label: 'Le plus demande',
    name: 'Pack Business System',
    price: 'Sur devis',
    popular: true,
    description: 'Pour creer une plateforme web ou un systeme de gestion complet et evolutif.',
    features: ['Application web sur mesure', 'Espace admin', 'Base de donnees', 'Automatisation metier', 'Cloud, sauvegarde & support'],
  },
  {
    label: 'Projet specifique',
    name: 'Pack Sur Mesure',
    price: 'Audit gratuit',
    description: 'Pour les besoins avances : IA, mobile, ERP/CRM, integrations complexes ou refonte complete.',
    features: ['Cadrage fonctionnel', 'Architecture personnalisee', 'IA & integrations API', 'Roadmap produit', 'Accompagnement continu'],
  },
];

function normalizeOffer(offer, index) {
  const featureLines = String(offer.featuresText || '').split('\n').map((item) => item.trim()).filter(Boolean);
  return {
    label: offer.status || `Offre ${index + 1}`,
    name: offer.name,
    price: offer.price,
    popular: String(offer.status || '').toLowerCase().includes('populaire'),
    description: offer.description || 'Offre configurable depuis l espace admin.',
    features: Array.isArray(offer.features) ? offer.features : featureLines.length > 0 ? featureLines : ['Perimetre configurable', 'Accompagnement TechAgency', 'Mise en ligne securisee'],
  };
}

const defaultEstimatorItems = [
  ['Site vitrine', 2500, 'Presence professionnelle, pages essentielles et formulaire.'],
  ['Landing page', 1500, 'Page de conversion rapide pour une offre ou campagne.'],
  ['Systeme de gestion', 9000, 'Back-office, roles, donnees et workflows metier.'],
  ['Plateforme e-commerce', 8000, 'Catalogue, panier, paiement et gestion commerciale.'],
  ['Application web', 12000, 'Produit web sur mesure avec espace client/admin.'],
  ['Application mobile', 15000, 'Experience mobile Android/iOS connectee au backend.'],
  ['Solution IA / automatisation', 6000, 'Chatbot, workflows automatises ou analyse de donnees.'],
].map(([name, basePrice, description]) => ({ name, basePrice, description }));

const defaultComplexityLevels = [
  { label: 'Simple', value: 1, note: 'Structure claire, peu de regles metier.' },
  { label: 'Business', value: 1.35, note: 'Parcours avances, admin et integrations.' },
  { label: 'Sur mesure', value: 1.85, note: 'Architecture specifique, logique metier complexe.' },
];

const defaultDeliveryLevels = [
  { label: 'Flexible', value: 1 },
  { label: 'Prioritaire', value: 1.1 },
  { label: 'Urgent', value: 1.2 },
];

const defaultEstimatorOptions = [
  { label: 'Espace admin', price: 1800 },
  { label: 'Paiement en ligne', price: 1500 },
  { label: 'Authentification', price: 1200 },
  { label: 'Automatisation / IA', price: 2500 },
  { label: 'Tableaux de bord', price: 1800 },
  { label: 'Maintenance initiale', price: 900 },
];

function parseEstimatorItems(value) {
  const items = String(value || '')
    .split('\n')
    .map((line) => {
      const [name, basePrice, description] = line.split('|').map((part) => part?.trim());
      const parsedPrice = Number(basePrice);
      if (!name || !Number.isFinite(parsedPrice) || parsedPrice <= 0) return null;
      return { name, basePrice: parsedPrice, description: description || 'Projet digital configure depuis TechAgency.' };
    })
    .filter(Boolean);

  return items.length > 0 ? items : defaultEstimatorItems;
}

function parseEstimatorOptions(value) {
  const items = String(value || '')
    .split('\n')
    .map((line) => {
      const [label, price] = line.split('|').map((part) => part?.trim());
      const parsedPrice = Number(price);
      if (!label || !Number.isFinite(parsedPrice) || parsedPrice < 0) return null;
      return { label, price: parsedPrice };
    })
    .filter(Boolean);

  return items.length > 0 ? items : defaultEstimatorOptions;
}

function parseMultiplierItems(value, fallbackItems) {
  const items = String(value || '')
    .split('\n')
    .map((line) => {
      const [label, multiplier, note] = line.split('|').map((part) => part?.trim());
      const parsedMultiplier = Number(multiplier);
      if (!label || !Number.isFinite(parsedMultiplier) || parsedMultiplier <= 0) return null;
      return { label, value: parsedMultiplier, note: note || '' };
    })
    .filter(Boolean);

  return items.length > 0 ? items : fallbackItems;
}

function formatPrice(value, currency) {
  return `${Math.round(value / 500) * 500} ${currency || 'MAD'}`;
}

function Pricing({ offers, settings = {} }) {
  const displayedPacks = Array.isArray(offers) && offers.length > 0 ? offers.map(normalizeOffer) : packs;
  const estimatorItems = parseEstimatorItems(settings.pricingEstimatorItems);
  const estimatorOptions = parseEstimatorOptions(settings.pricingEstimatorOptions);
  const complexityLevels = parseMultiplierItems(settings.pricingEstimatorComplexities, defaultComplexityLevels);
  const deliveryLevels = parseMultiplierItems(settings.pricingEstimatorDelivery, defaultDeliveryLevels);
  const pricePerScreen = Number(settings.pricingEstimatorScreenPrice) > 0 ? Number(settings.pricingEstimatorScreenPrice) : 200;
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [selectedComplexityIndex, setSelectedComplexityIndex] = useState(0);
  const [selectedDeliveryIndex, setSelectedDeliveryIndex] = useState(0);
  const [screenCount, setScreenCount] = useState(2);
  const [selectedOptions, setSelectedOptions] = useState(['Espace admin']);
  const selectedType = estimatorItems[selectedTypeIndex] || estimatorItems[0];
  const selectedComplexity = complexityLevels[selectedComplexityIndex] || complexityLevels[0];
  const selectedDelivery = deliveryLevels[selectedDeliveryIndex] || deliveryLevels[0];
  const optionsTotal = estimatorOptions
    .filter((option) => selectedOptions.includes(option.label))
    .reduce((total, option) => total + option.price, 0);
  const estimate = selectedType.basePrice * selectedComplexity.value * selectedDelivery.value + screenCount * pricePerScreen + optionsTotal;
  const lowEstimate = estimate * 0.9;
  const highEstimate = estimate * 1.18;
  const currency = settings.pricingEstimatorCurrency || 'MAD';

  const toggleOption = (label) => {
    setSelectedOptions((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label],
    );
  };

  return (
    <section id="offres" className="section-padding scroll-mt-24 bg-cloud">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <span className="eyebrow">{settings.pricingEyebrow || 'Offres'}</span>
            <h2 className="section-title">{settings.pricingTitle || 'Des packs simples pour cadrer rapidement votre projet.'}</h2>
          </div>
          <p className="text-base leading-8 text-slate-600 sm:text-lg">
            {settings.pricingDescription ||
              'Comme une vraie demarche produit, chaque offre clarifie le perimetre, les priorites et le niveau d accompagnement necessaire avant de passer au developpement.'}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {displayedPacks.map((pack, index) => (
            <motion.article
              key={`${pack.name}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className={`relative overflow-hidden rounded-lg border p-6 transition duration-300 hover:-translate-y-1 ${
                pack.popular ? 'border-cyan bg-navy text-white shadow-premium' : 'border-slate-200 bg-white text-navy shadow-sm hover:shadow-premium'
              }`}
            >
              <div className={`absolute inset-x-0 top-0 h-1 ${pack.popular ? 'bg-cyan' : 'bg-slate-100'}`} />
              {pack.popular && <span className="absolute right-5 top-5 rounded-md bg-cyan px-3 py-1 text-xs font-extrabold text-navy">Populaire</span>}
              <p className="text-sm font-extrabold text-cyan">{pack.label}</p>
              <h3 className="mt-3 font-display text-2xl font-bold">{pack.name}</h3>
              <p className={`mt-4 text-3xl font-extrabold ${pack.popular ? 'text-white' : 'text-navy'}`}>{pack.price}</p>
              <p className={`mt-4 text-sm leading-7 ${pack.popular ? 'text-slate-300' : 'text-slate-600'}`}>{pack.description}</p>

              <div className="mt-6 space-y-3">
                {pack.features.map((feature) => (
                  <div key={feature} className={`flex items-start gap-3 text-sm font-bold ${pack.popular ? 'text-slate-200' : 'text-slate-700'}`}>
                    <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-cyan" />
                    {feature}
                  </div>
                ))}
              </div>

              <a href="#contact" className={`mt-7 inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-extrabold transition hover:-translate-y-1 ${pack.popular ? 'bg-cyan text-navy hover:bg-white' : 'bg-navy text-white hover:bg-cyan hover:text-navy'}`}>
                {settings.pricingCta || 'Demander un devis'}
              </a>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-premium">
          <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="bg-navy p-6 text-white sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-md border border-cyan/40 bg-cyan/10 px-3 py-1 text-xs font-extrabold uppercase text-cyan">
                <Calculator size={15} />
                {settings.pricingEstimatorEyebrow || 'Simulation rapide'}
              </span>
              <h3 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl">
                {settings.pricingEstimatorTitle || 'Estimez votre site ou systeme en quelques clics.'}
              </h3>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-300 sm:text-base">
                {settings.pricingEstimatorDescription ||
                  'Cette estimation donne une premiere fourchette indicative. Le devis final depend du perimetre exact, des integrations et des priorites.'}
              </p>

              <div className="mt-7 rounded-lg border border-white/10 bg-white/10 p-5">
                <p className="text-sm font-extrabold uppercase text-cyan">Fourchette estimee</p>
                <p className="mt-3 font-display text-3xl font-bold leading-tight">
                  {formatPrice(lowEstimate, currency)} - {formatPrice(highEstimate, currency)}
                </p>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
                  Base {selectedType.name}, niveau {selectedComplexity.label.toLowerCase()}, delai {selectedDelivery.label.toLowerCase()}.
                </p>
                <p className="mt-2 text-xs font-bold leading-5 text-cyan">
                  {settings.pricingEstimatorNote || 'Prix indicatifs et communicables selon le perimetre exact du projet.'}
                </p>
              </div>

              <a href="#contact" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan px-5 py-3 text-sm font-extrabold text-navy transition hover:-translate-y-1 hover:bg-white">
                Recevoir une estimation detaillee
                <MousePointerClick size={17} />
              </a>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="text-sm font-extrabold uppercase text-slate-500">Type de projet</span>
                  <select
                    value={selectedTypeIndex}
                    onChange={(event) => setSelectedTypeIndex(Number(event.target.value))}
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10"
                  >
                    {estimatorItems.map((item, index) => (
                      <option key={item.name} value={index}>{item.name}</option>
                    ))}
                  </select>
                  <span className="mt-2 block text-sm font-semibold leading-6 text-slate-500">{selectedType.description}</span>
                </label>

                <label className="block">
                  <span className="text-sm font-extrabold uppercase text-slate-500">Complexite</span>
                  <select
                    value={selectedComplexityIndex}
                    onChange={(event) => setSelectedComplexityIndex(Number(event.target.value))}
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10"
                  >
                    {complexityLevels.map((item, index) => (
                      <option key={item.label} value={index}>{item.label}</option>
                    ))}
                  </select>
                  <span className="mt-2 block text-xs font-bold leading-5 text-slate-500">{selectedComplexity.note}</span>
                </label>

                <label className="block">
                  <span className="text-sm font-extrabold uppercase text-slate-500">Delai</span>
                  <select
                    value={selectedDeliveryIndex}
                    onChange={(event) => setSelectedDeliveryIndex(Number(event.target.value))}
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10"
                  >
                    {deliveryLevels.map((item, index) => (
                      <option key={item.label} value={index}>{item.label}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="mt-6 block">
                <span className="flex items-center justify-between gap-3 text-sm font-extrabold uppercase text-slate-500">
                  Ecrans / pages
                  <span className="rounded-md bg-cyan/10 px-3 py-1 text-cyan">{screenCount}</span>
                </span>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={screenCount}
                  onChange={(event) => setScreenCount(Number(event.target.value))}
                  className="mt-4 w-full accent-cyan"
                />
              </label>

              <div className="mt-6">
                <p className="text-sm font-extrabold uppercase text-slate-500">Options</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {estimatorOptions.map((option) => {
                    const active = selectedOptions.includes(option.label);
                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => toggleOption(option.label)}
                        className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm font-extrabold transition ${
                          active ? 'border-cyan bg-cyan/10 text-navy' : 'border-slate-200 bg-cloud text-slate-600 hover:border-cyan hover:text-navy'
                        }`}
                      >
                        <span className="inline-flex items-center gap-2">
                          <Sparkles size={16} className={active ? 'text-cyan' : 'text-slate-400'} />
                          {option.label}
                        </span>
                        <span className="text-xs text-slate-500">+{formatPrice(option.price, currency)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
