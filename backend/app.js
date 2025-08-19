// backend/app.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDb = require("./config/dbConnection"); // your existing DB connector
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

connectDb(); // keep this for now

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.use("/api", reviewRoutes);
app.use("/api", userRoutes);

// quick health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

module.exports = app; // <-- export, don't listen here
