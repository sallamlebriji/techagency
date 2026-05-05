import { motion } from 'framer-motion';

const technologyGroups = [
  {
    title: 'Frontend & expérience',
    items: ['React', 'Tailwind CSS', 'Interfaces responsive', 'Design systems'],
  },
  {
    title: 'Backend & API',
    items: ['Node.js', 'Express', 'Laravel', 'Django / FastAPI'],
  },
  {
    title: 'Data & infrastructure',
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS / Cloud'],
  },
  {
    title: 'IA & automatisation',
    items: ['Python', 'Machine Learning', 'Chatbots IA', 'Workflows automatisés'],
  },
];

function Technologies() {
  return (
    <section className="relative overflow-hidden bg-navy py-16 text-white sm:py-20">
      <div className="absolute inset-0 tech-grid opacity-30" />
      <div className="container-shell relative">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <span className="eyebrow border-white/15 bg-white/10 text-cyan">Technologies</span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Un stack moderne, choisi pour la performance et la pérennité.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
              Nous privilégions les outils robustes, largement adoptés et adaptés à votre contexte :
              sécurité, budget, délais, intégrations et maintenance.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {technologyGroups.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur"
              >
                <h3 className="font-extrabold text-white">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md border border-white/10 bg-navy/50 px-3 py-2 text-xs font-bold text-slate-200"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Technologies;
