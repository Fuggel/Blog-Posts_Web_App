const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  text: {
    type: String,
    required: [true, "Please add a text"],
  },
  image: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
