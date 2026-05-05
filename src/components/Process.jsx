import { motion } from 'framer-motion';
import { CheckCircle2, ClipboardList, Code2, PenTool, Rocket, Settings } from 'lucide-react';

const steps = [
  {
    title: 'Analyse du besoin',
    description: 'Audit, objectifs, utilisateurs, contraintes, priorités métier et périmètre fonctionnel.',
    icon: ClipboardList,
  },
  {
    title: 'Conception UI/UX',
    description: 'Parcours, maquettes, expérience utilisateur, structure des écrans et validation du concept.',
    icon: PenTool,
  },
  {
    title: 'Développement',
    description: 'Architecture, développement frontend/backend, intégrations et gestion des données.',
    icon: Code2,
  },
  {
    title: 'Test et validation',
    description: 'Tests fonctionnels, sécurité, performance, correction des anomalies et recette client.',
    icon: CheckCircle2,
  },
  {
    title: 'Déploiement',
    description: 'Mise en production, cloud, CI/CD, configuration, sauvegardes et monitoring.',
    icon: Rocket,
  },
  {
    title: 'Amélioration continue',
    description: 'Maintenance, support, nouvelles fonctionnalités et optimisation selon les retours terrain.',
    icon: Settings,
  },
];

function Process() {
  return (
    <section id="processus" className="section-padding scroll-mt-24 bg-white">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Processus</span>
          <h2 className="section-title mx-auto">Une méthode structurée pour livrer sans improvisation.</h2>
          <p className="section-subtitle mx-auto">
            Nous combinons cadrage produit, rigueur technique et cycles courts pour garder le projet lisible,
            maîtrisé et orienté résultat.
          </p>
        </div>

        <div className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.title}
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
                    <p className="text-xs font-extrabold uppercase text-cyan">Étape {index + 1}</p>
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
