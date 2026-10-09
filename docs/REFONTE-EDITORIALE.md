# INNOVIA — refonte éditoriale, 8 octobre 2026

## Audit et direction

Le site actif est `frontend/src/cms/PublicSite.jsx`, rendu côté serveur et hydraté par React. Les composants historiques ne sont pas le parcours public actuel. Les changements déjà présents dans PublicSite.jsx et studio.css ont été conservés.

L’identité vert profond / ivoire, le CMS et les contenus publiés sont conservés. La refonte apporte une composition éditoriale : titres fluides, en-têtes de sections en deux colonnes, expertises numérotées sur une grille à filets, réalisation unique présentée en grand avec texte latéral, formulaires et appels à l’action harmonisés. Sur mobile, ces compositions deviennent une seule colonne.

Les pages publiques et leurs états utilisent `editorial.css`, chargé après les styles existants. Les tokens de surface, texte, filets et mouvement sont regroupés au début du fichier ; couleurs, polices, espacements et arrondis restent liés aux réglages du CMS. Aucune dépendance ajoutée.

## Skills et références

Les skills frontend-design, ui-ux-design, design-system et accessibility recherchés ne sont pas installés. Le skill Adobe Fonts a été lu et utilisé : recherche de la famille existante Cormorant Garamond dans son catalogue, sans activation ni création de kit. Famille de Christian Thalmann (Catharsis Fonts), fonderie Google : https://fonts.adobe.com/fonts/cormorant-garamond. Le chargement Google Fonts existant reste en place.

Références consultées via leurs pages publiques : Ricardo Chance, Felix Rieseberg, Illoca et RabenRifaie. Leur contenu informe respectivement la présentation des expertises, la concision, les aperçus de produit et le parcours agence. L’accès à Cartier a échoué ; aucune analyse visuelle de Cartier n’est revendiquée. L’adaptation est originale et l’audit visuel a porté sur le site local.

## Ergonomie et vérifications

- Menu mobile : focus sur le premier lien à l’ouverture ; Échap ferme le menu et ramène le focus au bouton. Vérifié à 390 px.
- Formulaire : labels natifs, exemples de saisie, état aria-busy et message de statut aria-live. Aucun envoi depuis le navigateur de développement.
- Les animations sont neutralisées par prefers-reduced-motion et par le réglage CMS aucune animation ; transitions avec cubic-bezier(0.22, 1, 0.36, 1).
- `npm run build` : Vite et rendu serveur compilés avec succès.
- `npm run test:cms` : 10 tests passent, incluant permissions, publication, persistance des demandes et contenu indexable, dans l’environnement de test isolé.
- Navigateur : accueil, services, réalisations, offres et contact à 320, 768 et 1440 px. Pas de débordement horizontal au niveau du document sur ces 15 rendus ; aucun champ sans label détecté sur ces pages.
- Aperçu automatisation et passage à l’étape Concevoir vérifiés. Aucun avertissement ni erreur relevé dans la console du navigateur testé.

Ces contrôles ne constituent pas une certification WCAG 2.2 AA ni une mesure Lighthouse/Core Web Vitals. Les détails fins des illustrations d’interfaces sont des éléments démonstratifs ; le contenu et les actions de navigation sont hors de ces illustrations.
