const Plaintiff = require("../models/Plaintiff");

exports.createPlaintiff = async (req, res) => {
  try {
    const plaintiff = await Plaintiff.create(req.body);
    res.status(200).json({
      status_code: 200,
      message: "Plaintiff created successfully",
      data: plaintiff,
    });
  } catch (error) {
    res.status(400).json({ status_code: 400, message: error.message });
  }
};

exports.listAllPlaintiffs = async (req, res) => {
  try {
    const plaintiffs = await Plaintiff.find().sort({ createdAt: -1 });
    res.status(200).json({
      status_code: 200,
      message: "Plaintiffs fetched successfully",
      data: { items: plaintiffs },
    });
  } catch (error) {
    res.status(400).json({ status_code: 400, message: error.message });
  }
};

exports.updatePlaintiff = async (req, res) => {
  try {
    const { id } = req.params;
    const plaintiff = await Plaintiff.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status_code: 200,
      message: "Plaintiff updated successfully",
      data: plaintiff,
    });
  } catch (error) {
    res.status(400).json({ status_code: 400, message: error.message });
  }
};

exports.deletePlaintiff = async (req, res) => {
  try {
    const { id } = req.params;
    await Plaintiff.findByIdAndDelete(id);
    res.status(200).json({
      status_code: 200,
      message: "Plaintiff deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ status_code: 400, message: error.message });
  }
};
