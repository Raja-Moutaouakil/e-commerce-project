const app = require('../app');

// Vercel serverless catch-all function: forwards all /api/* to the Express app
module.exports = (req, res) => app(req, res);

