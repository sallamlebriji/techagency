import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import SculptureView from './SculptureView.jsx';
import CinematicMedia from './CinematicMedia.jsx';
import { SkiperLink } from './ui/SkiperLink.tsx';
export default function Hero({ settings = {} }) {
  const reduced = useReducedMotion();
  return <section id="accueil" className="studio-hero scroll-mt-20"><div className="container-shell studio-hero-inner">
    <div className="hero-topline"><span><i className="studio-status-dot"/> INNOVIA — STUDIO DIGITAL</span><span>DE L’IDÉE À L’EXPÉRIENCE</span></div>
    <div className="hero-composition"><motion.div className="hero-copy" initial={reduced ? false : {opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.9,ease:[.22,1,.36,1]}}>
      <p className="studio-kicker">La précision du design. La force du digital.</p>
      <h1>{settings.heroTitle || <><span className="hero-title-line"><span>Nous donnons</span></span><span className="hero-title-line"><span>forme à vos</span></span><span className="hero-title-line"><span><em>ambitions digitales.</em></span></span></>}</h1>
      <p className="hero-description">{settings.heroDescription || 'Sites web, applications, SaaS et intelligence artificielle. Nous réunissons design et ingénierie pour créer des expériences qui vous ressemblent.'}</p>
      <div className="hero-actions"><a className="studio-button" href="#portfolio">{settings.heroSecondaryCta || 'Découvrir nos projets'}<ArrowUpRight size={18}/></a><SkiperLink className="studio-text-link skiper-link" href="#contact">{settings.heroPrimaryCta || 'Parlons de votre projet'}<ArrowUpRight size={17}/></SkiperLink></div>
    </motion.div><div className="hero-art"><span className="hero-art-index" aria-hidden="true">N.</span><SculptureView/><div className="hero-art-label" aria-hidden="true"><span>OBJET 001</span><span>FORME & FONCTION</span></div></div></div>
    <div className="hero-bottomline"><a href="#services"><ArrowDown size={15}/> DÉCOUVRIR LE STUDIO</a><p>Une idée. Cinq expertises.<br/>Un ensemble qui fait sens.</p><span>01 — 05</span></div>
  <CinematicMedia name="sculptureLoop"/></div><div className="hero-disciplines" aria-label="Les expertises du studio"><span>WEB & E-COMMERCE</span><span>APPLICATIONS</span><span>SAAS</span><span>INTELLIGENCE ARTIFICIELLE</span><span>DESIGN</span></div></section>;
}
