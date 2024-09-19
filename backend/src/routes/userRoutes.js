const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Todo = require('../models/Todo');
const bcrypt = require('bcrypt');

const router = express.Router();

//Fetch profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = User.findById(req.userId).select('-password ');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error Fetching profile', error: error.message });
  }
});

//Update profile
router.put('/me', auth, async (req, res) => {
  try {
    const updateFields = {};
    // Only include fields that are present in the request body
    if (req.body.username) updateFields.title = req.body.username;
    if (req.body.email) updateFields.description = req.body.email;
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updateFields.password = hashedPassword;
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error Updating profile', error: error.message });
  }
});

//delete an user
router.delete('/me', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const deletedTodos = await Todo.deleteMany({ userId: req.userId });

    // If no todos were found
    if (deletedTodos.deletedCount === 0) {
      console.log('No todos found for this user.');
    }
    res.json({ message: 'User was deleted' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error deleting user', error: err.message });
  }
});

module.exports = router;
