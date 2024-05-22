const express = require("express");
const cors = require("cors");

const userServices = require("./userServices");
const taskServices = require("./taskServices");
const userSchema = require("./userSchema");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// get users
app.get("/users", async (req, res) => {
  const name = req.query.name;
  try {
    const result = await userServices.getUsers(name);
    res.send({ users: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

// get users by id
app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const result = await userServices.findUserById(id);
  if (result === undefined || result === null) {
    res.status(404).send("Resource not found.");
  } else {
    res.send({ users: result });
  }
});

// add users
<<<<<<< HEAD
app.post("/users", async (req, res) => {
  const user = req.body;
  const savedUser = await userServices.addUser(user);
  if (savedUser) res.status(201).send(savedUser);
  else res.status(500).end();
});

=======
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



>>>>>>> b907a671aae7adebbaf8e74637367734a111e3aa
// delete a user via its id + all tasks associated with that user
app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  if (userServices.deleteUser(id)) res.status(204).end();
  else res.status(404).send("Resource not found");
});

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

// get tasks from a user's id
app.get("/tasks/:id", async (req, res) => {
  const userId = req.params.id;
  const result = await taskServices.getTasks(userId);
  if (result === undefined || result === null) {
    res.status(404).send("Resource not found :(");
  } else {
    res.send({ users: result });
  }
});

// delete a task via its id
app.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  if (taskServices.deleteTask(id)) res.status(204).end();
  else res.status(404).send("Resource not found.");
});

// add a task
app.post("/tasks", async (req, res) => {
  const task = req.body;
  const savedTask = await taskServices.addTask(task);
  if (savedTask) res.status(201).send(savedTask);
  else res.status(500).end();
});

// edit a task via its id, add edits to body of request
app.patch("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const taskEdits = req.body;
  const editedTask = await taskServices.editTask(id, taskEdits);
  if (editedTask) res.status(201).send(editedTask);
  else res.status(500).end();
});

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});

// authentification
//app.post('/register', registerUser)
//app.post('/login', loginUser)

/* app.post('/users', authenticateUser, (req, res) => {
  const userToAdd = req.body
  Users.addUser(userToAdd).then((result) => 
    res.status(201).send(result)
  )
})
 */