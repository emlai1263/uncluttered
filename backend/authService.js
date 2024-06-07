const userServices = require("./userServices");

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