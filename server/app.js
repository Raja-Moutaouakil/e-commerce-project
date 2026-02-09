const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Simple request logger to help diagnose production issues (origin, method, path)
app.use((req, res, next) => {
  try {
    const origin = req.headers.origin || '-';
    const ua = req.headers['user-agent'] || '-';
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} | Origin: ${origin} | UA: ${ua}`);
  } catch (_) {
    // ignore logging errors
  }
  next();
});

// CORS: allow configured client origins in production; default to common localhost origins in dev
const defaultOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:8080',
  'http://localhost:8081',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:8080',
  'http://127.0.0.1:8081',
];
const envOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const allowedOrigins = envOrigins.length ? envOrigins : defaultOrigins;

console.log('CORS allowed origins:', allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      console.log('CORS request Origin:', origin);
      if (!origin) return callback(null, true); // allow tools/curl
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
// Optional admin routes (only mount if present)
try {
  // eslint-disable-next-line global-require, import/no-unresolved
  app.use('/api/admin', require('./routes/adminRoutes'));
} catch (e) {
  // ignore if adminRoutes not present
}
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Silence favicon requests (API does not serve a site icon)
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/', (req, res) => {
  res.send('Botanica API running');
});

module.exports = app;
