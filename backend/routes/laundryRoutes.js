const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getLaundryMachines,
  joinQueue,
  startMachine,
  updateMachineStatus,
} = require("../controllers/laundryController");

router.get("/", getLaundryMachines);
router.post("/:id/queue", protect, joinQueue); // Apply the protect middleware here
router.post("/:id/start", protect, startMachine); // Apply the protect middleware here
router.put("/:id/status", updateMachineStatus);

module.exports = router;
