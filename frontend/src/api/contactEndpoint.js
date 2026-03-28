/**
 * Contact API URL.
 * - Local dev: leave VITE_API_URL unset; Vite proxies /api → backend (vite.config.js).
 * - Production: set VITE_API_URL to your API host or full origin (no trailing slash).
 *   Host-only values like `my-app.up.railway.app` get `https://` added automatically.
 */
function normalizeApiBase(raw) {
  let s = String(raw || '').trim().replace(/\/$/, '');
  if (!s) return '';
  if (!/^https?:\/\//i.test(s)) {
    s = `https://${s}`;
  }
  return s;
}

const base = normalizeApiBase(import.meta.env.VITE_API_URL);

export const contactSubmitUrl = base ? `${base}/api/contact` : '/api/contact';
