import React from 'react';
import {renderToString} from 'react-dom/server';
import PublicSite,{resolvePage} from './cms/PublicSite.jsx';
export function render(content,path){return{html:renderToString(<PublicSite content={content} path={path}/>),page:resolvePage(content,path)};}
