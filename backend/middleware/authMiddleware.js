const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const BlackListToken = require("../models/blackListTokenModel");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const authUser = async (req, res, next) => {
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

    const user = await User.findOne({ userId: decoded.userId }).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authUser;
