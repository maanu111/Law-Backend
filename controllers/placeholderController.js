const Placeholder = require("../models/Placeholder");

exports.createPlaceholder = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const exists = await Placeholder.findOne({ name });
    if (exists)
      return res.status(200).json({ message: "Already exists", data: exists });

    const saved = await Placeholder.create({ name });
    res.status(200).json({ message: "Placeholder saved", data: saved });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPlaceholders = async (req, res) => {
  try {
    const list = await Placeholder.find().sort({ name: 1 });
    res.status(200).json({ data: list });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
