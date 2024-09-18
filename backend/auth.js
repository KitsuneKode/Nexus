require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

function auth(req, res, next) {
  const authorization = req.headers.authorization;
  const decodedData = jwt.verify(authorization, JWT_SECRET);

  if (decodedData.username) {
    req.username = decodedData.username;
    next();
  } else {
    res.json({
      message: 'You are not logged in',
    });
  }
}

module.export = {
  auth,
  JWT_SECRET,
};
