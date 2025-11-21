const Defendant = require("../models/Defendant");

exports.createDefendant = async (req, res) => {
  try {
    const defendant = await Defendant.create(req.body);
    res.status(200).json({
      status_code: 200,
      message: "Defendant created successfully",
      data: defendant,
    });
  } catch (error) {
    res.status(400).json({ status_code: 400, message: error.message });
  }
};

exports.listAllDefendants = async (req, res) => {
  try {
    const defendants = await Defendant.find().sort({ createdAt: -1 });
    res.status(200).json({
      status_code: 200,
      message: "Defendants fetched successfully",
      data: { items: defendants },
    });
  } catch (error) {
    res.status(400).json({ status_code: 400, message: error.message });
  }
};

exports.updateDefendant = async (req, res) => {
  try {
    const { id } = req.params;
    const defendant = await Defendant.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status_code: 200,
      message: "Defendant updated successfully",
      data: defendant,
    });
  } catch (error) {
    res.status(400).json({ status_code: 400, message: error.message });
  }
};

exports.deleteDefendant = async (req, res) => {
  try {
    const { id } = req.params;
    await Defendant.findByIdAndDelete(id);
    res.status(200).json({
      status_code: 200,
      message: "Defendant deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ status_code: 400, message: error.message });
  }
};
