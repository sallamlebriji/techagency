import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { services } from '../data/services.js';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: index * 0.05 },
  }),
};

const defaultProofPoints = [
  'Architecture scalable et maintenable',
  'Interfaces sobres, rapides et orientees conversion',
  'Deploiement securise avec support continu',
];

function splitLines(value, fallback) {
  const lines = String(value || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
  return lines.length > 0 ? lines : fallback;
}

function parseItems(value, fallback) {
  const items = splitLines(value, []);
  if (items.length === 0) return fallback;

  return items.map((line) => {
    const [title, ...descriptionParts] = line.split('|').map((part) => part.trim());
    return {
      title,
      description: descriptionParts.join(' | ') || 'Description a modifier depuis l espace admin.',
    };
  });
}

function Services({ settings = {} }) {
  const serviceItems = parseItems(settings.servicesItems, services);
  const proofPoints = splitLines(settings.servicesProofPoints, defaultProofPoints);

  return (
    <section id="services" className="section-padding scroll-mt-24 bg-white">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <span className="eyebrow">{settings.servicesEyebrow || 'Services'}</span>
            <h2 className="section-title">
              {settings.servicesTitle || 'Une expertise complete pour concevoir des solutions fiables et differenciantes.'}
            </h2>
          </div>
          <p className="text-base leading-8 text-slate-600 sm:text-lg">
            {settings.servicesDescription ||
              'TechAgency accompagne chaque decision produit et technique : cadrage, design, developpement, integration, deploiement, securite et amelioration continue.'}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceItems.map((service, index) => {
            const Icon = service.icon || services[index % services.length]?.icon || CheckCircle2;
            return (
              <motion.article
                key={`${service.title}-${index}`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={index}
                className="premium-card group relative overflow-hidden p-6"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-cyan opacity-0 transition group-hover:opacity-100" />
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan/10 opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-cyan shadow-sm transition group-hover:bg-cyan group-hover:text-navy">
                    <Icon size={24} />
                  </div>
                  <span className="text-sm font-extrabold text-slate-300">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-6 text-lg font-extrabold text-navy">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 border-t border-slate-200 pt-8 md:grid-cols-3">
          {proofPoints.map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm font-extrabold text-navy">
              <CheckCircle2 size={22} className="shrink-0 text-cyan" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
