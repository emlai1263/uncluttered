const express = require('express')
const cors = require('cors')

const userServices = require('./userServices')
const taskServices = require('./taskServices')

const app = express()
const port = 8000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

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

// delete a task via its id
app.delete('/tasks/:id', async (req, res) => {
  const id = req.params.id
  if (taskServices.deleteTask(id)) res.status(204).end()
  else res.status(404).send('Resource not found.')
})

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
app.patch('/tasks/:id', async (req, res) => {
  const id = req.params.id
  const taskEdits = req.body
  const editedTask = await taskServices.editTask(id, taskEdits)
  if (editedTask) res.status(201).send(editedTask)
  else res.status(500).end()
})

app.listen(process.env.PORT || port, () => {
  console.log('REST API is listening.')
})

// authentification
// app.post('/register', registerUser)
// app.post('/login', loginUser)

// app.post('/users', authenticateUser, (req, res) => {
//   const userToAdd = req.body
//   Users.addUser(userToAdd).then((result) => res.status(201).send(result))
// })
