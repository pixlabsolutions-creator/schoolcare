// routes/homeworkRoutes.js
const express = require("express");
const {
  createAnouncement,
  getAnnouncemant,
  getAnnouncemantById,
} = require("../controller/anouncement.controller");

const router = express.Router();

router.post("/", createAnouncement);

router.get("/", getAnnouncemant);
router.get("/:id", getAnnouncemantById);

module.exports = router;
