// api/index.js
const app = require("../backend/app");

// Vercel will call this for every /api/* request
module.exports = (req, res) => app(req, res);
