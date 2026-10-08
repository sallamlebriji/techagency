# Recette INNOVIA CMS — 8 octobre 2026

## Automatisation

`npm run build` réussi. `npm run test:cms` : 10 tests réussis, aucun échec (9 scénarios et leur suite parente). Base SQLite et médias de test isolés, supprimés après la recette. Aucun email réel envoyé.

Scénarios vérifiés :

- Authentification, cookies de session, rejet sans CSRF.
- Brouillon distinct du public, aperçu authentifié, publication, conflit de révision.
- Restrictions éditeur vérifiées côté serveur.
- Rejet d’une adresse javascript dans les contenus.
- Import/optimisation d’image, fichier public lisible, refus SVG et suppression d’un média référencé.
- Enregistrement réel d’une demande, notes, statut et export CSV.
- Masquage des prix, changement de slug avec 301, HTML rendu côté serveur, canonique, SEO de liste et exclusion noindex du sitemap.
- Sauvegarde/restauration du brouillon. Nouveaux noms de fichiers à la restauration ; les médias publiés restent accessibles.
- Persistance après arrêt/redémarrage, journal des publications, message explicite si récupération de mot de passe sans SMTP.

`npm audit --omit=dev` : aucune vulnérabilité signalée dans les dépendances de production au moment de cette recette. Cela ne constitue pas un audit de sécurité complet.

## Parcours réel dans le navigateur

Connexion à l’administration locale. Modification du titre de présentation en « Un partenaire digital, proche de votre activité. ». Enregistrement du brouillon version 2, vérification de l’ancien titre sur le site public, puis vérification du nouveau titre dans l’aperçu authentifié.

La boîte native de confirmation a bloqué les interactions de l’ancien onglet du navigateur intégré. La confirmation de publication a été remplacée dans le code par un dialogue HTML accessible. L’ouverture/validation de ce nouveau dialogue reste à revérifier après fermeture de l’ancien onglet bloqué. La publication réelle du brouillon vérifié a été terminée via l’API authentifiée : version 2, titre confirmé dans l’API publique, le HTML Express et le DOM du navigateur. Aucune donnée fictive de demande n’a été ajoutée à la base réelle.

## Présentation responsive

Accueil : contrôle visuel à 1440 px et 390 px. Services : 6 cartes présentes à 768 px. Contact : champs et mise en page contrôlés à 390 px. Aucun dépassement horizontal sur les vues contrôlées. Captures dans `docs/previews/`. Les contrôles clavier/focus sont implémentés ; le test complet des interactions clavier/mobile reste limité par le blocage de l’ancien dialogue navigateur.

## Configuration externe restante

Les emails SMTP, une base MongoDB réelle et un déploiement public n’ont pas été testés : aucun accès à ces services n’a été configuré pour cette recette. Le site fonctionne localement avec SQLite. Renseigner les coordonnées INNOVIA définitives, les pages légales, le domaine HTTPS, les secrets de production et le SMTP avant ouverture publique. Aucune identité légale ni avis client n’a été inventé.

## Recette de la refonte visuelle

Compilation réussie et 10 tests d’intégration CMS toujours réussis. Contrôles navigateur : passage entre les aperçus Site web / Automatisation / Application ; sélection du secteur Écoles ; passage de Comprendre à Concevoir ; ouverture du menu mobile et fermeture par Échap. Contrôle visuel ordinateur 1440 px et téléphone 390 px, sans image cassée ni débordement horizontal sur les vues vérifiées. Captures `innovia-studio-mobile.png` et `innovia-studio-desktop.png`.
