const mongoose =require('mongoose')
const Schema = mongoose.Schema;

const {ObjectId} = require("./User")

const Todo = new Schema({
    userId: ObjectId,
    title: String,
    description: String,
    done: Boolean,
    
})
const TodoModel = mongoose.model("todos", Todo);

module.exports = TodoModel;