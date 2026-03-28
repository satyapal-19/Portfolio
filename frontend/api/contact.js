/**
 * Vercel serverless: POST /api/contact → BACKEND_URL/api/contact
 * Set BACKEND_URL in Vercel (server env) to your Express API origin, no trailing slash
 * (e.g. https://your-app.up.railway.app). Keeps the SPA on same-origin /api/contact.
 */
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

  const base = process.env.BACKEND_URL;
  if (!base || !base.startsWith('http')) {
    return res.status(503).json({
      success: false,
      message:
        'Contact API is not configured. In Vercel Project → Environment Variables, set BACKEND_URL to your deployed backend URL (e.g. https://xxx.up.railway.app).',
    });
  }

  let body;
  try {
    body = await getJsonBody(req);
  } catch {
    return res.status(400).json({ success: false, message: 'Invalid JSON body' });
  }

  const url = `${base.replace(/\/$/, '')}/api/contact`;

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
