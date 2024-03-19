/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import userServices from '../userServices.js'

// beforeEach(() => {
//   jest.resetModules();
// });

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
  expect(result[0].username).toBe('test')
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

// tests findUserByUsername(username) function
test('test getUsers by username  Emily test', async () => {
  const result = await userServices.findUserByUsername('test')

  // expected = {
  //   _id: ObjectId("65dab7ff2d0a3ecfa31ccc21"),
  //   username: "test",
  //   password: "password",
  //   email: "emlai1263@gmail.com",
  //   name: "Emily",
  // };

  expect(result[0].name).toBe('Emily')
  expect(result[0].username).toBe('test')
  expect(result[0].email).toBe('emlai1263@gmail.com')
  expect(result[0].password).toBe('password')
})

// tests findAndEditUser by the current user and updated user. updates their username.
test('test editTask', async () => {
  const userId = '65dab7ff2d0a3ecfa31ccc21'
  const userEdits = {
    username: 'crispycookie',
    email: 'crispycookie@gmail.com',
    password: 'cookie',
    name: 'Chad'
  }
  const result = await userServices.editUser(userId, userEdits)
  expect(result).toBeDefined()
  if (result) {
    expect(result.username).toBe('aryaramchander')
    expect(result.name).toBe('AryaR')
    expect(result.password).toBe('aryapswd')
    expect(result.email).toBe('ar@gmail.com')
  }
})

// test findUserById(id) function.
test('test findUserById Gary', async () => {
  const result = await userServices.findUserById('65e6328a68059ab797224e0f')
  console.log('findUserById result: hi' + result)

  // expected = {
  //   _id: ObjectId("65e6328a68059ab797224e0f"),
  //   username: "GaryIsCool",
  //   password: "secret",
  //   email: "gary@gmail.com",
  //   name: "Gary",
  // };
  console.log(result)
  expect(result.name).toBe('Gary')
  expect(result.username).toBe('GaryIsCool')
  expect(result.email).toBe('gary@gmail.com')
  expect(result.password).toBe('secret')
})

// testing findUserById function if the user with given id doesn't actually exist
test('test findUserById notfound', async () => {
  const result = await userServices.findUserById('111111111111111111111111')
  console.log('findUserById result: ' + result)
  expect(result).toBe(null)
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
  const add = await userServices.addUser(null)
  const result = await userServices.getUsers('Fake')

  expect(result).toBeFalsy()
})
// tests the findAndDelete(id) function.
test('test findAndDelete(id)  Arya', async () => {
  const result = await userServices.getUsers('Arya')
  console.log('deleteUser result:' + result)
  const del = await userServices.findAndDelete(result[0].id)

  // expected = {[]};
  const afterResult = await userServices.getUsers('Arya')

  expect(afterResult).toEqual([])
})

// testing findAndDelete function if the user with given id doesn't actually exist
test('test findAndDelete notfound', async () => {
  const result = await userServices.findAndDelete('111111111111111111111111')
  console.log('findUserById result: ' + result)

  expect(result).toBe(null)
})

// tests the findUserByName(name) function.
test('test findUserByName(name) Emily', async () => {
  const result = await userServices.getUsers('Emily')

  // expected = {
  //   _id: ObjectId("65dab7ff2d0a3ecfa31ccc21"),
  //   username: "test",
  //   password: "password",
  //   email: "emlai1263@gmail.com",
  //   name: "Emily",
  // };

  expect(result[0].name).toBe('Emily')
  expect(result[0].username).toBe('test')
  expect(result[0].email).toBe('emlai1263@gmail.com')
  expect(result[0].password).toBe('password')
})
