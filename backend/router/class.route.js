const express = require("express");
const {
  getAllClass,
  createNewClass,
  getClassById,
  deleteClass,
} = require("../controller/class.controller");
const router = express.Router();

router.get("/", getAllClass);
router.post("/", createNewClass);
router.get("/:id", getClassById);
router.delete("/:id", deleteClass);

module.exports = router;
