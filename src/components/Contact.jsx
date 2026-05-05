import { motion } from 'framer-motion';
import { CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';

const projectTypes = [
  'Application web',
  'Application mobile',
  'Logiciel sur mesure',
  'Automatisation',
  'Solution IA',
  'Cloud & DevOps',
];

const contactHighlights = [
  'Reponse structuree sous 24h ouvrees',
  'Analyse initiale de votre besoin',
  'Estimation claire du perimetre et des priorites',
];

function Contact({ settings }) {
  const email = settings?.email || 'contact@techagency.ma';
  const phone = settings?.phone || '+212 6 00 00 00 00';
  const address = settings?.address || 'Casablanca, Maroc';
  const title = settings?.contactTitle || 'Donnez-nous le contexte, nous vous aidons a structurer la solution.';
  const description =
    settings?.contactDescription ||
    'Decrivez votre besoin, vos contraintes et vos objectifs. Nous vous repondons avec une premiere lecture technique claire et des prochaines etapes concretes.';
  const highlights = String(settings?.contactHighlights || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
  const displayedHighlights = highlights.length > 0 ? highlights : contactHighlights;

  return (
    <section id="contact" className="section-padding scroll-mt-24 bg-cloud">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-lg bg-navy p-6 text-white shadow-premium sm:p-8"
          >
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan/15 blur-2xl" />
            <div className="relative">
              <span className="eyebrow border-white/15 bg-white/10 text-cyan">Contact</span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">{title}</h2>
              <p className="mt-4 text-base leading-8 text-slate-300">{description}</p>

              <div className="mt-8 space-y-4">
                {displayedHighlights.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm font-bold text-slate-200">
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-cyan" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
                <div className="flex items-center gap-4">
                  <Mail className="text-cyan" size={22} />
                  <div>
                    <p className="text-sm font-bold text-white">Email</p>
                    <p className="text-sm text-slate-300">{email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-cyan" size={22} />
                  <div>
                    <p className="text-sm font-bold text-white">Telephone</p>
                    <p className="text-sm text-slate-300">{phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-cyan" size={22} />
                  <div>
                    <p className="text-sm font-bold text-white">Adresse</p>
                    <p className="text-sm text-slate-300">{address}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={(event) => event.preventDefault()}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-extrabold text-navy">Nom complet</span>
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10"
                />
              </label>
              <label className="block">
                <span className="text-sm font-extrabold text-navy">Email</span>
                <input
                  type="email"
                  placeholder="vous@email.com"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10"
                />
              </label>
              <label className="block">
                <span className="text-sm font-extrabold text-navy">Telephone</span>
                <input
                  type="tel"
                  placeholder="+212 ..."
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10"
                />
              </label>
              <label className="block">
                <span className="text-sm font-extrabold text-navy">Type de projet</span>
                <select className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10">
                  {projectTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-extrabold text-navy">Message</span>
              <textarea
                rows="6"
                placeholder="Decrivez brievement votre besoin, vos objectifs et vos delais..."
                className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10"
              />
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-5 py-4 text-sm font-extrabold text-white transition hover:-translate-y-1 hover:bg-cyan hover:text-navy"
            >
              Envoyer la demande
              <Send size={18} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
