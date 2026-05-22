import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  MousePointerClick,
  Sparkles,
  Stethoscope,
  Users,
} from 'lucide-react';

const models = [
  {
    title: 'Demo Psy',
    sector: 'Bien-etre',
    icon: MessageCircle,
    accent: 'bg-violet-400',
    accentText: 'text-violet-500',
    description: 'Un parcours rassurant pour comprendre le besoin, consulter les disponibilites et envoyer une demande.',
    steps: ['Accueil rassurant', 'FAQ guidee', 'Demande de rendez-vous'],
    cta: 'Simuler la demande',
  },
  {
    title: 'Demo Coach',
    sector: 'Coaching',
    icon: Users,
    accent: 'bg-amber-300',
    accentText: 'text-amber-500',
    description: 'Une experience orientee conversion avec programmes, questionnaire rapide et appel decouverte.',
    steps: ['Voir les offres', 'Faire le mini quiz', 'Reserver un appel'],
    cta: 'Tester le quiz',
  },
  {
    title: 'Demo Medecin',
    sector: 'Sante',
    icon: Stethoscope,
    accent: 'bg-cyan',
    accentText: 'text-cyan',
    description: 'Un site medical clair avec services, carte, horaires, avis patients et prise de rendez-vous.',
    steps: ['Choisir un service', 'Voir les horaires', 'Confirmer le RDV'],
    cta: 'Prendre RDV',
  },
];

