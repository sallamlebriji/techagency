import { motion } from 'framer-motion';
import { CheckCircle2, ClipboardList, Code2, PenTool, Rocket, Settings } from 'lucide-react';

const defaultSteps = [
  {
    title: 'Analyse du besoin',
    description: 'Audit, objectifs, utilisateurs, contraintes, priorites metier et perimetre fonctionnel.',
    icon: ClipboardList,
  },
  {
    title: 'Conception UI/UX',
    description: 'Parcours, maquettes, experience utilisateur, structure des ecrans et validation du concept.',
    icon: PenTool,
  },
  {
    title: 'Developpement',
    description: 'Architecture, developpement frontend/backend, integrations et gestion des donnees.',
    icon: Code2,
  },
  {
    title: 'Test et validation',
    description: 'Tests fonctionnels, securite, performance, correction des anomalies et recette client.',
    icon: CheckCircle2,
  },
  {
    title: 'Deploiement',
    description: 'Mise en production, cloud, CI/CD, configuration, sauvegardes et monitoring.',
    icon: Rocket,
  },
  {
    title: 'Amelioration continue',
    description: 'Maintenance, support, nouvelles fonctionnalites et optimisation selon les retours terrain.',
    icon: Settings,
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

function Process({ settings = {} }) {
  const steps = parseItems(settings.processItems, defaultSteps);

  return (
    <section id="processus" className="section-padding scroll-mt-24 bg-white">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">{settings.processEyebrow || 'Processus'}</span>
          <h2 className="section-title mx-auto">
            {settings.processTitle || 'Une methode structuree pour livrer sans improvisation.'}
          </h2>
          <p className="section-subtitle mx-auto">
            {settings.processDescription ||
              'Nous combinons cadrage produit, rigueur technique et cycles courts pour garder le projet lisible, maitrise et oriente resultat.'}
          </p>
        </div>

        <div className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon || defaultSteps[index % defaultSteps.length]?.icon || CheckCircle2;
            return (
              <motion.article
                key={`${step.title}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="premium-card p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy text-cyan">
                    <Icon size={23} />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase text-cyan">Etape {index + 1}</p>
                    <h3 className="mt-2 text-lg font-extrabold text-navy">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Process;
