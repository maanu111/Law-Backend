const DefendantRecord = require("../models/DefendantRecord");

// create
exports.createDefendantRecord = async (req, res) => {
  try {
    const record = await DefendantRecord.create(req.body);
    res
      .status(201)
      .json({ status_code: 200, message: "Record created", data: record });
  } catch (err) {
    res.status(500).json({ status_code: 500, message: err.message });
  }
};

// list all
exports.listDefendantRecords = async (req, res) => {
  try {
    const records = await DefendantRecord.find().populate("plt_id def_atty_id");
    res.json({ status_code: 200, data: records });
  } catch (err) {
    res.status(500).json({ status_code: 500, message: err.message });
  }
};

// view one
exports.viewDefendantRecord = async (req, res) => {
  try {
    const record = await DefendantRecord.findById(req.params.id).populate(
      "plt_id def_atty_id"
    );
    if (!record)
      return res.status(404).json({ status_code: 404, message: "Not found" });
    res.json({ status_code: 200, data: record });
  } catch (err) {
    res.status(500).json({ status_code: 500, message: err.message });
  }
};

// update
exports.updateDefendantRecord = async (req, res) => {
  try {
    const record = await DefendantRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ status_code: 200, message: "Record updated", data: record });
  } catch (err) {
    res.status(500).json({ status_code: 500, message: err.message });
  }
};

// delete
exports.deleteDefendantRecord = async (req, res) => {
  try {
    await DefendantRecord.findByIdAndDelete(req.params.id);
    res.json({ status_code: 200, message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ status_code: 500, message: err.message });
  }
};
