const express = require('express');
const { signup, signin } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/', auth, async (req, res) => {
  res.json({
    message: 'Your are authenticated',
  });
});

module.exports = router;
