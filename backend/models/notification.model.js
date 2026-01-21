const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    school: String,
    title: String,
    message: String,
    type: {
      type: String,
      enum: ["homework", "announcement"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
