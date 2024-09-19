const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  done: Boolean,
});
const todoModel = mongoose.model('todos', todoSchema);

module.exports = todoModel;
