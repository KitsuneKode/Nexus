const express = require('express');
const auth = require('../middleware/auth');
const Todo = require('../models/Todo');

const router = express.Router();

//Fetch all todo
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.status(200).json({
      messsage: 'Todos fetched successfully',
      todos,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching todos', error: error.message });
  }
});

//Creates a new Todo
router.post('/', auth, async (req, res) => {
  try {
    let { title, description, done } = req.body;
    if (!description) description = '';
    if (typeof req.body.done === 'undefined') done = false;
    const todo = await Todo.create({
      userId: req.userId,
      title,
      description,
      done,
    });
    res.status(201).json({
      message: 'Successfully created todo',
      title: todo.title,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error creating todo', error: err.message });
  }
});

//Get todo by id
router.get('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findbyId(req.userId);
    res.status(200).json({
      messsage: 'Todo fetched successfully',
      todo,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching the todo', error: error.message });
  }
});

//Update a todo
router.put('/:id', auth, async (req, res) => {
  try {
    const updateFields = {};
    // Only include fields that are present in the request body
    if (req.body.title) updateFields.title = req.body.title;
    if (req.body.description) updateFields.description = req.body.description;
    if (typeof req.body.done !== 'undefined') updateFields.done = req.body.done;

    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
      },
      updateFields,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo was updated', todo });
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error Updating Todo', error: err.message });
  }
});

//delete a todo
router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo was deleted' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error deleting todo', error: err.message });
  }
});

module.exports = router;
