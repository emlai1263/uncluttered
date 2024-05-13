const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: Object,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      default: 'title',
      trim: true
    },
    dueDate: {
      type: Date,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      default: 'category',
      trim: true
    },
    status: {
      type: String,
      default: "To Do",
      enum: ["To Do", "In Progress", "Complete"],
      required: true,
      trim: true
    },
    timeEst: {
      type: Number,
      trim: true
    },
    body: {
      type: String,
      default: 'body',
      trim: true
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { collection: 'tasks' }
)

// const Task = mongoose.model("Task", taskSchema);
// module.exports = Task;

module.exports = taskSchema
