const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema({
  school: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  classId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  students: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      status: {
        type: String,
        enum: ["present", "absent", "late"],
        required: true,
      },
    },
  ],
});

// ✅ Compound index for preventing duplicate student attendance in same class on same day
attendanceSchema.index(
  {
    classId: 1,
    date: 1,
    "students.student": 1,
  },
  {
    unique: true,
    partialFilterExpression: { "students.student": { $exists: true } },
  }
);

// ✅ বা শুধুমাত্র classId এবং date এর জন্য unique (আপনার মূল requirement)
attendanceSchema.index({ classId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
