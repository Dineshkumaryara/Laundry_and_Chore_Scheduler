const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Laundry = require("./models/Laundry"); // Assuming you have a Laundry model

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedLaundryData = async () => {
  try {
    await Laundry.deleteMany(); // Clear the collection before seeding

    const machines = [
      {
        machineNumber: 1,
        type: "Washer",
        isAvailable: true,
        startTime: null, // Initialize startTime as null since machine is available
        usageDuration: 30, // Default usage duration for Washer
        queue: [],
      },
      {
        machineNumber: 2,
        type: "Dryer",
        isAvailable: true,
        startTime: null,
        usageDuration: 20, // Default usage duration for Dryer
        queue: [],
      },
      {
        machineNumber: 3,
        type: "Washer",
        isAvailable: true,
        startTime: null,
        usageDuration: 30,
        queue: [],
      },
      {
        machineNumber: 4,
        type: "Dryer",
        isAvailable: true,
        startTime: null,
        usageDuration: 20,
        queue: [],
      },
      {
        machineNumber: 5,
        type: "Washer",
        isAvailable: true,
        startTime: null,
        usageDuration: 30,
        queue: [],
      },
      {
        machineNumber: 6,
        type: "Dryer",
        isAvailable: true,
        startTime: null,
        usageDuration: 20,
        queue: [],
      },
      {
        machineNumber: 7,
        type: "Washer",
        isAvailable: true,
        startTime: null,
        usageDuration: 30,
        queue: [],
      },
      {
        machineNumber: 8,
        type: "Dryer",
        isAvailable: true,
        startTime: null,
        usageDuration: 20,
        queue: [],
      },
      {
        machineNumber: 9,
        type: "Washer",
        isAvailable: true,
        startTime: null,
        usageDuration: 30,
        queue: [],
      },
      {
        machineNumber: 10,
        type: "Dryer",
        isAvailable: true,
        startTime: null,
        usageDuration: 20,
        queue: [],
      },
    ];

    await Laundry.insertMany(machines); // Insert the machines
    console.log("Laundry machines added successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding laundry machines:", error);
    process.exit(1);
  }
};

seedLaundryData();
