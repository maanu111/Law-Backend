const mongoose = require("mongoose");

const defendantSchema = new mongoose.Schema(
  {
    atty_id: { type: String, required: true, unique: true },
    full_name: { type: String, required: true },
    law_firm: { type: String },
    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    phone_no: { type: String },
    fax_no: { type: String },
    email: { type: String },
    last_user: {
      user_id: { type: String },
      updated_at: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Defendant", defendantSchema);
