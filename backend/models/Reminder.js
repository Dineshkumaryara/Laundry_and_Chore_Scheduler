const mongoose = require("mongoose");

const reminderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the logged-in user
      required: true,
    },
    reminderText: {
      type: String,
      required: true,
    },
    scheduledTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reminder = mongoose.model("Reminder", reminderSchema);
module.exports = Reminder;
