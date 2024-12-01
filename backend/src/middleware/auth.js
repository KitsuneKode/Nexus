const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Check if user is verified for admin enabled features
    // if (!user.isVerified) {
    //   return res.status(403).json({ message: 'User account is not verified' });
    // }

    // If everything is good, save user info to request object
    req.userId = user._id;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    if (error.name === 'TypeError') {
      return res.status(401).json({ message: 'Token is not provided' });
    }

    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};
