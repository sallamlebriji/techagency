import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const defaultAudiences = [
  { title: 'PME / TPE', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=500&q=80', angle: 165 },
  { title: 'Startups', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80', angle: 225 },
  { title: 'Ecoles', image: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=500&q=80', angle: 285 },
  { title: 'Commerce', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80', angle: 345 },
  { title: 'Cabinets', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=500&q=80', angle: 45 },
  { title: 'Services', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80', angle: 105 },
];

function parseAudiences(value) {
  const lines = String(value || '').split('\n').map((item) => item.trim()).filter(Boolean);
  if (lines.length === 0) return defaultAudiences;
  return lines.map((line, index) => {
    const [title, image] = line.split('|').map((part) => part.trim());
    return {
      title,
      image: image || defaultAudiences[index % defaultAudiences.length].image,
      angle: defaultAudiences[index % defaultAudiences.length].angle,
    };
  });
}

function Audiences({ settings = {} }) {
  const audiences = parseAudiences(settings.audiencesItems);

  return (
    <section id="pour-qui" className="section-padding scroll-mt-24 bg-white">
      <div className="container-shell">
        <div className="mx-auto max-w-4xl text-center">
          <span className="eyebrow bg-cyan/15">{settings.audiencesEyebrow || 'Pour qui ?'}</span>
          <h2 className="section-title mx-auto">
            {settings.audiencesTitle || 'TechAgency accompagne les organisations qui veulent passer a un niveau superieur.'}
          </h2>
          <p className="section-subtitle mx-auto">
            {settings.audiencesDescription ||
              'Entreprises, etablissements, startups et services : nous transformons votre expertise metier en plateformes claires, modernes et performantes.'}
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:hidden">
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-left shadow-soft">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy text-cyan shadow-soft">
              <Cpu className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-display text-xl font-bold leading-none text-navy">{settings.agencyName || 'TechAgency'}</span>
              <span className="mt-1 block text-[0.65rem] font-extrabold uppercase leading-tight text-cyan">{settings.tagline || 'Software & AI Studio'}</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {audiences.map((audience) => (
              <article key={audience.title} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <img src={audience.image} alt={audience.title} loading="lazy" className="h-24 w-full object-cover" />
                <div className="flex min-h-12 items-center justify-center px-3 py-2 text-center text-xs font-extrabold leading-tight text-navy">
                  {audience.title}
                </div>
              </article>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="orbit-stage hero-dots elegant-rings relative mx-auto mt-10 hidden max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft sm:block sm:mt-12 sm:min-h-[560px] lg:min-h-[700px] xl:max-w-6xl xl:min-h-[740px]"
        >
          <div className="absolute left-1/2 top-1/2 z-20 flex w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-lg border border-slate-200 bg-white/95 px-2.5 py-2.5 text-center shadow-premium backdrop-blur sm:w-auto sm:flex-row sm:gap-2.5 sm:px-5 sm:py-4 sm:text-left lg:px-6 lg:py-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy text-cyan shadow-soft sm:h-12 sm:w-12 lg:h-14 lg:w-14">
              <Cpu className="h-4 w-4 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
            </span>
            <span>
              <span className="block max-w-full break-words font-display text-base font-bold leading-none text-navy sm:whitespace-nowrap sm:text-2xl lg:text-3xl">{settings.agencyName || 'TechAgency'}</span>
              <span className="mt-1 block text-[0.5rem] font-extrabold uppercase leading-tight text-cyan sm:text-[0.65rem] lg:text-xs">{settings.tagline || 'Software & AI Studio'}</span>
            </span>
          </div>

          <div className="orbit-ring absolute inset-0">
            {audiences.map((audience) => (
              <div
                key={audience.title}
                className="orbit-slot absolute left-1/2 top-1/2 z-10"
                style={{ '--orbit-angle': `${audience.angle}deg` }}
              >
                <div
                  className="orbit-item flex flex-col items-center"
                  style={{ '--orbit-counter-angle': `${-audience.angle}deg` }}
                >
                  <div className="audience-orbit-image overflow-hidden rounded-full border-[3px] border-white bg-slate-100 shadow-soft transition duration-300 hover:scale-110 hover:border-cyan hover:shadow-glow sm:border-4">
                    <img src={audience.image} alt={audience.title} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <span className="mt-2 rounded-md bg-navy px-2.5 py-1 text-center text-[0.62rem] font-extrabold leading-none text-white shadow-sm sm:mt-3 sm:px-3 sm:text-xs lg:text-sm">
                    {audience.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="mx-auto mt-8 max-w-3xl text-center font-display text-xl font-bold text-navy sm:text-2xl">
          {settings.audiencesBottomText || 'A vous l expertise, a nous la digitalisation.'}
        </p>
      </div>
    </section>
  );
}

export default Audiences;
