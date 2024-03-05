const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: Object,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      default: "title",
    },
    dueDate: {
      type: Date,
      trim: true,
    },
    category: {
      type: String,
      default: "category",
    },
    timeEst: {
      type: Number,
      trim: true,
    },
    body: {
      type: String,
      default: "body",
    },
  },
  { collection: "tasks" }
);

// const Task = mongoose.model("Task", taskSchema);
// module.exports = Task;

module.exports = taskSchema;