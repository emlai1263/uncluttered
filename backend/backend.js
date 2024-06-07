<<<<<<< HEAD
=======
require('dotenv').config();
>>>>>>> 39fd6c4e60e9cf7860655055d81a598d20d967ab
const express = require('express')
const cors = require('cors')


const userServices = require('./userServices')
const taskServices = require('./taskServices')
const userSchema = require('./userSchema')
const authService = require('./authService')

const app = express()
const port = 8000

const corsOptions = {
  origin: 'http://localhost:3000', // your frontend origin
  credentials: true, // allow credentials
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

/* Main Author: Angela Kim
Login API Endpoint - allows users to log in with email and password.
On success, returns user data with status 200.
On failure, returns status 401 or 500 with an error message.
*/
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  try {
    const user = await authService.loginUser(email, password);
    console.log(user);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("An error occurred during login");
  }
});

// Check if a user exists by email
app.get('/users/email', async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).send({ message: 'Email query parameter is required' });
  }
  try {
    const user = await userServices.findUserByEmail(email);
    if (user && user.length > 0) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user by email:', error);
    res.status(500).send({ message: 'An error occurred in the server.' });
  }
});

// get users
app.get('/users', async (req, res) => {
  const name = req.query.name
  try {
    const result = await userServices.getUsers(name)
    res.send({ users: result })
  } catch (error) {
    console.log(error)
    res.status(500).send('An error ocurred in the server.')
  }
})

// get users by id
app.get('/users/:id', async (req, res) => {
  const id = req.params.id
  const result = await userServices.findUserById(id)
  if (result === undefined || result === null) {
    res.status(404).send('Resource not found.')
  } else {
    res.send({ users: result })
  }
})

// add users
app.post('/users', async (req, res) => {
  const user = req.body
  const savedUser = await userServices.addUser(user)
  if (savedUser) res.status(201).send(savedUser)
  else res.status(500).end()
})

// get tasks from a user's id
app.get('/tasks/:id', async (req, res) => {
  const userId = req.params.id
  const result = await taskServices.getTasks(userId)
  if (result === undefined || result === null) {
    res.status(404).send('Resource not found :(')
  } else {
    res.send({ users: result })
  }
})

// get a single task w/ taskId
app.get('/task/:taskID', async (req, res) => {
  const taskId = req.params.taskID
  const result = await taskServices.getSingleTask(taskId)
  if (result === undefined || result === null) {
    res.status(404).send('Resource not found :(')
  } else {
    res.send({ result })
  }
})

<<<<<<< HEAD

// // delete a task via its id
// app.delete('/tasks/:taskID', async (req, res) => {
//   const id = req.params.taskID
//   if (taskServices.deleteTask(taskID)) res.status(204).end()
//   else res.status(404).send('Resource not found.')
// })

// app.delete('/tasks/:taskID', async (req, res) => {
//   const taskID = req.params.taskID;
//   try {
//     const deletionResult = await taskServices.deleteTask(taskID);
//     if (deletionResult) res.status(204).end();
//     else res.status(404).send('Resource not found.');
//   } catch (error) {
//     console.error("Error in deleting task:", error);
//     res.status(500).send('Server error.');
//   }
// });

=======
>>>>>>> 39fd6c4e60e9cf7860655055d81a598d20d967ab
// Mark a task as deleted instead of removing it
app.patch('/tasks/:taskID/mark-deleted', async (req, res) => {
  const taskID = req.params.taskID;
  try {
    const updatedTask = await taskServices.markTaskAsDeleted(taskID);
    if (updatedTask) res.status(200).send(updatedTask);
    else res.status(404).send('Task not found.');
  } catch (error) {
    console.error("Error marking task as deleted:", error);
    res.status(500).send('Server error.');
  }
<<<<<<< HEAD
});

// Get all deleted tasks for a specific user
app.get('/users/:userId/tasks/deleted', async (req, res) => {
  const userId = req.params.userId;
  try {
      const deletedTasks = await taskServices.getDeletedTasks(userId);
      res.status(200).json(deletedTasks);
  } catch (error) {
      console.error("Error retrieving deleted tasks for user:", error);
      res.status(500).send('Server error.');
  }
});

