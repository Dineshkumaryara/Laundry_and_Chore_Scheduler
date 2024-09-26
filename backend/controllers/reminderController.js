const Reminder = require("../models/Reminder");

// @desc    Create a new reminder
// @route   POST /api/reminders
const createReminder = async (req, res) => {
  const { reminderText, scheduledTime } = req.body;

  if (!reminderText || !scheduledTime) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  try {
    // Create a new reminder with the logged-in user's ID
    const reminder = new Reminder({
      user: req.user._id,
      reminderText,
      scheduledTime,
    });

    const savedReminder = await reminder.save();
    res.status(201).json(savedReminder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating reminder", error: error.message });
  }
};

// @desc    Get all reminders for the logged-in user
// @route   GET /api/reminders
const getReminders = async (req, res) => {
  try {
    // Find reminders only for the logged-in user
    const reminders = await Reminder.find({ user: req.user._id });
    res.status(200).json(reminders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reminders", error: error.message });
  }
};

// @desc    Delete a reminder
// @route   DELETE /api/reminders/:id
const deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    await reminder.deleteOne();
    res.json({ message: "Reminder removed" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting reminder", error: error.message });
  }
};

module.exports = {
  createReminder,
  getReminders,
  deleteReminder,
};
