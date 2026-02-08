const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const allowedOrigins = [
  'https://botanica-hair.vercel.app',
  'https://e-server-kappa.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/favicon.ico', express.static(path.join(__dirname, '../client/dist/favicon.ico')));
app.get('/', (req, res) => {
  res.send('Botanica API running');
});

module.exports = app;