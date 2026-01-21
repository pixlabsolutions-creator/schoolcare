const express = require("express");

const combinedAuth = require("../middleware/auth");
const {
  getAllNotificationsRead,
  markAsRead,
} = require("../controller/notificationRead.controller");

const router = express.Router();

router.get("/", combinedAuth(), getAllNotificationsRead);
router.put("/:id", combinedAuth(), markAsRead);

module.exports = router;
