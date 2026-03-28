/**
 * Contact API URL.
 * - Local dev: leave VITE_API_URL unset; Vite proxies /api → backend (vite.config.js).
 * - Production: set VITE_API_URL to your deployed API origin (no trailing slash), e.g. https://api.example.com
 */
const base = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const contactSubmitUrl = base ? `${base}/api/contact` : '/api/contact';
