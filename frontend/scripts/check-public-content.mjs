import { build } from 'esbuild';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Verify CMS behavior without a database, credentials or creating a lead.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const result = await build({
  stdin: { resolveDir: root, loader: 'jsx', contents: `
    import assert from 'node:assert/strict';
    import React from 'react';
    import { renderToStaticMarkup as render } from 'react-dom/server';
    import Pricing from './src/components/Pricing.jsx';
    import Portfolio from './src/components/Portfolio.jsx';
    import Process from './src/components/Process.jsx';
    import ProjectPage from './src/components/ProjectPage.jsx';
    import {projectSlug,projectPath,decodeProjectSlug,externalProjectUrl} from './src/lib/projects.js';
    const offers = [{name:'Offre CMS personnalisée',price:'Sur devis',features:['Support dédié']},{name:'Offre masquée',visible:false}];
    const pricing = render(<Pricing offers={offers}/>);
    assert(pricing.includes('Offre CMS personnalisée'));
    assert(pricing.includes('Support dédié'));
    assert(!pricing.includes('Offre masquée'));
    assert(!render(<Pricing offers={[]}/>).includes('Pack Digital'));
    assert(!render(<Portfolio loadedProjects={[]}/>).includes('Gym Ten Chi'));
    assert(!render(<Portfolio loadedProjects={[{title:'Projet masqué',visible:false}]}/>).includes('Projet masqué'));
    const process = render(<Process settings={{processItems:'Audit validé|Analyse du périmètre\\nRecette client|Validation avant livraison'}}/>);
    assert(process.includes('Audit validé') && process.includes('Recette client'));
    assert(!process.includes('Conception UI/UX'));
    const fallback = render(<Process/>);
    assert(fallback.includes('Test et validation') && fallback.includes('Amélioration continue'));
    assert.equal(projectSlug({title:'Étude de cas',id:42}),'etude-de-cas-42');
    assert.equal(projectPath({title:'Étude de cas',id:42}),'/projets/etude-de-cas-42');
    assert.equal(decodeProjectSlug('%invalid'),'%invalid');
    assert.equal(externalProjectUrl({url:'javascript:alert(1)'}),'');
    const unavailable=render(<ProjectPage slug="projet-masque" loadedProjects={[{title:'Projet masqué',visible:false}]}/>);
    assert(unavailable.includes('Projet indisponible.'));
    const caseHtml=render(<ProjectPage slug="test-cms-42" loadedProjects={[{title:'Test CMS',id:42,description:'Contenu réel du CMS',technologies:'React,Node.js'}]}/>);
    assert(caseHtml.includes('Contenu réel du CMS')&&caseHtml.includes('React · Node.js'));
    console.log('14 contrôles réussis : CMS, visibilité, processus, routes et pages projets.');
  ` },
  jsx: 'automatic', bundle: true, platform: 'node', format: 'cjs', write: false, logLevel: 'silent',
});
const testModule = { exports: {} };
new Function('require', 'module', 'exports', result.outputFiles[0].text)(createRequire(import.meta.url), testModule, testModule.exports);
