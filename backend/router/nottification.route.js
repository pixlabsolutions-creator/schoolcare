// routes/homeworkRoutes.js
const express = require("express");
const {
  getAllNotifications,
} = require("../controller/notification.controller");
const combinedAuth = require("../middleware/auth");

const router = express.Router();

router.get("/", combinedAuth(), getAllNotifications);

module.exports = router;
