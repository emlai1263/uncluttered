const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskSchema = require('./task');
const userSchema = require('./userSchema');
const categorySchema = require('./categorySchema');

dotenv.config();

let dbConnection;
function getDbConnection() {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Initialize models
    // dbConnection.model('Task', taskSchema);
    // dbConnection.model('User', userSchema);
    // dbConnection.model('Category', categorySchema);
  }
  return dbConnection;
}

// Use getDbConnection to get the models
// const Task = getDbConnection().model('Task');
// const User = getDbConnection().model('User');
// const Category = getDbConnection().model('Category');

async function getTasks(userId) {
  const taskModel = getDbConnection().model('Task', taskSchema);
  try {
    const tasks = await taskModel.find({ userId, deleted: false }).populate('category');
    console.log('Tasks retrieved:', tasks);
    return tasks;
  } catch (error) {
    console.log('Error fetching tasks:', error);
    return undefined;
  }
}

async function getDeletedTasks(userId) {
  const taskModel = getDbConnection().model('Task', taskSchema);
  try {
    const deletedTasks = await taskModel.find({ userId: userId, deleted: true });
    console.log('Deleted tasks retrieved for user:', deletedTasks);
    return deletedTasks;
  } catch (error) {
    console.log('Error fetching deleted tasks for user:', error);
    return [];
  }
}

async function permanentlyDeleteTask(taskID) {
  const taskModel = getDbConnection().model('Task', taskSchema);
  try {
    const task = await taskModel.findById(taskID);
    if (!task) {
      console.log('No task found with ID:', taskID);
      return null;
    }
    const result = await taskModel.findByIdAndDelete(taskID);
    console.log('Task permanently deleted:', result);
    return result;
  } catch (error) {
    console.log('Error permanently deleting task:', error);
    return undefined;
  }
}

async function getSingleTask(taskID) {
  const taskModel = getDbConnection().model('Task', taskSchema);
  try {
    const task = await taskModel.findOne({ _id: taskID }).populate('category');
    console.log(task);
    return task;
  } catch (error) {
    console.log('Error fetching single task:', error);
    return undefined;
  }
}

async function markTaskAsDeleted(taskID) {
  const taskModel = getDbConnection().model('Task', taskSchema);
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(taskID, { deleted: true }, { new: true });
    console.log('Task marked as deleted');
    return updatedTask;
  } catch (error) {
    console.log('Error marking task as deleted:', error);
    return undefined;
  }
}

async function addTask(task) {
  const taskModel = getDbConnection().model('Task', taskSchema);
  try {
    const taskToAdd = new taskModel(task);
    const savedTask = await taskToAdd.save();
    return savedTask;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function editTask(taskId, taskEdits) {
  const taskModel = getDbConnection().model('Task', taskSchema);
  try {
    const editedTask = await taskModel.findOneAndUpdate(
      { _id: taskId },
      taskEdits,
      //{ new: true }
      { returnOriginal: false }
    );
    return editedTask;
  } catch (error) {
    console.log('Failed to edit task');
    return false;
  }
}

async function recoverTask(taskID) {
  const taskModel = getDbConnection().model('Task', taskSchema);
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(taskID, { deleted: false }, { new: true });
    console.log('Task recovered:', updatedTask);
    return updatedTask;
  } catch (error) {
    console.log('Error recovering task:', error);
    return null;
  }
}

async function deleteAllTasks(userId) {
  const taskModel = getDbConnection().model('Task', taskSchema);
  try {
    const result = await taskModel.deleteMany({ userId: userId, deleted: true });
    console.log('Deleted tasks count:', result.deletedCount);
    return result;
  } catch (error) {
    console.error('Error deleting all tasks for user:', error);
    throw error;
  }
}

module.exports = {
  getTasks,
  getSingleTask,
  markTaskAsDeleted,
  getDeletedTasks,
  permanentlyDeleteTask,
  addTask,
  editTask,
  recoverTask,
  deleteAllTasks
};
