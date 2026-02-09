const app = require('../app');

// Vercel catch‑all serverless function for /api/*
module.exports = (req, res) => app(req, res);
