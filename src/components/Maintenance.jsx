import { LoaderCircle, Wrench } from 'lucide-react';
import LogoMark from './LogoMark.jsx';

function Maintenance({ settings }) {
  const agencyName = settings?.agencyName || 'TechAgency';
  const email = settings?.email || 'contact@techagency.ma';

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cloud px-4 py-12 text-navy">
      <div className="absolute inset-0 hero-dots opacity-70" />
      <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-navy/10 blur-3xl" />

      <section className="relative mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-6 text-center shadow-premium sm:p-10">
        <LogoMark className="mx-auto h-16 w-16 rounded-lg shadow-soft" />
        <span className="mt-6 inline-flex items-center gap-2 rounded-md border border-cyan/25 bg-cyan/10 px-3 py-1 text-xs font-extrabold uppercase text-cyan">
          <Wrench size={14} />
          Maintenance en cours
        </span>
        <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-navy sm:text-5xl">
          {agencyName} revient dans quelques instants.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600">
          Nous mettons le site a jour pour ameliorer votre experience. Merci pour votre patience.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-cloud px-5 py-4">
          <LoaderCircle className="animate-spin text-cyan" size={24} />
          <span className="text-sm font-extrabold text-navy">Chargement des ameliorations...</span>
        </div>

        <p className="mt-6 text-sm font-semibold text-slate-500">
          Besoin urgent ? Contactez-nous : <a className="font-extrabold text-cyan" href={`mailto:${email}`}>{email}</a>
        </p>
      </section>
    </main>
  );
}

export default Maintenance;
