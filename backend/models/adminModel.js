const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add a username"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
});

module.exports = mongoose.model("Admin", adminSchema);
