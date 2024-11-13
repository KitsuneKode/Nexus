const express = require('express');
const { signup, signin } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  res.status(401).json({
    message: 'Your are authenticated',
  });
});

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
