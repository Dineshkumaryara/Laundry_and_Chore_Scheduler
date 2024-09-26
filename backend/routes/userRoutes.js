const express = require("express");
const {
  registerUser,
  authUser,
  getUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", authUser);

// Private route (requires token)
router.get("/profile", protect, getUserProfile);

module.exports = router;
