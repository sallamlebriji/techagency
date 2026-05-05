# TechAgency

Site vitrine moderne pour une agence technologique, créé avec React, Vite, Tailwind CSS, Framer Motion et Lucide React.

## Prérequis

Installe Node.js LTS avant de lancer le projet :

- Téléchargement : https://nodejs.org/
- Sur Windows avec winget :

```powershell
winget install OpenJS.NodeJS.LTS
```

Ferme puis rouvre PowerShell après l'installation, puis vérifie :

```powershell
node --version
npm --version
```

Si `node` ou `npm` n'est toujours pas reconnu sur ce PC, ajoute temporairement le dossier Node au PATH de la session :

```powershell
$nodeDir = "C:\Users\SALLAM\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v24.15.0-win-x64"
$env:Path = "$nodeDir;$env:Path"
node --version
npm --version
```

## Installation

Depuis le dossier du projet :

```powershell
cd F:\SALLAM\TechAgency
npm install
npm run dev
```

Ouvre ensuite l'URL affichée par Vite, généralement :

```text
http://localhost:5173
```

## Build production

```powershell
npm run build
npm run preview
```
