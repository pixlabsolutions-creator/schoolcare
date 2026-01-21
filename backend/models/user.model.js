require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_secret_key";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  school: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    enum: ["admin", "teacher", "student", "accountant"],
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  joinOn: {
    type: Date,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ userId: this.userId }, SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
