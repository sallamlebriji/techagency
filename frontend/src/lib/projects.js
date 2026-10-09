import { flushSync } from 'react-dom';

export function decodeProjectSlug(value) {try {return decodeURIComponent(value);}catch{return value;}}
export function projectSlug(project) {
  const title = String(project.slug || project.title || 'projet').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return project.id ? `${title}-${project.id}` : title;
}
export function projectPath(project) { return `/projets/${encodeURIComponent(projectSlug(project))}`; }
export function projectCategory(project) {
  if (project.category) return project.category;
  const text = `${project.title} ${project.description} ${project.technologies}`.toLowerCase();
  if (/chatbot|intelligence artificielle|\bia\b|\bai\b/.test(text)) return 'Intelligence artificielle';
  if (/mobile|react native/.test(text)) return 'Mobile';
  if (/site|vitrine|commerce/.test(text)) return 'Sites web';
  return 'Applications métier';
}
export function visibleProjects(source) {
  return source.filter(project => project.visible !== false).map(project => ({...project,url:externalProjectUrl(project),category:projectCategory(project),technologies:Array.isArray(project.technologies)?project.technologies:String(project.technologies||'').split(',').map(value=>value.trim()).filter(Boolean)}));
}
export function externalProjectUrl(project) {
  try { const url = new URL(project.url); return ['https:','http:'].includes(url.protocol)?url.href:''; } catch { return ''; }
}
export function followProjectLink(event, href) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const change = () => { flushSync(()=>{history.pushState({}, '', href); window.dispatchEvent(new PopStateEvent('popstate'));}); };
  if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) document.startViewTransition(change);
  else change();
}
