// models/Homework.js
const mongoose = require("mongoose");

const AnouncementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    descriptions: {
      type: String,
      required: true,
      trim: true,
    },
    teacher: {
      type: String,
      required: true,
      trim: true,
    },
    school: {
      type: String,
      required: true,
      trim: true,
    },
    conmment: [
      {
        type: String,
        trim: true,
      },
    ],
    like: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Anouncement = mongoose.model("Anouncement", AnouncementSchema);
module.exports = Anouncement;
