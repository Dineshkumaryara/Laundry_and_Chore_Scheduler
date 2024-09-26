const express = require("express");
const {
  createReminder,
  getReminders,
  deleteReminder,
} = require("../controllers/reminderController"); // Import controller functions
const { protect } = require("../middleware/authMiddleware"); // Middleware to protect routes

const router = express.Router();

// Routes for reminders
router.post("/", protect, createReminder); // POST route to create a reminder
router.get("/", protect, getReminders); // GET route to get all reminders
router.delete("/:id", protect, deleteReminder); // DELETE route to delete a reminder

module.exports = router;
