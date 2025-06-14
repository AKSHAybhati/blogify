const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
{
    title:{
      type: String,
      required: true,
    },
    para:{
      type: String,
      required: true,
    },
    image:{
      type: String,
      default: "default.jpg",
    },
})

const blog = mongoose.model("blog",modelSchema);
module.exports = blog; 