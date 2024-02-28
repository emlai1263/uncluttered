const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  type: object,
  properties: {
    id: { type: String },
    name: { type: String },
    dueDate: { type: String },
    category: { type: String },
    password: { type: String },
    timeEstimate: { type: float },
    taskBody: { type: String }
  }
})

const userSchema = mongoose.Schema({
  type: object,
  properties: {
    name: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    task_list: {
      type: Array,
      properties: {
        task: [taskSchema]
      }
    }
  }
})
