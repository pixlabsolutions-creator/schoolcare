// routes/homeworkRoutes.js
const express = require("express");

const router = express.Router();
const upload = require("../middleware/upload");

const {
  createHomeWork,
  getAllHomework,
  getHomeworkByClass,
  getHomeworkById,
  getHomeworkByClassForStudents,
} = require("../controller/homework.controller");

router.post("/", upload.single("image"), createHomeWork);

router.get("/", getAllHomework);

router.get("/:className", getHomeworkByClass);
router.get("/classes/:className", getHomeworkByClassForStudents);

router.get("/single/:id", getHomeworkById);
module.exports = router;
