const dotenv = require('dotenv');
dotenv.config();
const jwt_secret = process.env.ACCESS_TOKEN_SECRET;
module.exports = {
    jwt_secret,
}