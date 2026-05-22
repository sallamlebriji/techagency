import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Code, Headphones, Layers, Shield, Sparkles, Zap } from 'lucide-react';

const defaultStats = ['+50|projets realises', '+20|clients accompagnes', '+5|annees d experience', '24/7|support technique continu'];
const defaultAdvantages = ['Solutions sur mesure', 'Design moderne', 'Securite renforcee', 'Code propre et maintenable', 'Accompagnement complet', 'Livraison rapide', 'Support apres livraison'];
const icons = [Layers, Sparkles, Shield, Code, Headphones, Zap, Clock];

function splitLines(value, fallback) {
  const lines = String(value || '').split('\n').map((item) => item.trim()).filter(Boolean);
  return lines.length > 0 ? lines : fallback;
}

function About({ settings = {} }) {
  const stats = splitLines(settings.aboutStats, defaultStats).map((line) => {
    const [value, label] = line.split('|').map((part) => part.trim());
    return { value, label };
  });
  const advantages = splitLines(settings.chooseItems, defaultAdvantages);

  return (
    <>
      <section id="apropos" className="section-padding scroll-mt-24 bg-white">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }}>
            <span className="eyebrow">{settings.aboutEyebrow || 'A propos'}</span>
            <h2 className="section-title">{settings.aboutTitle || 'Une agence technologique pour transformer les idees en systemes solides.'}</h2>
            <p className="section-subtitle">
              {settings.aboutDescription ||
                'TechAgency concoit et developpe des solutions informatiques sur mesure pour les entreprises, etablissements et startups qui veulent moderniser leurs operations avec des outils fiables.'}
            </p>
            <p className="mt-5 text-base leading-8 text-slate-600">
              {settings.aboutSecondaryText ||
                'Notre approche reunit conseil, experience utilisateur, architecture logicielle et accompagnement technique.'}
            </p>
          </motion.div>

          <div>
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
              <img
                src={settings.aboutImage || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1100&q=85'}
                alt={settings.aboutImageAlt || 'Equipe technologique en atelier de conception'}
                loading="lazy"
                className="h-72 w-full object-cover"
              />
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {stats.map((stat, index) => (
                <motion.div key={`${stat.value}-${index}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.4, delay: index * 0.05 }} className="rounded-lg border border-slate-200 bg-cloud p-5">
                  <p className="text-3xl font-extrabold text-navy">{stat.value}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pourquoi-nous-choisir" className="relative overflow-hidden bg-navy py-16 text-white sm:py-20">
        <div className="absolute inset-0 tech-grid opacity-30" />
        <div className="container-shell relative">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <span className="eyebrow border-white/15 bg-white/10 text-cyan">{settings.chooseEyebrow || 'Pourquoi nous choisir'}</span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                {settings.chooseTitle || 'Le niveau d exigence d une equipe produit, la proximite d un partenaire agile.'}
              </h2>
            </div>
            <p className="text-base leading-8 text-slate-300 sm:text-lg">
              {settings.chooseDescription ||
                'Nous concevons des solutions qui restent propres apres la livraison : documentation, structure, securite, maintenabilite et support font partie de la prestation.'}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((advantage, index) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.div key={`${advantage}-${index}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.4, delay: index * 0.04 }} className="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <Icon size={23} className="text-cyan" />
                  <div className="mt-4 flex items-start gap-2">
                    <CheckCircle2 size={17} className="mt-1 shrink-0 text-cyan" />
                    <h3 className="text-base font-extrabold text-white">{advantage}</h3>
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
