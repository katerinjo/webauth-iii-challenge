const jwt = require('jsonwebtoken');
const secret = require('../config/secrets').jwtSecret;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if(err) {
        res.status(401).json({ message: 'invalid credentials' });
      } else {
        req.user = { username: decoded.username };
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'no credentials provided' });
  }
};
