import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Amine El Fassi',
    role: 'Directeur général',
    company: 'Atlas Retail',
    quote:
      'TechAgency a transformé notre gestion commerciale avec une plateforme claire, rapide et parfaitement adaptée à nos équipes.',
  },
  {
    name: 'Sara Benali',
    role: 'Responsable opérations',
    company: 'MedBooking',
    quote:
      'L’accompagnement a été très professionnel, de la conception UI/UX au déploiement. Nous avons gagné en efficacité dès les premières semaines.',
  },
  {
    name: 'Youssef Rahmani',
    role: 'Fondateur',
    company: 'SmartSupport AI',
    quote:
      'Ils ont livré un chatbot IA connecté à nos données internes avec une excellente qualité technique et une vraie vision produit.',
  },
];

function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Témoignages</span>
          <h2 className="section-title mx-auto">Des clients qui choisissent la clarté, la vitesse et la qualité.</h2>
          <p className="section-subtitle mx-auto">
            Nous privilégions une relation transparente : des décisions expliquées, des livrables visibles et un
            accompagnement sérieux après mise en production.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="premium-card p-6"
            >
              <div className="flex items-center justify-between">
                <Quote size={30} className="text-cyan" />
                <span className="rounded-md bg-cyan/10 px-3 py-1 text-xs font-extrabold text-cyan">
                  Client vérifié
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
