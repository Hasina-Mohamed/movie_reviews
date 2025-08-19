// backend/server.js
require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Local API running on http://localhost:${port}`));
