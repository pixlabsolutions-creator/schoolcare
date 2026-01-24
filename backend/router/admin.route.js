const express = require("express");
const upload = require("../middleware/upload");
const { createAdmin, loginAdmin } = require("../controller/admin.controller");
const router = express.Router();

router.post("/", createAdmin);
router.post("/login", loginAdmin);

module.exports = router;
