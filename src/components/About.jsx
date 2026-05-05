import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Code, Headphones, Layers, Shield, Sparkles, Zap } from 'lucide-react';

const stats = [
  { value: '+50', label: 'projets réalisés' },
  { value: '+20', label: 'clients accompagnés' },
  { value: '+5', label: 'années d’expérience' },
  { value: '24/7', label: 'support technique continu' },
];

const advantages = [
  { title: 'Solutions sur mesure', icon: Layers },
  { title: 'Design moderne', icon: Sparkles },
  { title: 'Sécurité renforcée', icon: Shield },
  { title: 'Code propre et maintenable', icon: Code },
  { title: 'Accompagnement complet', icon: Headphones },
  { title: 'Livraison rapide', icon: Zap },
  { title: 'Support après livraison', icon: Clock },
];

function About() {
  return (
    <>
      <section id="apropos" className="section-padding scroll-mt-24 bg-white">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <span className="eyebrow">À propos</span>
            <h2 className="section-title">Une agence technologique pour transformer les idées en systèmes solides.</h2>
            <p className="section-subtitle">
              TechAgency conçoit et développe des solutions informatiques sur mesure pour les entreprises,
              établissements et startups qui veulent moderniser leurs opérations avec des outils fiables,
              performants et élégants.
            </p>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Notre approche réunit conseil, expérience utilisateur, architecture logicielle et accompagnement
              technique. Le résultat : des produits plus faciles à adopter, plus simples à maintenir et plus
              cohérents avec vos objectifs métier.
            </p>
          </motion.div>

          <div>
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1100&q=85"
                alt="Équipe technologique en atelier de conception"
                loading="lazy"
                className="h-72 w-full object-cover"
              />
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="rounded-lg border border-slate-200 bg-cloud p-5"
                >
                  <p className="text-3xl font-extrabold text-navy">{stat.value}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-16 text-white sm:py-20">
        <div className="absolute inset-0 tech-grid opacity-30" />
        <div className="container-shell relative">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <span className="eyebrow border-white/15 bg-white/10 text-cyan">Pourquoi nous choisir</span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Le niveau d’exigence d’une équipe produit, la proximité d’un partenaire agile.
              </h2>
            </div>
            <p className="text-base leading-8 text-slate-300 sm:text-lg">
              Nous concevons des solutions qui restent propres après la livraison : documentation, structure,
              sécurité, maintenabilité et support font partie de la prestation.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur"
                >
                  <Icon size={23} className="text-cyan" />
                  <div className="mt-4 flex items-start gap-2">
                    <CheckCircle2 size={17} className="mt-1 shrink-0 text-cyan" />
                    <h3 className="text-base font-extrabold text-white">{advantage.title}</h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
