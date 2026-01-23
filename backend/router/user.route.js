const express = require("express");
const upload = require("../middleware/upload");
const {
  getAllUsers,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  userProfile,
  logoutUser,
  fetchTeacherBySchool,
  updateUserImage,
} = require("../controller/user.controller");
const authUser = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.post("/login", loginUser);
router.get("/profile", authUser, userProfile);
router.get("/logout", authUser, logoutUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:school", fetchTeacherBySchool);
router.put("/:userId/image", upload.single("image"), updateUserImage);

module.exports = router;