// Delete all deleted tasks for a specific user - Empty Trash
app.delete('/users/:userId/tasks/delete-all', async (req, res) => {
  const { userId } = req.params;
=======
});

// Get all deleted tasks for a specific user
app.get('/users/:userId/tasks/deleted', async (req, res) => {
  const userId = req.params.userId;
  try {
      const deletedTasks = await taskServices.getDeletedTasks(userId);
      res.status(200).json(deletedTasks);
  } catch (error) {
      console.error("Error retrieving deleted tasks for user:", error);
      res.status(500).send('Server error.');
  }
});

// Delete all deleted tasks for a specific user - Empty Trash
app.delete('/users/:userId/tasks/delete-all', async (req, res) => {
  const { userId } = req.params;
  try {
      const result = await taskServices.deleteAllTasks(userId);
      if (result.deletedCount > 0) {
          res.status(204).send(); // No content to send back
      } else {
          res.status(404).send('No tasks found to delete.');
      }
  } catch (error) {
      console.error("Error deleting all tasks:", error);
      res.status(500).send('Server error');
  }
});


// Recover a deleted task
app.patch('/tasks/:taskID/recover', async (req, res) => {
  const taskID = req.params.taskID;
  try {
    const recoveredTask = await taskServices.recoverTask(taskID);
    if (recoveredTask) {
      res.status(200).send(recoveredTask);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error("Error recovering task:", error);
    res.status(500).send('Server error');
  }
});

// Permanently delete a task
app.delete('/tasks/:taskID/permanent-delete', async (req, res) => {
  const taskID = req.params.taskID;
  try {
    const result = await taskServices.permanentlyDeleteTask(taskID);
    if (result) res.status(204).end();
    else res.status(404).send('Task not found.');
  } catch (error) {
    console.error("Error permanently deleting task:", error);
    res.status(500).send('Server error.');
  }
});

// delete a user via its id + all tasks associated with that user
app.delete('/users/:id', async (req, res) => {
  const id = req.params.id
  if (userServices.deleteUser(id)) res.status(204).end()
  else res.status(404).send('Resource not found')
})

// add a task
app.post('/tasks', async (req, res) => {
  const task = req.body
  const savedTask = await taskServices.addTask(task)
  if (savedTask) res.status(201).send(savedTask)
  else res.status(500).end()
})

// edit a task via its id, add edits to body of request
app.patch('/tasks/:taskID', async (req, res) => {
  const taskID = req.params.taskID
  const taskEdits = req.body
  const editedTask = await taskServices.editTask(taskID, taskEdits)
  if (editedTask) res.status(201).send(editedTask)
  else res.status(500).end()
})


// delete a category
app.delete('/users/:userId/categories/:categoryName', async (req, res) => {
  const { userId, categoryName } = req.params;
  try {
      const user = await userServices.findUserById(userId);
      if (!user) {
          res.status(404).send('User not found');
          return;
      }
      // Remove the category from the array
      user.categories = user.categories.filter(category => category !== categoryName);
      await user.save();
      res.status(200).send(user.categories);
  } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).send('Internal Server Error');
  }
});


// // Get all categories (for debugging)
// app.get('/categories', async (req, res) => {
//   try {
//     const categories = await categoryService.getAllCategories(); // Implement this service
//     res.status(200).json(categories);
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     res.status(500).send('Server error');
//   }
// });


// Main Author: Angela Kim
// Get a user's categories by user id
app.get("/users/:id/categories", async (req, res) => {
  const userId = req.params.id;
>>>>>>> 39fd6c4e60e9cf7860655055d81a598d20d967ab
  try {
      const result = await taskServices.deleteAllTasks(userId);
      if (result.deletedCount > 0) {
          res.status(204).send(); // No content to send back
      } else {
          res.status(404).send('No tasks found to delete.');
      }
  } catch (error) {
      console.error("Error deleting all tasks:", error);
      res.status(500).send('Server error');
  }
});

