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

// list all tasks from user with id
async function getTasks(userId) {
  const userModel = getDbConnection().model('User', userSchema)
  const taskModel = getDbConnection().model('Task', taskSchema)
  // make sure the user is valid
  try {
    await userModel.findById(userId)
  } catch (error) {
    console.log('User not found')
    return undefined
  }

  const tasks = taskModel.find({ userId }) // check what comes here
  console.log(tasks)
  return tasks
}

// get single task thru taskID
async function getSingleTask(taskID) {
  const taskModel = getDbConnection().model('Task', taskSchema)
  const task = await taskModel.findOne({ _id: taskID })
  console.log(task)
  return task
}

// delete a task by its ID
async function deleteTask(taskID) {
  const taskModel = getDbConnection().model('Task', taskSchema)
  try {
    console.log('task deleted')
    return await taskModel.findByIdAndDelete(taskID)
  } catch (error) {
    console.log(error)
    return undefined
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

module.exports = {
  getTasks,
  getSingleTask, 
  deleteTask,
  addTask,
  editTask
}
