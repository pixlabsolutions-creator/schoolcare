// routes/homeworkRoutes.js
const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  createNews,
  getNewsBySchool,
  getNewsById,
} = require("../controller/news.controller");

router.post("/", upload.single("image"), createNews);
router.get("/:school", getNewsBySchool);
router.get("/single/:id", getNewsById);

module.exports = router;
