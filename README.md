# INNOVIA — site public et administration

Application React/Vite + API Express. SQLite persistant par défaut, MongoDB optionnel. Node.js **24 ou supérieur** requis (module natif `node:sqlite`).

## Lancement local

```powershell
npm ci
npm run dev
```

Site : http://localhost:5173/ — administration : http://localhost:5173/admin.
API : http://127.0.0.1:4000/api/health.

Au premier lancement sans compte existant ni ADMIN_PASSWORD, un compte local à mot de passe aléatoire est créé. Ses accès sont enregistrés dans `backend/.local-admin.txt` (exclu des sources et du serveur Vite). Conserver ce fichier privé. Les données sont dans `backend/data/innovia.sqlite` et les médias importés dans `backend/uploads` ; ne pas supprimer ces répertoires lors des mises à jour.

## Utiliser le CMS

1. Se connecter, choisir Accueil, Services, Solutions, Réalisations, Offres ou Pages.
2. Modifier puis **Enregistrer le brouillon**. Le site public reste inchangé.
3. **Prévisualiser** pour parcourir le brouillon authentifié.
4. **Publier**, puis confirmer : seule cette action actualise la version publique. Aucun build requis pour une modification éditoriale. Les onglets déjà ouverts se rafraîchissent dans les 20 secondes ou à leur retour au premier plan.

Les éléments en état Brouillon sont exclus de la publication. L’éditeur prépare les contenus et suit les demandes ; l’administrateur publie, configure l’identité/l’apparence, les comptes, les notifications et les sauvegardes. Les permissions sont vérifiées dans l’API.

- Identité : logo, favicon, coordonnées, réseaux sociaux et pied de page.
- Apparence : couleurs avec validation de contraste, choix de polices, arrondis, espacement, animations.
- Sections / Pages : blocs prédéfinis, ordre et visibilité ; menus dans Navigation.
- Référencement : titres, descriptions, canonique et indexation des pages de liste. SEO de l’accueil dans Accueil, SEO des fiches dans leur éditeur.
- Médiathèque : importer une image ou un PDF, copier son adresse dans un champ image. Images converties en WebP (maximum 1920 px). Les médias référencés par le brouillon ou le site publié ne sont pas supprimables.
- Demandes : filtre, recherche, statut, notes internes, export CSV. L’enregistrement en base conditionne le succès du formulaire ; l’échec éventuel de l’email est distinct.
- Notifications : SMTP côté serveur, secret chiffré. La récupération de mot de passe nécessite un SMTP fonctionnel. Sans SMTP, l’interface annonce explicitement son indisponibilité.
- Sauvegardes : export des contenus et médias ; restauration dans le brouillon uniquement. Les comptes, secrets et demandes sont exclus de cet export.

## Configuration

Copier `backend/.env.example` vers `backend/.env.local` et renseigner uniquement les valeurs nécessaires. Ordre de chargement : variables du processus, `backend/.env.local`, `backend/.env`, `.env`. Ne jamais committer ces secrets.

SQLite est utilisé si MONGODB_URI est vide. Avec MongoDB, la collection `cms_documents` stocke les mêmes documents et applique un index unique bucket/key. Au premier démarrage, les anciennes données reconnues sont importées sans supprimer les anciennes collections ; leur configuration est archivée dans le stockage privé. Vérifier les contenus importés avant publication. Le scénario MongoDB n’a pas été exécuté dans cette recette locale.

`backend/migrations/001_documents.sql` décrit le schéma SQLite initial ; l’initialisation idempotente et la version de migration sont appliquées par `store.js`. Les données initiales structurées sont dans `shared/content.js`. Services, secteurs et offres sont des textes de départ à adapter. Les concepts sectoriels et pages légales incomplètes sont identifiés comme exemples. Aucun témoignage, membre d’équipe ou chiffre commercial n’est inventé.

## Compilation, tests et production

```powershell
npm run build
npm run test:cms
npm start
```

Après compilation, Express sert le site ET l’API sur le port 4000. Les pages publiques sont rendues côté serveur avec titres SEO, Open Graph, canonique et contenu HTML indexable. Vite en développement sert une SPA ; vérifier le HTML indexable sur le serveur Express compilé.

Pour un hébergement Node persistant :

1. Installer Node 24, exécuter `npm ci` puis `npm run build`.
2. Définir NODE_ENV=production, PUBLIC_URL et FRONTEND_URL sur la même origine HTTPS du site, SESSION_SECRET aléatoire d’au moins 32 caractères, ADMIN_EMAIL et ADMIN_PASSWORD (12 à 128 caractères) pour le premier compte.
3. Définir SQLITE_PATH et MEDIA_DIR sur des volumes durables, ou fournir MONGODB_URI et un volume média durable. Conserver SESSION_SECRET : il protège notamment les secrets SMTP.
4. Démarrer `npm start` sous un gestionnaire de processus. Mettre un reverse proxy HTTPS devant Express. HOST=0.0.0.0 uniquement si l’hébergeur le nécessite ; TRUST_PROXY=1 uniquement derrière un proxy de confiance unique.
5. Tester connexion, formulaire, email et restauration sur cet hébergement. Les cookies sont Secure en production : utiliser HTTPS.

Un hébergement statique seul ou un système de fichiers éphémère ne suffit pas pour cette version. La route `/admin`, les aperçus et les API sont exclus de l’indexation. `sitemap.xml` et `robots.txt` sont générés depuis les données publiées. Les changements de slug créent des redirections 301.

Pour créer un administrateur via terminal, définir ADMIN_EMAIL/ADMIN_PASSWORD puis `npm run create-admin`. Pour réinitialiser explicitement ce seul compte : `npm run create-admin --workspace backend -- --reset-password`. Cette opération invalide ses sessions et liens de récupération ; elle ne supprime aucun autre compte.

Pour une sauvegarde complète SQLite, arrêter le processus proprement puis copier le répertoire contenant la base (y compris les éventuels fichiers WAL/SHM), le répertoire média et la configuration secrète dans un stockage privé. Redémarrer ensuite. Pour MongoDB, utiliser les sauvegardes du fournisseur avec le volume média et les secrets correspondants. Tester la restauration hors production.

## Éléments à renseigner avant une ouverture publique

Coordonnées finales INNOVIA, identité légale et politique de conservation, contenus commerciaux validés, domaine et SMTP. Le compte local sert au démarrage. Le projet n’est pas déployé sur un hébergement public par cette intervention.

Les tests d’intégration CMS vérifient les brouillons, la publication, les permissions, les médias et la persistance.

## Structure du projet

- `frontend/` : site React, administration CMS, styles et médias publics.
- `backend/` : API Express, stockage, migrations et scripts de compilation/tests.
- `shared/` : modèles de contenu utilisés par le frontend et le backend.
- `package.json` et `package-lock.json` : commandes et dépendances des deux workspaces.
- `backend/.env.example` : exemple de configuration ; les fichiers `.env` locaux restent privés.
