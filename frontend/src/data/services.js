import {
  Brain,
  Cloud,
  Code2,
  Database,
  Layers3,
  ShieldCheck,
  Smartphone,
  Workflow,
} from 'lucide-react';

// Données centralisées pour garder les cartes faciles à maintenir.
export const services = [
  {
    title: 'Développement d’applications web',
    description: 'Portails, plateformes SaaS et interfaces métier performantes, sécurisées et faciles à utiliser.',
    icon: Code2,
  },
  {
    title: 'Développement mobile',
    description: 'Expériences mobiles fluides pour Android et iOS, pensées pour vos clients et vos équipes terrain.',
    icon: Smartphone,
  },
  {
    title: 'Logiciels sur mesure',
    description: 'Logiciels conçus autour de vos processus, règles métier, données et objectifs opérationnels.',
    icon: Layers3,
  },
  {
    title: 'Systèmes de gestion',
    description: 'ERP, CRM, back-offices et systèmes internes pour centraliser vos opérations critiques.',
    icon: Database,
  },
  {
    title: 'Intelligence artificielle',
    description: 'Chatbots, analyse de données, assistants intelligents et automatisation augmentée par l’IA.',
    icon: Brain,
  },
  {
    title: 'Automatisation des processus',
    description: 'Workflows robustes pour réduire les tâches répétitives et fiabiliser les opérations.',
    icon: Workflow,
  },
  {
    title: 'Cloud & DevOps',
    description: 'Architecture cloud, CI/CD, supervision et déploiements stables pour évoluer sereinement.',
    icon: Cloud,
  },
  {
    title: 'Cybersécurité',
    description: 'Protection des données, durcissement applicatif et pratiques de sécurité dès la conception.',
    icon: ShieldCheck,
  },
];
