# TechAgency

Site vitrine TechAgency separe en deux applications :

- `frontend/` : React, Vite, Tailwind CSS, Framer Motion et Lucide React.
- `backend/` : API Express, MongoDB et authentification admin.

## Prerequis

Installe Node.js LTS avant de lancer le projet.

```powershell
node --version
npm --version
```

## Installation

Depuis la racine du projet :

```powershell
cd F:\SALLAM\TechAgency
npm install
```

## Developpement

Lancer frontend et backend ensemble :

```powershell
npm run dev
```

Commandes separees :

```powershell
npm run dev:frontend
npm run dev:backend
```

URLs locales par defaut :

```text
Frontend: http://localhost:5173
Backend:  http://127.0.0.1:4000
```

Le frontend utilise le proxy Vite pour `/api` en local.

## Variables d'environnement

Backend :

```powershell
Copy-Item .env.example .env
```

Tu peux aussi creer un fichier `backend/.env`.

Frontend :

```powershell
Copy-Item frontend\.env.example frontend\.env
```

En local, `VITE_API_URL` peut rester vide grace au proxy. En production, mets l'URL Render du backend.

## Build production

```powershell
npm run build
npm run preview
```

Le build frontend sort dans `frontend/dist`.
