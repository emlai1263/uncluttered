const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { collection: "users" }
);

// const userCollection = mongoose.model("userCollection", userSchema)
// module.exports = userCollection;
module.exports = userSchema;