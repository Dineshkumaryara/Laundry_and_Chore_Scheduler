const Laundry = require("../models/Laundry");

// @desc    Get all laundry machines and their status
// @route   GET /api/laundry
const getLaundryMachines = async (req, res) => {
  try {
    const machines = await Laundry.find({});
    res.status(200).json(machines);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching laundry machines",
      error: error.message,
    });
  }
};

// @desc    Join the queue for a laundry machine
// @route   POST /api/laundry/:id/queue
const joinQueue = async (req, res) => {
  try {
    const machine = await Laundry.findById(req.params.id);

    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    const alreadyInQueue = machine.queue.find(
      (queueItem) => queueItem.user.toString() === req.user._id.toString()
    );

    if (alreadyInQueue) {
      return res.status(400).json({ message: "You are already in the queue." });
    }

    // Add user to queue even if machine is in use
    machine.queue.push({ user: req.user._id });

    // Save the machine with the updated queue
    const updatedMachine = await machine.save();

    res.status(200).json(updatedMachine);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error joining queue", error: error.message });
  }
};

// @desc    Start the laundry machine
// @route   POST /api/laundry/:id/start
const startMachine = async (req, res) => {
  try {
    const machine = await Laundry.findById(req.params.id);
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    if (!machine.isAvailable) {
      return res.status(400).json({ message: "Machine is already in use." });
    }

    // Set usage duration based on the machine type
    let usageDuration;
    if (machine.type === "Washer") {
      usageDuration = 30; // 30 minutes for Washer
    } else if (machine.type === "Dryer") {
      usageDuration = 20; // 20 minutes for Dryer
    } else {
      return res.status(400).json({ message: "Invalid machine type." });
    }

    // Set machine to in-use and set start time and usage duration
    machine.isAvailable = false;
    machine.startTime = Date.now(); // Set the current time as the start time
    machine.usageDuration = usageDuration; // Set the duration based on type

    await machine.save();
    res.status(200).json(machine);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error starting machine", error: error.message });
  }
};

// @desc    Update machine status (mark as available or in-use)
// @route   PUT /api/laundry/:id/status
const updateMachineStatus = async (req, res) => {
  const { isAvailable, usageDuration } = req.body;

  try {
    const machine = await Laundry.findById(req.params.id);

    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    machine.isAvailable = isAvailable;

    if (isAvailable) {
      // Clear startTime and usageDuration when the machine is available again
      machine.startTime = null;
      machine.usageDuration = null;

      // If the machine is available and has a queue, pop the first user and start it for them
      if (machine.queue.length > 0) {
        const nextUser = machine.queue.shift(); // Remove the first user in the queue
        machine.isAvailable = false; // Mark machine as in-use
        machine.startTime = Date.now(); // Start time for the next user
        machine.usageDuration = machine.type === "Washer" ? 30 : 20; // Set usage duration based on type (30 for washer, 20 for dryer)
        await machine.save();
        return res.status(200).json({
          message: `Machine started for the next user ${nextUser.user}`,
          machine,
        });
      }
    }

    const updatedMachine = await machine.save();
    res.status(200).json(updatedMachine);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating machine status", error: error.message });
  }
};

module.exports = {
  getLaundryMachines,
  joinQueue,
  startMachine,
  updateMachineStatus,
};
