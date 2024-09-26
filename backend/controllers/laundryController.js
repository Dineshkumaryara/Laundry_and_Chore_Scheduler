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

    if (!machine.isAvailable) {
      return res.status(400).json({ message: "Machine is currently in use." });
    }

    const alreadyInQueue = machine.queue.find(
      (queueItem) => queueItem.user.toString() === req.user._id.toString()
    );

    if (alreadyInQueue) {
      return res.status(400).json({ message: "You are already in the queue." });
    }

    machine.queue.push({ user: req.user._id });
    const updatedMachine = await machine.save();

    res.status(200).json(updatedMachine);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error joining queue", error: error.message });
  }
};

// @desc    Update machine status (mark as available or in-use)
// @route   PUT /api/laundry/:id/status

const updateMachineStatus = async (req, res) => {
  const { isAvailable } = req.body;

  try {
    const machine = await Laundry.findById(req.params.id);

    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    machine.isAvailable = isAvailable;
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
  updateMachineStatus,
};
