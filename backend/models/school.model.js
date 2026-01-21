const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  image: {
    type: String,
    default: "",
  },
  schoolId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  school: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  joinedOn: {
    type: String,
    required: true,
  },
  headMasterName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Schools = mongoose.model("Schools", schoolSchema);

module.exports = Schools;
