import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Database, ShieldCheck } from 'lucide-react';
import { projects } from '../data/projects.js';
import { apiUrl } from '../lib/api.js';

function normalizeProject(project) {
  return {
    ...project,
    technologies: Array.isArray(project.technologies)
      ? project.technologies
      : String(project.technologies || '')
          .split(',')
          .map((technology) => technology.trim())
          .filter(Boolean),
  };
}

function Portfolio({ loadedProjects }) {
  const [portfolioProjects, setPortfolioProjects] = useState((loadedProjects || projects).map(normalizeProject));

  useEffect(() => {
    if (Array.isArray(loadedProjects)) {
      setPortfolioProjects(loadedProjects.map(normalizeProject));
      return undefined;
    }

    let cancelled = false;

    async function loadProjects() {
      try {
        const response = await fetch(apiUrl('/api/public-content'));
        if (!response.ok) return;
        const content = await response.json();
        if (!cancelled && Array.isArray(content.projects)) {
          setPortfolioProjects(content.projects.map(normalizeProject));
        }
      } catch {
        // Keep static fallback projects when the API is not available.
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="portfolio" className="section-padding scroll-mt-24 bg-cloud">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="eyebrow">Projets tech</span>
            <h2 className="section-title">
              Des plateformes digitales, dashboards et systemes IA prets a soutenir votre croissance.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-slate-600">
            Chaque projet met en avant une vraie brique technologique : interface web, automatisation,
            architecture cloud, donnees, securite et experience utilisateur.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portfolioProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-soft"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-cyan/10" />
                <div className="absolute inset-0 tech-grid opacity-25" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md bg-white/90 px-3 py-1 text-xs font-extrabold text-navy backdrop-blur">
                  <Cpu size={14} className="text-cyan" />
                  Tech case {String(index + 1).padStart(2, '0')}
                </span>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg border border-white/15 bg-navy/75 px-4 py-3 text-white backdrop-blur">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-cyan">
                    <Database size={14} />
                    Digital platform
                  </span>
                  <ShieldCheck size={18} className="text-cyan" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-extrabold leading-snug text-navy">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span key={technology} className="rounded-md bg-cyan/10 px-3 py-1 text-xs font-bold text-cyan">
                      {technology}
                    </span>
                  ))}
                </div>
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-navy transition hover:text-cyan"
                  >
                    Voir le site
                    <ArrowUpRight size={17} />
                  </a>
                ) : (
                  <button
                    type="button"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-navy transition hover:text-cyan"
                  >
                    Voir details
                    <ArrowUpRight size={17} />
                  </button>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
