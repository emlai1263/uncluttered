const mongoose = require('mongoose')
const { Schema } = mongoose;

const taskSchema = new Schema({
  type: Object,
  properties: {
    task_id: { type: Schema.Types.ObjectId },
    title: { type: String },
    dueDate: { type: String },
    category: { type: String },
    timeEst: { type: Number }, // Assuming timeEst is supposed to be a floating-point number
    body: { type: String }
  }
})

const userSchema = mongoose.Schema({
  type: Object,
  properties: {
    name: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    tasks: {
      type: Array,
      properties: {
        task: [taskSchema]
      }
    }
  }
})

module.exports = userSchema;
module.exports = taskSchema;