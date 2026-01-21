const mongoose = require("mongoose");
const classesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
});

const Class = mongoose.model("classes", classesSchema);
module.exports = Class;
