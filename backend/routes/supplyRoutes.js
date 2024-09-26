const express = require("express");
const {
  getSupplies,
  addSupply,
  updateSupply,
} = require("../controllers/supplyController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All routes are protected
router.get("/", protect, getSupplies);
router.post("/", protect, addSupply);
router.put("/:id", protect, updateSupply);

module.exports = router;
