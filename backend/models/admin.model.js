require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_secret_key";

const adminSchema = new mongoose.Schema({
  image: {
    type: String,
    default: "",
  },
  public_id: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  adminId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "modaretor"],
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
});

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password);
  }
});

adminSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ adminId: this.adminId }, SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
