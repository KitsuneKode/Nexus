require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL;

console.log(MONGO_DB_URL);

const mongoose = require('mongoose');

mongoose
  .connect(MONGO_DB_URL)
  .then(() => console.log('connected to the db'))
  .catch((e) => console.error('Failed to connect to db', e));

connectToDatabase();

const schema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  creationDate: String,
});
