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
      data: {
        plaintiffs: plaintiffs.map((p) => ({
          ...p.toObject(),
          id: p._id.toString(),
        })),
      }, // ✅ Correct
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
exports.bulkImportPlaintiffs = async (req, res) => {
  try {
    const { plaintiffs } = req.body;

    if (!plaintiffs || !Array.isArray(plaintiffs) || plaintiffs.length === 0) {
      return res.status(400).json({
        status_code: 400,
        message: "No plaintiff data provided",
      });
    }

    const results = await Plaintiff.insertMany(plaintiffs, {
      ordered: false,
    });

    res.status(200).json({
      status_code: 200,
      message: `Successfully imported ${results.length} plaintiffs`,
      data: { imported: results.length },
    });
  } catch (error) {
    if (error.code === 11000) {
      const imported = error.insertedDocs?.length || 0;
      return res.status(200).json({
        status_code: 200,
        message: `Imported ${imported} plaintiffs. Some duplicates were skipped.`,
        data: { imported },
      });
    }

    res.status(400).json({
      status_code: 400,
      message: error.message,
    });
  }
};
