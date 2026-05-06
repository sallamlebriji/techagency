import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const defaultTestimonials = [
  'Amine El Fassi|Directeur general|Atlas Retail|TechAgency a transforme notre gestion commerciale avec une plateforme claire, rapide et parfaitement adaptee a nos equipes.',
  'Sara Benali|Responsable operations|MedBooking|L accompagnement a ete tres professionnel, de la conception UI/UX au deploiement.',
  'Youssef Rahmani|Fondateur|SmartSupport AI|Ils ont livre un chatbot IA connecte a nos donnees internes avec une excellente qualite technique.',
];

function parseTestimonials(value) {
  const lines = String(value || defaultTestimonials.join('\n')).split('\n').map((item) => item.trim()).filter(Boolean);
  return lines.map((line) => {
    const [name, role, company, ...quoteParts] = line.split('|').map((part) => part.trim());
    return { name, role, company, quote: quoteParts.join(' | ') };
  });
}

function Testimonials({ settings = {} }) {
  const testimonials = parseTestimonials(settings.testimonialsItems);

  return (
    <section id="temoignages" className="section-padding bg-white">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">{settings.testimonialsEyebrow || 'Temoignages'}</span>
          <h2 className="section-title mx-auto">
            {settings.testimonialsTitle || 'Des clients qui choisissent la clarte, la vitesse et la qualite.'}
          </h2>
          <p className="section-subtitle mx-auto">
            {settings.testimonialsDescription ||
              'Nous privilegions une relation transparente : des decisions expliquees, des livrables visibles et un accompagnement serieux apres mise en production.'}
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={`${testimonial.name}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="premium-card p-6"
            >
              <div className="flex items-center justify-between">
                <Quote size={30} className="text-cyan" />
                <span className="rounded-md bg-cyan/10 px-3 py-1 text-xs font-extrabold text-cyan">
                  {settings.testimonialsBadge || 'Client verifie'}
                </span>
              </div>
              <p className="mt-5 text-base leading-8 text-slate-700">"{testimonial.quote}"</p>
              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="font-extrabold text-navy">{testimonial.name}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
