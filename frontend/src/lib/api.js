const configuredApiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, '') || '';
const apiBaseUrl = configuredApiUrl.endsWith('/api') ? configuredApiUrl.slice(0, -4) : configuredApiUrl;

export function apiUrl(path) {
  return `${apiBaseUrl}${path}`;
}

export function getApiBaseUrl() {
  return apiBaseUrl || 'same-origin';
}
