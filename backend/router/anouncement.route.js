// routes/homeworkRoutes.js
const express = require("express");
const {
  createAnouncement,
  getAnnouncemant,
  getAnnouncemantById,
  deleteAnnouncemantById,
  updateAnnouncementLikeById,
  getAllAnnouncemant,
} = require("../controller/anouncement.controller");

const router = express.Router();

router.post("/", createAnouncement);

router.get("/", getAnnouncemant);
router.get("/admin", getAllAnnouncemant);
router.get("/:id", getAnnouncemantById);
router.delete("/:id", deleteAnnouncemantById);
router.put("/like/:id", updateAnnouncementLikeById);

module.exports = router;
