const express = require("express");
const upload = require("../middleware/upload");
const {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
} = require("../controller/school.controller");

const router = express.Router();

router.post("/", upload.single("image"), createSchool);
router.get("/", getAllSchools);
router.get("/:id", getSchoolById);
router.put("/:id", updateSchool);
router.delete("/:id", deleteSchool);

module.exports = router;
