require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Required for Railway/Render/Heroku — they sit behind a reverse proxy.
// This lets express-rate-limit correctly read the real client IP from
// the X-Forwarded-For header instead of throwing ERR_ERL_UNEXPECTED_X_FORWARDED_FOR.
app.set('trust proxy', 1);

function buildAllowedOrigins() {
  const set = new Set([
    'http://localhost:5173',
    'https://satyapalgaikwad.vercel.app',
  ]);
  const fromEnv = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  fromEnv.forEach((o) => set.add(o));
  if (process.env.CLIENT_URL) set.add(process.env.CLIENT_URL.trim());
  return set;
}

const allowedOrigins = buildAllowedOrigins();
const allowVercelPreviews = process.env.CORS_ALLOW_VERCEL_PREVIEWS === 'true';

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.has(origin)) return callback(null, true);
      if (allowVercelPreviews) {
        try {
          const host = new URL(origin).hostname;
          if (host === 'vercel.app' || host.endsWith('.vercel.app')) {
            return callback(null, true);
          }
        } catch {
          /* ignore */
        }
      }
      return callback(null, false);
    },
    methods: ['GET', 'POST'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/contact', require('./routes/contact'));

app.get('/', (req, res) => {
  res.json({ message: 'Satyapal Portfolio API running', status: 'OK' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
