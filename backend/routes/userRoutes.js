const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  updatePassword,
} = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", auth, getUser);
router.put("/update", auth, updateUser);
router.put("/change-password", auth, updatePassword);

module.exports = router;
