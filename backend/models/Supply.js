const mongoose = require("mongoose");

const supplySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the logged-in user
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    lowThreshold: {
      type: Number,
      required: true,
      default: 2, // When quantity falls below this value, notify the user
    },
  },
  {
    timestamps: true,
  }
);

const Supply = mongoose.model("Supply", supplySchema);
module.exports = Supply;
