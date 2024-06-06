const mongoose = require("mongoose");
const userSchema = require("./userSchema");
const dotenv = require("dotenv");
dotenv.config();

let dbConnection;

function getDbConnection() {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Initialize models
    //dbConnection.model('User', userSchema);
  }
  return dbConnection;
}

// Use getDbConnection to get the model
const User = getDbConnection().model("User");

async function getUsers(name) {
  const userModel = getDbConnection().model("User", userSchema);
  let result;
  if (name === undefined) {
    result = await userModel.find();
  } else {
    result = await findUserByName(name);
  }
  return result;
}

async function findUserByUsername(username) {
  const userModel = getDbConnection().model("User", userSchema);
  return await userModel.find({ username });
}

async function editUser(userId, userEdits) {
  const userModel = getDbConnection().model("User", userSchema);
  try {
    const editedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      userEdits,
      { returnOriginal: false }
    );
    return editedUser;
  } catch (error) {
    console.log("Failed to edit user");
    return false;
  }
}

async function addUser(user) {
  const userModel = getDbConnection().model("User", userSchema);
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserById(id) {
  const userModel = getDbConnection().model("User", userSchema);
  try {
    return await userModel.findById(id);
  } catch (error) {
    return null;
  }
}

async function findAndDelete(id) {
  const userModel = getDbConnection().model("User", userSchema);
  try {
    return await userModel.findByIdAndDelete(id);
  } catch (error) {
    return null;
  }
}

async function findUserByName(name) {
  const userModel = getDbConnection().model("User", userSchema);
  return await userModel.find({ name });
}

module.exports = {
  addUser,
  getUsers,
  findUserByName,
  findUserById,
  findAndDelete,
  editUser,
  findUserByUsername
};
