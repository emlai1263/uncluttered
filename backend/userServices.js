/* eslint-disable space-before-function-paren */
const mongoose = require('mongoose')
const userSchema = require('./userSchema')
const dotenv = require('dotenv')
dotenv.config()

let dbConnection

async function findUserByEmail(email) {
  try {
    const userModel = getDbConnection().model("User", userSchema);
    return await userModel.find({ email });
  }
  catch (error) {
    console.log("Failed to find user by email.");
    return false;
  }
};

function getDbConnection() {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }
  return dbConnection
}

async function getUsers(name) {
  const userModel = getDbConnection().model('User', userSchema)
  let result
  if (name === undefined) {
    result = await userModel.find()
  } else {
    result = await findUserByName(name)
  }
  return result
}

async function findUserByUsername(username) {
  const userModel = getDbConnection().model('User', userSchema)
  return await userModel.find({ username })
}
/* Main Author: Angela Kim
Find User by Email - retrieves a user from the database by their email.
Returns the user object if found, or false if an error occurs.
*/ 

async function findUserByEmail(email) {
  try {
    const userModel = getDbConnection().model("User", userSchema);
    return await userModel.find({ email });
  }
  catch (error) {
    console.log("Failed to find user by email.");
    return false;
  }
};

// edit tasks
async function editUser(userId, userEdits) {
  const taskModel = getDbConnection().model('User', userSchema)
  try {
    const editedUser = await taskModel.findOneAndUpdate(
      { _id: userId },
      userEdits,
      { returnOriginal: false }
    )
    return editedUser
  } catch (error) {
    console.log('Failed to edit task')
    return false
  }
}

async function addUser(user) {
  // userModel is a Model, a subclass of mongoose.Model
  const UserModel = getDbConnection().model('User', userSchema)
  try {
    // You can use a Model to create new documents using 'new' and
    // passing the JSON content of the Document:
    const userToAdd = new UserModel(user)
    const savedUser = await userToAdd.save()
    return savedUser
  } catch (error) {
    console.log(error)
    return false
  }
}

async function findUserById(id) {
  const userModel = getDbConnection().model('User', userSchema)
  try {
    return await userModel.findById(id)
  } catch (error) {
    return null
  }
}

async function findAndDelete(id) {
  const userModel = getDbConnection().model('User', userSchema)
  try {
    return await userModel.findByIdAndDelete(id)
  } catch (error) {
    return null
  }
}

async function findUserByName(name) {
  const userModel = getDbConnection().model('User', userSchema)
  return await userModel.find({ name })
}

module.exports = {
  addUser,
  getUsers,
  findUserByName,
  findUserById,
  findUserByEmail,
  findAndDelete,
  findUserByEmail,
  editUser,
  findUserByUsername
}
