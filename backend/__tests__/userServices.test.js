/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import userServices from '../userServices.js'

beforeEach(() => {
  jest.resetModules()
})

// tests the  getUsers(name) function, passing in one name.
test('test getUsers by name  Emily', async () => {
  const result = await userServices.getUsers('Emily')

  // expected = {
  //   _id: ObjectId("65dab7ff2d0a3ecfa31ccc21"),
  //   username: "test",
  //   password: "password",
  //   email: "emlai1263@gmail.com",
  //   name: "Emily",
  // };

  expect(result[0].name).toBe('Emily')
  expect(result[0].username).toBe('emlai1263')
  expect(result[0].email).toBe('emlai1263@gmail.com')
  expect(result[0].password).toBe('password')
})

// tests the getUsers() function, when the name is undefined.
test('test getUsers', async () => {
  const result = await userServices.getUsers()

  // expected: list of all users. subject to change with testing and later add-ons.

  expect(result[1].name).toBe('Gary')
  expect(result[1].username).toBe('GaryIsCool')
  expect(result[1].email).toBe('gary@gmail.com')
  expect(result[1].password).toBe('secret')
})

// // tests findUserByUsername(username) function
test('test getUsers by username  John', async () => {
  const result = await userServices.findUserByUsername('JohnDoe')

  // expected = {
  //   _id: ObjectId("66105e818b0d26a8a1670626"),
  //   username: "JohnDoe",
  //   password: "Happycar123!",
  //   email: "johndoe@gmail.com",
  //   name: "John",
  // };

  expect(result[0].name).toBe('John')
  expect(result[0].username).toBe('JohnDoe')
  expect(result[0].email).toBe('johndoe@gmail.com')
  expect(result[0].password).toBe('Happycar123!')
})

// tests findAndEditUser by the current user and updated user. updates their username.
test('test editTask', async () => {
  const userId = '65dab7ff2d0a3ecfa31ccc21'
  const userEdits = {
    username: 'crispycookie',
    email: 'cc@gmail.com',
    password: 'cookie',
    name: 'Chad'
  }
  const result = await userServices.editUser(userId, userEdits)
  expect(result).toBeDefined()
  if (result) {
    expect(result.username).toBe('crispycookie')
    expect(result.name).toBe('Chad')
    expect(result.password).toBe('cookie')
    expect(result.email).toBe('cc@gmail.com')
  }
})

// tests findAndEditUser by the current user and updated user. updates their username.
test('test editUser but invalid', async () => {
  const userId = 'not valid'
  const userEdits = {}
  const result = await userServices.editUser(userId, userEdits)
  expect(result.username).toBe(undefined)
})

// test findUserById(id) function.
test('test findUserById Gary', async () => {
  const result = await userServices.findUserById('65e6328a68059ab797224e0f')
  console.log('findUserById result: ' + result)

  // expected = {
  //   _id: ObjectId("65e6328a68059ab797224e0f"),
  //   username: "GaryIsCool",
  //   password: "secret",
  //   email: "gary@gmail.com",
  //   name: "Gary",
  // };
  expect(result.name).toBe('Gary')
  expect(result.username).toBe('GaryIsCool')
  expect(result.email).toBe('gary@gmail.com')
  expect(result.password).toBe('secret')
})

// testing findUserById function if the user with given id doesn't actually exist
test('test findUserById notfound', async () => {
  const result = await userServices.findUserById('111111111111111111111111')
  console.log('invalid result: ' + result)
  expect(result).toBeNull()
})

// test addUser(user) function
test('test addUser  Stan', async () => {
  const user = {
    name: 'Stan',
    username: 'stanstanstan',
    email: 'stan@gmail.com',
    password: 'password1234!'
  }
  // eslint-disable-next-line no-unused-vars
  const add = await userServices.addUser(user)
  const result = await userServices.getUsers('Stan')

  // expected = {
  //   _id: [any id, unknown atm]
  //   username: "stanstanstan",
  //   password: "password1234!",
  //   email: "stan@gmail.com",
  //   name: "Stan",
  // };

  expect(result[0].name).toBe('Stan')
  expect(result[0].username).toBe('stanstanstan')
  expect(result[0].email).toBe('stan@gmail.com')
  expect(result[0].password).toBe('password1234!')
})

test('test addUser null object', async () => {
  const user = {}
  const result = await userServices.addUser(user)

  expect(result.username).toBe(undefined)
})

// tests the findAndDelete(id) function.
test('test findAndDelete(id)  testuser', async () => {
  const result = await userServices.getUsers('Test User')
  console.log('deleteUser result:' + result)
  const del = await userServices.findAndDelete(result[0].id)

  // expected = {[]};
  const afterResult = await userServices.getUsers('Test User')

  expect(afterResult).toEqual([])
})

// testing findAndDelete function if the user with given id doesn't actually exist
test('test findAndDelete notfound', async () => {
  const result = await userServices.findAndDelete('111111111111111111111111')

  expect(result).toBe(null)
})

// tests the findUserByName(name) function.
test('test findUserByName(name) Mr. Test', async () => {
  const result = await userServices.getUsers('Jane Doe')

  // expected = {
  //   _id: ObjectId("65dab7ff2d0a3ecfa31ccc21"),
  //   username: "test",
  //   password: "password",
  //   email: "emlai1263@gmail.com",
  //   name: "Emily",
  // };

  expect(result[0].name).toBe('Jane Doe')
  expect(result[0].username).toBe('janedoe123')
  expect(result[0].email).toBe('janedoe@example.com')
  expect(result[0].password).toBe('Happycar123!')
})
