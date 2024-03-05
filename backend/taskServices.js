const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userSchema = require("./userSchema");
const taskSchema = require("./Task");
dotenv.config();

let dbConnection;
function getDbConnection() {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return dbConnection;
}

// list all tasks from user with id
async function getTasks(userId) {
  const userModel = getDbConnection().model("User", userSchema);    
  const taskModel = getDbConnection().model("Task", taskSchema);
  // make sure the user is valid
    try{
        await userModel.findById(userId);
    }catch(error) {
        console.log("User not found");
        return undefined;
    }

    tasks = taskModel.find({userId : userId});
    return tasks;
}

// delete a task by its ID
async function deleteTask(taskID) {
  const taskModel = getDbConnection().model("Task", userSchema);    
  try{
      console.log("task deleted");
      return await taskModel.findByIdAndDelete(taskID);
  }catch(error) {
      console.log(error);
      return undefined;
  }
}

// add task
async function addTask(task){
  // userModel is a Model, a subclass of mongoose.Model
  const taskModel = getDbConnection().model("Task", taskSchema);
  try{
      // passing the JSON content of the Document:
      const taskToAdd = new taskModel(task);
      const savedTask = await taskToAdd.save()
      return savedTask;
  }catch(error) {
      console.log(error);
      return false;
  }   
}

module.exports = {
  getTasks,
  deleteTask,
  addTask,
};