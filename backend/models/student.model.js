require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_secret_key";

const studentSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default: "",
    },
    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    fathername: {
      type: String,
      required: true,
      trim: true,
    },
    roll: {
      type: Number,
      required: true,
    },
    classId: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      default: "student",
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    school: {
      type: String,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true },
);

studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

studentSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

studentSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ studentId: this.studentId }, SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
