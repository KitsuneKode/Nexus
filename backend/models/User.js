const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  username: String,
  email : {type: String, unique: true},
  password : String,
  joinDate : String,
})


const UserModel = mongoose.model('users', User);

module.exports = {
  UserModel,
  ObjectId
}