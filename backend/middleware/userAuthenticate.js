const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../lib/lib');
exports.userAuthenticate = (req, res, next) => {
    const token = req.cookies.userToken || req.headers.authorization
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }
    
    try {
        const decoded = jwt.verify(token, jwt_secret);
        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}