const express = require("express");
const cors = require("cors");
const connectDb = require("./config/dbConnection");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.use('/api', reviewRoutes)
app.use('/api', userRoutes)
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});