function BrowserPreview({ model, active }) {
  const Icon = model.icon;

  return (
    <div className="rounded-lg border border-white/10 bg-[#071421] p-3">
      <div className="flex items-center gap-3 pb-3">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-amber-300" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
        <div className="ml-4 h-10 flex-1 rounded-lg border border-white/10 bg-white/8" />
      </div>

      <div className="relative h-[315px] overflow-hidden rounded-lg border border-white/10 bg-white sm:h-[380px]">
        <div className="absolute right-2 top-2 z-20 h-28 w-2 rounded-full bg-slate-200">
          <span
            className={`model-scroll-thumb block w-2 rounded-full bg-slate-500 ${
              active ? 'model-scroll-thumb-active' : ''
            }`}
          />
        </div>
        <div
          className={`model-scroll-content absolute inset-x-0 top-0 transition duration-700 ease-out group-hover:[animation-play-state:paused] ${
            active ? 'model-scroll-content-active' : ''
          }`}
        >
          <div className="relative min-h-[540px] bg-cloud">
            <div className="bg-white px-6 py-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${model.accent} text-navy`}>
                    <Icon size={18} />
                  </span>
                  <div>
                    <div className="h-2.5 w-24 rounded-full bg-navy" />
                    <div className="mt-2 h-2 w-16 rounded-full bg-slate-200" />
                  </div>
                </div>
                <div className="hidden gap-3 sm:flex">
                  <span className="h-2 w-10 rounded-full bg-slate-200" />
                  <span className="h-2 w-10 rounded-full bg-slate-200" />
                  <span className="h-2 w-10 rounded-full bg-slate-200" />
                </div>
              </div>
            </div>

            <div className="grid gap-5 px-6 py-7 md:grid-cols-[1fr_0.75fr]">
              <div>
                <span className={`inline-flex rounded-md ${model.accent} px-3 py-1 text-xs font-extrabold text-navy`}>
                  {model.sector}
                </span>
                <div className="mt-5 h-5 w-4/5 rounded-full bg-navy" />
                <div className="mt-3 h-5 w-3/5 rounded-full bg-navy" />
                <div className="mt-5 space-y-2">
                  <div className="h-2.5 w-full rounded-full bg-slate-200" />
                  <div className="h-2.5 w-5/6 rounded-full bg-slate-200" />
                  <div className="h-2.5 w-2/3 rounded-full bg-slate-200" />
                </div>
                <button type="button" className="mt-6 rounded-lg bg-navy px-4 py-3 text-xs font-extrabold text-white">
                  {model.cta}
                </button>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <div className={`h-24 rounded-lg ${model.accent} opacity-25`} />
                <div className="mt-4 space-y-2">
                  <div className="h-3 w-full rounded-full bg-slate-200" />
                  <div className="h-3 w-2/3 rounded-full bg-slate-200" />
                </div>
              </div>
            </div>

            <div className="mx-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-3">
              {model.steps.map((step, index) => (
                <div key={step} className="rounded-lg bg-cloud p-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${model.accent} text-sm font-extrabold text-navy`}>
                    {index + 1}
                  </span>
                  <div className="mt-3 h-2.5 w-full rounded-full bg-slate-200" />
                  <p className="mt-3 text-[11px] font-extrabold text-navy">{step}</p>
                </div>
              ))}
            </div>

            <div className="mx-6 mt-5 rounded-lg bg-navy p-5 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="h-3 w-36 rounded-full bg-white/80" />
                  <div className="mt-3 h-2.5 w-56 max-w-full rounded-full bg-white/25" />
                </div>
                <CalendarCheck className={model.accentText} size={28} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WebsiteModels() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeModel = models[activeIndex];
  const ActiveIcon = activeModel.icon;

  const selectModel = (index) => {
    setActiveIndex(index);
    window.setTimeout(() => {
      document.getElementById('modele-selectionne')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  };

  return (
    <section id="modeles" className="section-padding scroll-mt-24 bg-white">
      <div className="container-shell">
        <div className="mx-auto max-w-4xl text-center">
          <span className="eyebrow bg-cyan/15">
            <Sparkles size={14} />
            Modeles de sites
          </span>
          <h2 className="section-title mx-auto">Decouvrez nos modeles de sites interactifs.</h2>
          <p className="section-subtitle mx-auto">
            Explorez des exemples prets a l'emploi, optimises pour convertir et s'adapter au parcours de chaque
            visiteur.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {models.map((model, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.article
                key={model.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                onClick={() => selectModel(index)}
                className={`group cursor-pointer rounded-lg border p-4 shadow-premium transition duration-300 hover:-translate-y-2 ${
                  isActive ? 'border-cyan bg-navy' : 'border-white/10 bg-[#08202f]'
                }`}
              >
                <div className="mb-5 flex items-center justify-between gap-4 px-1 pt-1">
                  <h3 className="font-display text-2xl font-bold text-white">{model.title}</h3>
                  <button
                    type="button"
                    aria-label={`Explorer ${model.title}`}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-cyan hover:text-navy"
                  >
                    <ExternalLink size={24} />
                  </button>
                </div>

                <BrowserPreview model={model} active={isActive} />

                <div className="mt-5 flex items-center justify-between gap-4 px-1">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      selectModel(index);
                    }}
                    className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-xs font-extrabold uppercase text-cyan transition hover:bg-cyan hover:text-navy focus:outline-none focus:ring-4 focus:ring-cyan/25"
                  >
                    <MousePointerClick size={14} />
                    Cliquez pour interagir
                  </button>
                  {isActive && <span className="h-2.5 w-2.5 rounded-full bg-cyan shadow-glow" />}
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          key={activeModel.title}
          id="modele-selectionne"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 rounded-lg border border-slate-200 bg-cloud p-5 shadow-sm"
        >
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="flex items-start gap-4">
              <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg ${activeModel.accent} text-navy`}>
                <ActiveIcon size={26} />
              </span>
              <div>
                <p className="text-xs font-extrabold uppercase text-cyan">Modele selectionne</p>
                <h3 className="mt-1 text-2xl font-extrabold text-navy">{activeModel.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{activeModel.description}</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {activeModel.steps.map((step) => (
                <div key={step} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
                  <CheckCircle2 size={20} className="shrink-0 text-cyan" />
                  <span className="text-sm font-extrabold text-navy">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <a href="#contact" className="primary-button mt-6">
            Demander un modele similaire
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default WebsiteModels;
