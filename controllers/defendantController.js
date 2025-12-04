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
      data: {
        defendantAttorneys: defendants.map((d) => ({
          ...d.toObject(),
          id: d._id.toString(),
        })),
      },
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
exports.bulkImportDefendants = async (req, res) => {
  try {
    const { defendants } = req.body;

    if (!defendants || !Array.isArray(defendants)) {
      return res.status(400).json({
        status_code: 400,
        message: "Defendants data is required and must be an array",
      });
    }

    // Filter out empty records and validate required fields
    const validDefendants = defendants.filter(
      (defendant) => defendant.ATTY_ID && defendant.ATTY_FULL_NAME
    );

    if (validDefendants.length === 0) {
      return res.status(400).json({
        status_code: 400,
        message: "No valid defendants found to import",
      });
    }

    // Use bulk write for better performance
    const bulkOps = validDefendants.map((defendant) => ({
      updateOne: {
        filter: { ATTY_ID: defendant.ATTY_ID },
        update: { $set: defendant },
        upsert: true, // Create if doesn't exist, update if exists
      },
    }));

    const result = await Defendant.bulkWrite(bulkOps);

    res.status(200).json({
      status_code: 200,
      message: `Bulk import successful. ${result.upsertedCount} inserted, ${result.modifiedCount} updated`,
      data: {
        inserted: result.upsertedCount,
        updated: result.modifiedCount,
        total: validDefendants.length,
      },
    });
  } catch (error) {
    console.error("Bulk import error:", error);
    res.status(400).json({
      status_code: 400,
      message: error.message,
    });
  }
};
