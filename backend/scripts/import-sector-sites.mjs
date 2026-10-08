// One-time, explicit import of the six supplied sites into an existing CMS.
// Preserves unrelated content and unpublished changes; keeps a recovery snapshot.
import dotenv from 'dotenv';
import path from 'node:path';
import {sectorSiteSeeds} from '../../shared/sector-sites.js';
import {initialContent} from '../../shared/content.js';
const root=path.resolve(import.meta.dirname,'../..');
for(const file of ['backend/.env.local','backend/.env','.env'])dotenv.config({path:path.join(root,file),quiet:true});
const {initializeStore,read,write,compareWrite}=await import('../src/store.js');
await initializeStore();
const state=await read('content','state');
if(!state)throw new Error('Le CMS doit être initialisé avant cet import.');
const marker='sector-sites-2026-10';
if(await read('migration',marker)){
 console.log('Sites déjà importés ; les modifications du CMS sont conservées.');
 process.exit(0);
}
const update=content=>{
 const result=structuredClone(content);
 for(const site of sectorSiteSeeds){
  const entry=result.sectors.find(x=>x.id===site.id);
  if(entry)Object.assign(entry,{image:site.image,imageAlt:site.imageAlt,demoUrl:site.demoUrl,siteName:site.siteName});
  else result.sectors.push(structuredClone(initialContent.sectors.find(x=>x.id===site.id)));
 }
 return result;
};
const at=new Date().toISOString();
const snapshot='before-sector-sites-'+Date.now();
await write('migration',snapshot,state);
const next={...state,draft:update(state.draft),published:update(state.published),revision:state.revision+1,publishedAt:at};
// The draft may contain other edits, so it is not marked as fully published.
if(!await compareWrite('content','state',state.revision,next))throw new Error('Contenu modifié pendant l’import. Relancer après vérification.');
await write('migration',marker,{at,snapshot});
const id=crypto.randomUUID();
await write('audit',id,{id,user:'system',action:'import-sites',detail:'Six sites ajoutés aux aperçus des secteurs ; autres contenus conservés.',at});
console.log('Six sites importés. Sauvegarde : '+snapshot);
process.exit(0);
