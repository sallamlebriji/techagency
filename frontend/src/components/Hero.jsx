import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  CalendarDays,
  Cloud,
  FileText,
  LockKeyhole,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import LogoMark from './LogoMark.jsx';

const capabilities = [
  { label: 'Web App', icon: MonitorSmartphone },
  { label: 'IA', icon: Bot },
  { label: 'Cloud', icon: Cloud },
  { label: 'Securite', icon: LockKeyhole },
];

const heroStats = [
  { value: '30j', label: 'MVP structure' },
  { value: '360', label: 'UX, dev, cloud' },
  { value: 'IA', label: 'Automatisation utile' },
];

function TechAgencyDemoVisual({ logoImage }) {
  return (
    <div className="relative h-[320px] overflow-hidden rounded-lg bg-white transition duration-700 group-hover:scale-[1.02] sm:h-[430px]">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-cloud to-cyan/20" />
      <div className="absolute inset-x-0 bottom-0 h-[58%] bg-cloud" />
      <div className="absolute inset-0 hero-dots opacity-55" />
      <div className="absolute -right-12 top-12 h-44 w-44 rounded-full bg-cyan/25 blur-md transition duration-700 group-hover:translate-x-3 group-hover:-translate-y-3" />

      <div className="absolute inset-4 overflow-hidden rounded-lg border border-cyan/20 bg-white/80 shadow-soft backdrop-blur">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-white/90 px-4 py-3">
          <div className="flex items-center gap-2">
            <LogoMark src={logoImage} className="h-9 w-9 rounded-lg shadow-sm" />
            <div>
              <p className="font-display text-base font-bold leading-none text-navy">TechAgency</p>
              <p className="mt-1 text-[8px] font-extrabold uppercase text-slate-500">Software & AI Studio</p>
            </div>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            {['Accueil', 'Services', 'Modeles'].map((item) => (
              <span key={item} className="text-[9px] font-extrabold text-slate-600">
                {item}
              </span>
            ))}
          </div>
          <span className="rounded-md bg-navy px-3 py-2 text-[9px] font-extrabold text-white">Audit gratuit</span>
        </div>

        <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-4 px-4 py-6">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1 rounded-md border border-cyan/30 bg-white px-2 py-1 text-[8px] font-extrabold uppercase text-cyan">
              <Sparkles size={10} />
              Agence tech premium
            </span>
            <div className="mt-5 space-y-2">
              <div className="h-8 w-full rounded-md bg-navy sm:h-10" />
              <div className="h-8 w-[92%] rounded-md bg-navy sm:h-10" />
              <div className="h-8 w-[80%] rounded-md bg-navy sm:h-10" />
              <div className="h-8 w-[68%] rounded-md bg-navy sm:h-10" />
            </div>
            <div className="mt-5 space-y-2">
              <div className="h-2.5 w-full rounded-full bg-slate-300" />
              <div className="h-2.5 w-[88%] rounded-full bg-slate-300" />
              <div className="h-2.5 w-[76%] rounded-full bg-slate-300" />
            </div>
            <div className="mt-5 flex gap-2">
              <span className="h-8 w-28 rounded-lg bg-navy" />
              <span className="h-8 w-24 rounded-lg border border-slate-200 bg-white" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 rounded-lg bg-cyan/15 blur-xl" />
            <div className="relative mt-4 overflow-hidden rounded-lg border border-white bg-white p-2 shadow-premium sm:mt-8">
              <div className="relative h-44 overflow-hidden rounded-lg bg-gradient-to-br from-cyan/20 via-white to-cloud sm:h-56">
                <div className="absolute inset-0 hero-dots opacity-50" />
                <div className="absolute left-5 right-5 top-6 rounded-lg border border-white/70 bg-white/55 p-3 shadow-soft backdrop-blur">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <LogoMark src={logoImage} className="h-8 w-8 rounded-lg" />
                      <div>
                        <p className="text-[9px] font-extrabold uppercase text-cyan">Demonstration digitale</p>
                        <p className="font-display text-lg font-bold leading-none text-navy">TechAgency</p>
                      </div>
                    </div>
                    <span className="rounded-md bg-cyan/15 px-2 py-1 text-[8px] font-extrabold uppercase text-cyan">
                      AI Studio
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-8 right-8 rounded-t-lg bg-navy p-3 shadow-premium">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                    <span className="h-2 w-2 rounded-full bg-amber-300" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <div className="ml-2 h-6 flex-1 rounded-md bg-white/10" />
                  </div>
                  <div className="grid grid-cols-[0.8fr_1fr] gap-2 pt-2">
                    <div className="rounded-md bg-white p-2">
                      <div className="h-2.5 w-16 rounded-full bg-cyan" />
                      <div className="mt-3 h-3 w-full rounded-full bg-navy" />
                      <div className="mt-2 h-3 w-3/4 rounded-full bg-navy" />
                      <div className="mt-3 h-2 w-full rounded-full bg-slate-200" />
                      <div className="mt-2 h-2 w-3/4 rounded-full bg-slate-200" />
                    </div>
                    <div className="grid gap-2">
                      <div className="rounded-md border border-cyan/25 bg-cyan/10 p-2">
                        <Users size={14} className="text-cyan" />
                        <div className="mt-2 h-2 w-20 rounded-full bg-white/80" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <span className="rounded-md border border-white/10 bg-white/10 p-3" />
                        <span className="rounded-md border border-white/10 bg-white/10 p-3" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-2 top-[112px] hidden rounded-lg border border-cyan/30 bg-white/80 p-2 text-navy shadow-soft backdrop-blur sm:block">
                  <FileText size={14} className="text-cyan" />
                  <p className="mt-1 text-[8px] font-extrabold">Blog</p>
                </div>
                <div className="absolute right-2 top-[104px] hidden rounded-lg border border-cyan/30 bg-white/80 p-2 text-navy shadow-soft backdrop-blur sm:block">
                  <CalendarDays size={14} className="text-cyan" />
                  <p className="mt-1 text-[8px] font-extrabold">Booking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero({ settings }) {
  const heroEyebrow = settings?.heroEyebrow || 'Agence tech premium pour solutions sur mesure';
  const heroTitle =
    settings?.heroTitle || 'Des plateformes digitales elegantes, solides et pretes a faire grandir votre activite.';
  const heroDescription =
    settings?.heroDescription ||
    'TechAgency concoit des applications web, logiciels metiers, systemes de gestion, plateformes mobiles et solutions IA avec une exigence de clarte, de securite et de performance.';
  const primaryCta = settings?.heroPrimaryCta || 'Planifier un audit';
  const secondaryCta = settings?.heroSecondaryCta || 'Voir nos realisations';
  const logoImage = settings?.logoImage;

  return (
    <section id="accueil" className="relative scroll-mt-24 overflow-hidden bg-cloud pt-28 sm:pt-32">
      <div className="absolute inset-0 hero-dots opacity-70" />
      <div className="absolute inset-x-0 top-0 h-56 bg-white" />

      <div className="container-shell relative grid items-center gap-12 pb-16 lg:grid-cols-[1.02fr_0.98fr] lg:pb-24">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="eyebrow bg-white">
            <Sparkles size={14} />
            {heroEyebrow}
          </span>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-tight text-navy sm:text-5xl lg:text-6xl">
            {heroTitle}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            {heroDescription}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#contact" className="primary-button">
              {primaryCta}
              <ArrowRight size={18} />
            </a>
            <a href="#portfolio" className="secondary-button">
              {secondaryCta}
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:max-w-3xl">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur">
                <ShieldCheck size={20} className="text-cyan" />
                <p className="mt-4 text-2xl font-extrabold text-navy">{stat.value}</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">{stat.label}</p>
                <span className="mt-3 block h-1 w-10 rounded-md bg-cyan" />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 34, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          whileHover={{ y: -12, rotate: -0.8, scale: 1.018 }}
          className="group relative mx-auto w-full max-w-xl cursor-pointer"
        >
          <div className="absolute -inset-5 rounded-lg bg-cyan/10 blur-2xl transition duration-500 group-hover:bg-cyan/20" />
          <div className="relative overflow-hidden rounded-lg border border-white bg-white p-3 shadow-premium transition duration-500 group-hover:shadow-glow">
            <TechAgencyDemoVisual logoImage={logoImage} />
            <div className="absolute bottom-7 left-7 right-7 rounded-lg border border-white/50 bg-white/90 p-4 text-navy shadow-soft backdrop-blur transition duration-500 group-hover:-translate-y-2">
              <p className="text-xs font-extrabold uppercase text-cyan">TechAgency command center</p>
              <p className="mt-1 text-lg font-extrabold">TechAgency : IA, booking et automatisation</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-lg border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
                  <Icon size={18} className="text-cyan" />
                  <p className="mt-2 text-sm font-bold text-navy">{item.label}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
