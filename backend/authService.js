<<<<<<< HEAD
const userServices = require("./userServices");

=======
/* Main Author: Angela Kim
AuthService - services that allow for user 
and password authentication after login */
const userServices = require("./userServices");
>>>>>>> 39fd6c4e60e9cf7860655055d81a598d20d967ab
const loginUser = async (email, password) => {
    const user = await userServices.findUserByEmail(email);
    console.log(user)
    if (!user) {
        return null;
    }
    return user;
};

module.exports = {
  loginUser,
};