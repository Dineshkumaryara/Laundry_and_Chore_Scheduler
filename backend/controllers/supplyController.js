const Supply = require("../models/Supply");

// @desc    Get all supplies for the logged-in user
// @route   GET /api/supplies
// @access  Private
const getSupplies = async (req, res) => {
  try {
    const supplies = await Supply.find({ user: req.user._id });
    res.status(200).json(supplies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching supplies", error: error.message });
  }
};

// @desc    Add a new supply
// @route   POST /api/supplies
// @access  Private
const addSupply = async (req, res) => {
  const { name, quantity, lowThreshold } = req.body;

  if (!name || !quantity || !lowThreshold) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    const supply = new Supply({
      user: req.user._id, // Attach the logged-in user
      name,
      quantity,
      lowThreshold,
    });

    const savedSupply = await supply.save();
    res.status(201).json(savedSupply);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding supply", error: error.message });
  }
};

// @desc    Update a supply's quantity
// @route   PUT /api/supplies/:id
// @access  Private
const updateSupply = async (req, res) => {
  const { quantity } = req.body;

  if (!quantity) {
    return res.status(400).json({ message: "Please provide the new quantity" });
  }

  try {
    const supply = await Supply.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!supply) {
      return res.status(404).json({ message: "Supply not found" });
    }

    supply.quantity = quantity;
    const updatedSupply = await supply.save();

    res.status(200).json(updatedSupply);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating supply", error: error.message });
  }
};

module.exports = {
  getSupplies,
  addSupply,
  updateSupply,
};
