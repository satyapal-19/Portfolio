/**
 * Vercel serverless: POST /api/contact → {origin}/api/contact
 * Set BACKEND_URL or VITE_API_URL in Vercel to your Express API origin (no trailing slash).
 * BACKEND_URL is preferred for the proxy only; VITE_API_URL also works so one env var is enough.
 */
function backendOrigin() {
  let s = (process.env.BACKEND_URL || process.env.VITE_API_URL || '').trim().replace(/\/$/, '');
  if (!s) return '';
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  return s;
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const base = backendOrigin();
  if (!base) {
    return res.status(503).json({
      success: false,
      message:
        'Contact API is not configured. In Vercel → Settings → Environment Variables, set VITE_API_URL or BACKEND_URL to your API origin (e.g. https://xxx.up.railway.app), then redeploy.',
    });
  }

  let body;
  try {
    body = await getJsonBody(req);
  } catch {
    return res.status(400).json({ success: false, message: 'Invalid JSON body' });
  }

  const url = `${base}/api/contact`;

  let upstream;
  try {
    upstream = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error('Contact proxy fetch failed:', err.message);
    return res.status(502).json({
      success: false,
      message: 'Could not reach the contact server. Please try again later.',
    });
  }

  const text = await upstream.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { success: false, message: text || 'Unexpected response from server' };
  }
  res.status(upstream.status).json(data);
}

function getJsonBody(req) {
  if (req.body != null && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return Promise.resolve(req.body);
  }
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}
