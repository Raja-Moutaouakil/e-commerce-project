const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
} ); );
app.use(express.json());
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/favicon.ico', express.static(path.join(__dirname, '../client/dist/favicon.ico')));
app.get('/', (req, res) => {
  res.send('Botanica API running');
});

module.exports = app;