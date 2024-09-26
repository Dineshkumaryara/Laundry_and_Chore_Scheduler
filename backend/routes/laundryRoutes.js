const express = require("express");
const {
  getLaundryMachines,
  joinQueue,
  updateMachineStatus,
} = require("../controllers/laundryController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all laundry machines
router.get("/", protect, getLaundryMachines);

// Join the queue for a machine
router.post("/:id/queue", protect, joinQueue);

// Update machine status (available or in-use)
router.put("/:id/status", protect, updateMachineStatus);

module.exports = router;
