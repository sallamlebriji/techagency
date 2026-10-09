# INNOVIA — Films Higgsfield : N / 360 / POV / macro

Statut au 7 octobre 2026 : brouillon 360 Orbit préparé dans Higgsfield, aucune génération soumise. Le compte n’est pas connecté (`authentication_required`). Modèle du brouillon : Seedance 2.5, enhancement désactivé ; prix affiché 60 crédits. Les crédits et modèles peuvent changer : vérifier le prix avant génération. Les vidéos sont pré-rendues ; la sculpture Three.js reste interactive.

## Référence géométrique commune

Le monogramme N reprend le signe du logo INNOVIA. Exactement cinq pièces : deux segments verticaux en chrome à gauche, deux à droite, et une diagonale en laiton reliant le haut gauche au bas droit. Une fine jonction à mi-hauteur de chaque pilier. Profil peu profond, chanfreins discrets. Aucun ancien I, aucune traverse horizontale ou colonne centrale creuse. La finition Signature est le chrome et le laiton ; le verre reste une variante interactive facultative.

Utiliser un rendu propre de frontend/src/lib/sculpture.js, entier et sans annotations. Le schéma frontend/public/innovia-sculpture.svg confirme la silhouette ; ne pas utiliser l’ancien visuel conceptuel I comme référence du monogramme. Garder le texte, le logo exact et les boutons dans le HTML.

## Commandes vérifiées

La [liste officielle des Camera Controls](https://higgsfield.ai/camera-controls) propose notamment 360 Orbit, Object POV, Dolly In, Zoom In, Focus Change et Arc Left. « Macro zoom » n’apparaît pas comme nom de preset dans cette liste : choisir Zoom In ou Dolly In et décrire la prise de vue macro dans le prompt. Les commandes disponibles dépendent du workflow et du modèle ; le brouillon vidéo préparé utilise un prompt de caméra, sans prétendre qu’un preset 360 a été sélectionné dans Cinema Studio.

## 01 — 360 Orbit / silhouette de marque

Commande de caméra : 360 Orbit. Durée cible 8 s, 1920 × 1080, 16:9 ; variante mobile 1080 × 1350. Objet entier avec marge, éclairage graphite/ivoire/champagne constant. Utilisation : sculptureLoop.

> CAMERA MOVE: 360 Orbit. Premium architectural product film of a clearly readable capital N monogram for INNOVIA. Exactly five solid components: two vertically stacked satin chrome segments on the left, two vertically stacked satin chrome segments on the right, and one warm brass diagonal connecting the upper-left to the lower-right. Thin seams halfway up each pillar. No horizontal crossbars, no central hollow column. Shallow machined depth, restrained bevels. Keep the N geometry rigid and identical throughout. Full sculpture centered with generous margins on graphite #171917, subtle ivory softbox reflections and champagne highlights. Camera smoothly circles the stationary sculpture once, starting and ending on the same front three-quarter framing. Keep its entire silhouette within frame, fixed exposure, no deformation, no extra pieces, no particles, no bloom, no typography, no buttons or interface, no audio. Target 8 seconds, 16:9. Return to the starting pose for a loop; a seamless loop must be inspected after rendering.

## 02 — Object POV / le lien entre les expertises

Commande : Object POV si proposée dans le workflow. Point de vue fixé au segment métallique en déplacement, orienté vers sa jonction à la diagonale. Durée cible 6 s, 16:9, mouvement sans secousse. Utilisation : sculpturePov, lecture manuelle dans les services.

> CAMERA MOVE: Object POV. Use the supplied five-piece capital N sculpture with chrome pillars and a brass diagonal as the exact reference. Camera attached to the lower-left chrome segment, looking toward its precise connection to the stationary upper-left pillar and brass diagonal. The segment travels slowly over a short straight path to join the assembly. Preserve all five pieces, their dimensions, material and orientation; no morphing. Minimal graphite architectural studio, soft ivory rectangular reflections, warm restrained brass accent. Stabilized point of view, no handheld shake, no camera clipping through solid metal, no sudden roll, no particles, no text or interface, no audio. Target 6 seconds, 16:9. End on a stable joined position. This is a single shot, not a looping film.

## 03 — Macro zoom / précision de la matière

Commande : Zoom In pour un rapprochement optique, ou Dolly In pour une translation physique. Ne pas cumuler les deux automatiquement. Complément : Focus Change uniquement si un changement de mise au point est voulu. Durée cible 6 s, 1920 × 820. Utilisation : materials.

> CAMERA MOVE: Dolly In. Macro product cinematography of the supplied N monogram. Start on the chrome-to-brass connection and move the camera slowly 4 cm closer over six seconds. Macro lens, controlled shallow depth of field, focus locked on the beveled joining edge. Fine satin brushing and realistic warm brass, grazing rectangular softbox light, graphite and ivory environment. Preserve the exact rigid geometry and material boundaries. No material transformation, fingerprints, fake lettering, bloom, particles, interface or audio. End with a stable close-up. Do not orbit in this shot. Target 6 seconds, 21:9.

Variante optique : remplacer CAMERA MOVE: Dolly In et le déplacement de 4 cm par CAMERA MOVE: Zoom In, fixed camera position, subtle optical zoom toward the same junction.

## 04 — Arc Left / étude de cas Gym Ten Chi

Commande : Arc Left ou Dolly In, un seul mouvement principal. Référence : vraie capture frontend/public/project-gym.jpg pour les couleurs, séparée de la vidéo. Moniteur graphite sur socle ivoire, accent orange limité au projet. Durée cible 6 s, 16:9. Utilisation : gymCase.

> CAMERA MOVE: Arc Left. Premium graphite desktop monitor on an ivory architectural pedestal. Screen shows an abstract sports website composition based on the supplied black and orange layout, with no readable text. Slow restrained three-quarter arc, entire monitor visible, soft rectangular studio reflections. Stable screen content, no invented metrics or testimonials, no typography, no logo, no buttons, people, extra screens, flicker or geometry morphing. Target 6 seconds, 16:9, no audio.

## Production et intégration

1. Se connecter à Higgsfield et contrôler le modèle, la commande disponible, le prix et le rendu de référence.
2. Générer et vérifier : cinq pièces, N lisible en pose de départ et d’arrivée, aucune déformation, lumières stables, cadrage entier. La vue arrière d’une orbite montre naturellement le revers du N ; ne pas demander une face avant constante sur 360°.
3. Exporter WebM VP9 ou MP4 H.264, sans audio. Cible indicative < 3 Mo pour 6–8 s, poster < 200 Ko. Vérifier le raccord du film 360 avant de le boucler.
4. Déposer dans frontend/public/films puis définir src dans frontend/src/data/studioMedia.js. Slots : sculptureLoop, sculpturePov, materials, gymCase. Garder les URL vides avant réception : aucune vidéo inexistante n’est annoncée.

CinematicMedia propose les contrôles natifs, charge au premier affichage, suspend hors écran et lorsque l’onglet est masqué, et montre le poster en cas d’échec ou de réduction des mouvements. Aucun son automatique.
