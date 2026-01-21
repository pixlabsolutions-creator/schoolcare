const express = require("express");
const {
  createAttendance,
  getAttendance,
} = require("../controller/attendance.controller");
const router = express.Router();

router.post("/", createAttendance);
router.get("/:school", getAttendance);

module.exports = router;
