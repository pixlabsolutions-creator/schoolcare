// models/Homework.js
const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
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
    public_id: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const News = mongoose.model("News", newsSchema);
module.exports = News;
