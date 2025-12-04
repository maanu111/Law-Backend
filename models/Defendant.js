const mongoose = require("mongoose");

const defendantSchema = new mongoose.Schema(
  {
    ATTY_ID: { type: String, required: true, unique: true },
    ATTY_FULL_NAME: { type: String, required: true },
    ATTY_LAW_FIRM: { type: String },
    ATTY_ADDRESS1: { type: String },
    ATTY_ADDRESS2: { type: String },
    ATTY_CITY: { type: String },
    ATTY_STATE: { type: String },
    ATTY_ZIP: { type: String },
    PHONE_NO: { type: String },
    FAX_NO: { type: String },
    EMAIL: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Defendant", defendantSchema);
