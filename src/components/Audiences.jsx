import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const audiences = [
  {
    title: 'PME / TPE',
    image:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=500&q=80',
    className: 'left-[82%] top-[43%]',
  },
  {
    title: 'Startups',
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80',
    className: 'left-[68%] top-[78%]',
  },
  {
    title: 'Écoles',
    image:
      'https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=500&q=80',
    className: 'left-[36%] top-[84%]',
  },
  {
    title: 'Commerce',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80',
    className: 'left-[18%] top-[55%]',
  },
  {
    title: 'Cabinets',
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=500&q=80',
    className: 'left-[30%] top-[24%]',
  },
  {
    title: 'Services',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80',
    className: 'left-[58%] top-[17%]',
  },
];

function Audiences() {
  return (
    <section id="pour-qui" className="section-padding scroll-mt-24 bg-white">
      <div className="container-shell">
        <div className="mx-auto max-w-4xl text-center">
          <span className="eyebrow bg-cyan/15">Pour qui ?</span>
          <h2 className="section-title mx-auto">TechAgency accompagne les organisations qui veulent passer à un niveau supérieur.</h2>
          <p className="section-subtitle mx-auto">
            Entreprises, établissements, startups et services : nous transformons votre expertise métier en
            plateformes claires, modernes et performantes.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="orbit-stage hero-dots elegant-rings relative mx-auto mt-12 hidden min-h-[590px] max-w-4xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft md:block"
        >
          <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-lg border border-slate-200 bg-white/95 px-7 py-5 shadow-premium backdrop-blur">
            <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-navy text-cyan shadow-soft">
              <Cpu size={28} />
            </span>
            <span>
              <span className="block font-display text-3xl font-bold text-navy">TechAgency</span>
              <span className="text-xs font-extrabold uppercase text-cyan">Software & AI Studio</span>
            </span>
          </div>

          <div className="orbit-ring absolute inset-0">
            {audiences.map((audience) => (
              <div
                key={audience.title}
                className={`orbit-item absolute ${audience.className} z-10 flex w-32 flex-col items-center`}
              >
                <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-soft transition duration-300 hover:scale-110 hover:border-cyan hover:shadow-glow">
                  <img
                    src={audience.image}
                    alt={audience.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="mt-3 rounded-md bg-navy px-3 py-1 text-center text-xs font-extrabold text-white shadow-sm">
                  {audience.title}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-10 grid gap-4 md:hidden">
          {audiences.map((audience) => (
            <div key={audience.title} className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <img
                src={audience.image}
                alt={audience.title}
                loading="lazy"
                className="h-16 w-16 rounded-lg object-cover"
              />
              <div>
                <p className="font-display text-lg font-bold text-navy">{audience.title}</p>
                <p className="mt-1 text-sm text-slate-600">Solution digitale adaptée à votre activité.</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center font-display text-2xl font-bold text-navy">
          À vous l’expertise, à nous la digitalisation.
        </p>
      </div>
    </section>
  );
}

export default Audiences;