<<<<<<< HEAD

// Recover a deleted task
app.patch('/tasks/:taskID/recover', async (req, res) => {
  const taskID = req.params.taskID;
  try {
    const recoveredTask = await taskServices.recoverTask(taskID);
    if (recoveredTask) {
      res.status(200).send(recoveredTask);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error("Error recovering task:", error);
    res.status(500).send('Server error');
  }
});

// Permanently delete a task
app.delete('/tasks/:taskID/permanent-delete', async (req, res) => {
  const taskID = req.params.taskID;
  try {
    const result = await taskServices.permanentlyDeleteTask(taskID);
    if (result) res.status(204).end();
    else res.status(404).send('Task not found.');
  } catch (error) {
    console.error("Error permanently deleting task:", error);
    res.status(500).send('Server error.');
  }
});

// delete a user via its id + all tasks associated with that user
app.delete('/users/:id', async (req, res) => {
  const id = req.params.id
  if (userServices.deleteUser(id)) res.status(204).end()
  else res.status(404).send('Resource not found')
})

// add a task
app.post('/tasks', async (req, res) => {
  const task = req.body
  const savedTask = await taskServices.addTask(task)
  if (savedTask) res.status(201).send(savedTask)
  else res.status(500).end()
})

// edit a task via its id, add edits to body of request
app.patch('/tasks/:taskID', async (req, res) => {
  const taskID = req.params.taskID
  const taskEdits = req.body
  const editedTask = await taskServices.editTask(taskID, taskEdits)
  if (editedTask) res.status(201).send(editedTask)
  else res.status(500).end()
})

=======
>>>>>>> 39fd6c4e60e9cf7860655055d81a598d20d967ab
app.listen(process.env.PORT || port, () => {
  console.log('REST API is listening.')
})

<<<<<<< HEAD
app.post('/users/:userId/categories', async (req, res) => {
  const { category } = req.body;
  const { userId } = req.params;
  try {
      const updatedUser = await userServices.addCategory(userId, category);
      if (updatedUser) {
          res.status(200).json(updatedUser.categories);
      } else {
          res.status(404).send('User not found');
      }
  } catch (error) {
      console.error('Error adding category:', error);
      res.status(500).send('Internal Server Error');
  }
});

// backend.js
app.delete('/users/:userId/categories/:categoryName', async (req, res) => {
  const { userId, categoryName } = req.params;
  try {
      const user = await userServices.findUserById(userId);
      if (!user) {
          res.status(404).send('User not found');
          return;
      }
      // Remove the category from the array
      user.categories = user.categories.filter(category => category !== categoryName);
      await user.save();
      res.status(200).send(user.categories);
  } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).send('Internal Server Error');
  }
});


// Delete a category for a specific user
// app.delete('/users/:userId/categories/:categoryId', async (req, res) => {
//   const { userId, categoryId } = req.params;
//   try {
//       const user = await userServices.findUserById(userId);
//       if (!user) {
//           res.status(404).send("User not found.");
//           return;
//       }
//       user.categories = user.categories.filter(category => category.id !== categoryId); // Assuming each category has a unique 'id'
//       await user.save();
//       res.status(200).send({ categories: user.categories });
//   } catch (error) {
//       console.error('Error deleting category:', error);
//       res.status(500).send('Internal Server Error');
//   }
// });


// Main Author: Angela Kim
// Get a user's categories by user id
app.get("/users/:id/categories", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userServices.findUserById(userId);
    if (!user) {
      res.status(404).send("Get categories: user not found.");
      return;
    }
    res.send({ categories: user.categories });
  } catch (error) {
    console.log(error);
    res.status(404).send("Get categories: resource not found.");
  }
});
=======
/* Main Author: Angela Kim
Login API Endpoint - allows users to log in with email and password.
On success, returns user data with status 200.
On failure, returns status 401 or 500 with an error message.
*/
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  try {
    const user = await authService.loginUser(email, password);
    console.log(user);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("An error occurred during login");
  }
});
>>>>>>> 39fd6c4e60e9cf7860655055d81a598d20d967ab
