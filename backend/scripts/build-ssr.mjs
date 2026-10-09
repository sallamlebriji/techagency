import {build} from 'esbuild';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'../..');
await build({entryPoints:[path.join(root,'frontend/src/server.jsx')],outfile:path.join(root,'backend/.generated/ssr.mjs'),bundle:true,platform:'node',format:'esm',jsx:'automatic',packages:'external',define:{'import.meta.env.VITE_API_URL':'""'}});
console.log('Rendu serveur compilé.');
