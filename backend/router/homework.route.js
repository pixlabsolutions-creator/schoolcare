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
  updateHomeworkLikeById,
} = require("../controller/homework.controller");

router.post("/", upload.single("image"), createHomeWork);

router.get("/", getAllHomework);

router.get("/:className", getHomeworkByClass);
router.get("/classes/:className", getHomeworkByClassForStudents);

router.get("/single/:id", getHomeworkById);
router.put("/like/:id", updateHomeworkLikeById);
module.exports = router;
