const mongoose = require('mongoose')
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;
const taskSchema = require("./Task");

const userSchema = mongoose.Schema({
  type: Object,
    name: {
      type: String, 
      required: true},
    username: {
      type: String,
      required: true },
    email: { 
      type: String,
      required: true },
    password: { 
      type: String,
      required: true },
    tasks: [taskSchema]
  },
  // { collection: "users" }
);

// const User = mongoose.model("User", userSchema);
// module.exports = User;

module.exports = userSchema;