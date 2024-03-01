const taskModel = require("./task");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const taskSchema = require("./userSchema");
dotenv.config();

async function getTasksForUser(user) {
  const userModel = getDbConnection().model("User", userSchema);
  const user = await userModel.findOne({ name: user });
  if (!user) {
    throw new Error("User not found");
  }
  
  const tasks = user.tasks; // Accessing the 'tasks' array from the 'pet' object
  return tasks;
}

// async function findUserById(id) {
//   // try {
//   return await petModel.findById(id);
//   // } catch (error) {
//   //   console.log(error);
//   //   return undefined;
//   // }
// }

async function addTask(user, task) {
  const userModel = getDbConnection().model("User", userSchema);
  try {
    // Find the user by ID
    const existingUser = await userModel.findUserByName(user);
    
    if (!existingUser) {
      throw new Error("User not found");
    }
    
    // Add the task to the tasks array in the user object
    existingUser.tasks.push(task);
    
    // Save the updated user object
    const savedUser = await existingUser.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserByName(name) {
  const userModel = getDbConnection().model("User", userSchema);
  return await userModel.find({ name: name });
}

async function findPetByType(type) {
  return await petModel.find({ type: type });
}

async function findPetByNameAndType(name, type) {
  return await petModel.find({ name: name, type: type });
}

async function deletePet(id) {
  return await petModel.findByIdAndDelete(id);
}

// async function disconnectDB() {
//   await mongoose.connection.close();
//   await mongoose.disconnect();
// }

exports.getPets = getPets;
exports.findPetById = findPetById;
exports.findPetByName = findPetByName;
exports.findPetByType = findPetByType;
exports.findPetByNameAndType = findPetByNameAndType;
exports.addPet = addPet;
exports.deletePet = deletePet;
// exports.disconnectDB = disconnectDB;