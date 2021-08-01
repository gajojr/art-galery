require('dotenv').config({ path: '../.env' });
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        res.contentType('text/plain');
        res.send('You are not authenticated, you need a token!');
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: 'Auth failed' });
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
}

module.exports = verifyJWT;