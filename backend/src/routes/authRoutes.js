const express = require('express');
const { signup, signin } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  res.json({
    message: 'Your are authenticated',
  });
});

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
