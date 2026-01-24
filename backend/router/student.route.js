const express = require("express");
const studentAuth = require("../middleware/studentAuth");
const upload = require("../middleware/upload");

const {
  getAllstudent,
  createStudent,
  loginStudent,
  logoutStudent,
  deleteStudent,
  studentProfile,
  getStudentByClass,
  studentBlock,
  getAllstudentForAdmin,
} = require("../controller/student.controller");

const router = express.Router();

router.get("/", getAllstudent);

router.get("/class/:classId", getStudentByClass);

router.post("/", upload.single("image"), createStudent);

router.post("/login", loginStudent);

router.get("/profile", studentAuth, studentProfile);

router.get("/logout", studentAuth, logoutStudent);

router.delete("/:id", deleteStudent);

router.get("/admin", getAllstudentForAdmin);

router.put("/status/:id", studentBlock);

module.exports = router;
