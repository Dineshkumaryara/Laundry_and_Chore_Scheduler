const mongoose = require("mongoose");

const laundrySchema = mongoose.Schema(
  {
    machineNumber: {
      type: Number,
      required: true,
    },
    type: {
      type: String, // 'Washer' or 'Dryer'
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    startTime: {
      type: Date, // When the machine was started
    },
    usageDuration: {
      type: Number, // Duration in minutes (e.g., 30 for washer, 45 for dryer)
    },
    queue: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Laundry = mongoose.model("Laundry", laundrySchema);
module.exports = Laundry;
