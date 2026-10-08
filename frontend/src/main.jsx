import React from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.jsx';
import './cms/base.css';
import './cms/cms.css';
import './cms/studio.css';
const root=document.getElementById('root');
const element=<React.StrictMode><App/></React.StrictMode>;
if(root.hasChildNodes()&&window.__INNOVIA_CONTENT__)hydrateRoot(root,element);else createRoot(root).render(element);
