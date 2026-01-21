const jwt = require("jsonwebtoken");
const Student = require("../models/student.model");
const BlackListToken = require("../models/blackListTokenModel");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const studentAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const isBlacklisted = await BlackListToken.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token expired" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    const user = await Student.findOne({ studentId: decoded.studentId }).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = studentAuth;
