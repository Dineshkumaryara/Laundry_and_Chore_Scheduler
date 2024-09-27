const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const reminderRoutes = require("./routes/reminderRoutes");
const userRoutes = require("./routes/userRoutes");
const supplyRoutes = require("./routes/supplyRoutes");
const laundryRoutes = require("./routes/laundryRoutes");
const cron = require("node-cron");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/reminders", reminderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/supplies", supplyRoutes);
app.use("/api/laundry", laundryRoutes);

//route for testing
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
