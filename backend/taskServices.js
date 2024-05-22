/* eslint-disable space-before-function-paren */
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userSchema = require('./userSchema')
const taskSchema = require('./Task')
dotenv.config()

let dbConnection
function getDbConnection() {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }
  return dbConnection
}

// // list all tasks from user with id
// async function getTasks(userId) {
//   const userModel = getDbConnection().model('User', userSchema)
//   const taskModel = getDbConnection().model('Task', taskSchema)
//   // make sure the user is valid
//   try {
//     await userModel.findById(userId)
//   } catch (error) {
//     console.log('User not found')
//     return undefined
//   }

//   const tasks = taskModel.find({ userId }) // check what comes here
//   console.log(tasks)
//   return tasks
// }

async function getTasks(userId) {
  const taskModel = getDbConnection().model('Task', taskSchema);
  try {
    const tasks = await taskModel.find({ userId, deleted: false });
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


// get single task thru taskID
async function getSingleTask(taskID) {
  const taskModel = getDbConnection().model('Task', taskSchema)
  const task = await taskModel.findOne({ _id: taskID })
  console.log(task)
  return task
}

// // delete a task by its ID
// async function deleteTask(taskID) {
//   const taskModel = getDbConnection().model('Task', taskSchema)
//   try {
//     console.log('task deleted')
//     return await taskModel.findByIdAndDelete(taskID)
//   } catch (error) {
//     console.log(error)
//     return undefined
//   }
// }

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



// add task
// as of now, it works by using postman to add a json of the task
async function addTask(task) {
  const TaskModel = getDbConnection().model('Task', taskSchema)
  try {
    // passing the JSON content of the Document:
    const taskToAdd = new TaskModel(task)
    const savedTask = await taskToAdd.save()
    return savedTask
  } catch (error) {
    console.log(error)
    return false
  }
}

// edit tasks
async function editTask(taskId, taskEdits) {
  const taskModel = getDbConnection().model('Task', taskSchema)
  try {
    const editedTask = await taskModel.findOneAndUpdate(
      { _id: taskId },
      taskEdits,
      { returnOriginal: false }
    )
    return editedTask
  } catch (error) {
    //console.log('Failed to edit task')
    return false
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

// Function to delete all tasks for a user
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
}

