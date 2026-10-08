# Vérification de la version INNOVIA — 7 octobre 2026

- Build Vite : réussi après les dernières modifications.
- Ordinateur 1440 × 1000, tablette 768 × 1024, mobile 390 × 844 : aucun débordement horizontal détecté.
- Menu mobile : ouverture, navigation vers les services et fermeture vérifiées.
- Ancres : services et portfolio vérifiés.
- Fiche Gym Ten Chi : ouverture, contenu, lien réel et fermeture avec Échap vérifiés.
- Sculpture : canvas WebGL actif, 11 appels de dessin par image dans le navigateur testé, DPR 1 dans cet environnement ; moteur arrêté hors écran, moteur services actif avec progression de décomposition.
- Pause : bouton passé à Reprendre, aria-pressed=true.
- Mode sans WebGL ?render=static : aucun canvas, remplacement SVG visible.
- Images : aucune image cassée détectée pendant la vérification.
- Réduction des mouvements : branches statiques vérifiées dans le code ; préférence système non modifiée pendant le test.

Limites : le contenu API revient au repli local après délai d’attente, MongoDB n’étant pas configuré. Aucun lead de test créé. Envoi réel non validé. Les shaders produisent des avertissements de précision sur le pilote du navigateur, sans erreur de rendu constatée. Le chunk Three.js différé est de 533,69 ko (133,57 ko gzip) ; Vite signale sa taille. Aucun audit Lighthouse ni mesure de performance sur appareil mobile physique n’a été effectué. Aucune vidéo Higgsfield générée.

## Contrôles après réorganisation

- node frontend/scripts/check-public-content.mjs : 8 assertions réussies sur les offres personnalisées/masquées, les listes vides, la visibilité des projets et les étapes historiques/personnalisées.
- Navigateur : offre Pack Digital ajoutée au brouillon de contact ; simulation e-commerce transférée avec périmètre, options et fourchette indicative. Aucun formulaire envoyé.
- Navigation ordinateur : Services, Projets, Modèles, Méthode, Offres et contact présents.
- Navigation mobile et offres : aucun débordement horizontal à 390 px ; titres et offres visibles. Correction de la réinitialisation des apparitions sous React StrictMode.
- /admin : écran de connexion chargé, API indiquée connectée. Authentification et enregistrement MongoDB non testés sans configuration/identifiants.
- Sculpture : ouverture procédurale et matériaux indépendants, moteur WebGL actif. Visuel de matière JPEG : environ 143 Ko, chargement différé.

## Version avec menu et pages projets

- 14 contrôles automatisés réussis : contrats CMS, visibilité, processus, slugs accentués, adresses invalides, routes et rendu des pages projets.
- Build de production réussi. Chunk Three.js différé : 564,00 ko, 143,23 ko gzip ; avertissement Vite de taille conservé.
- Menu plein écran à 1440 × 1000 et 390 × 844 : sections lisibles, focus initial sur Fermer, fermeture avec Échap et retour au bouton, absence de débordement horizontal du document.
- Filtre IA sur mobile : un seul concept affiché ; page dédiée ouverte, focus sur le titre, aucun débordement horizontal.
- Projet Gym Ten Chi : ouverture depuis la galerie, rechargement direct de la route et retour à la galerie vérifiés sur ordinateur. Aperçu rapide et fermeture au clavier vérifiés.
- Exploration 3D : finition Chrome puis Verre, rotation par bouton, recentrage et véritable glissement à la souris vérifiés par l’état de la scène.
- Captures dans `docs/previews` : menu ordinateur/mobile et page projet mobile.
- Validation du formulaire renforcée après suppression des espaces : nom minimum deux caractères, message minimum dix. Aucun lead envoyé. Le mode système de réduction des mouvements reste vérifié dans le code uniquement.

La gestion admin est conservée, mais sa sauvegarde et l’enregistrement des demandes restent à valider avec MongoDB configuré. Le formulaire confirme l’enregistrement API, sans promettre un email SMTP. Aucun score Lighthouse ni performance sur téléphone physique n’est revendiqué.

## Monogramme N et bibliothèques

- N en cinq pièces aligné sur le logo existant, profil moins profond, cadrage adaptatif. Cinq appels de dessin en finition Signature dans le navigateur testé. Diagonale avancée pour éviter les surfaces coplanaires et le scintillement.
- Skiper UI Link000 intégré au contact de l’accueil ; CornerButton Vengeance UI intégré au formulaire, type submit et couleur champagne vérifiés sans envoi.
- Mobile 390 px : aucun débordement horizontal ; bouton contact de 198 × 52 px dans le viewport.
- 14 contrôles automatisés réussis après ces modifications. Build réussi ; chunk Three.js différé d’environ 536 Ko, avertissement Vite de taille conservé.
- Higgsfield : brouillon 360 Orbit configuré par WebMCP ; vérification de retour confirme prompt et enhancement=false. Génération non soumise : authentication_required, prix affiché 60 crédits. Capture higgsfield-360-draft.jpg. Briefs Object POV et macro ajoutés ; slot sculpturePov ajouté aux services.
