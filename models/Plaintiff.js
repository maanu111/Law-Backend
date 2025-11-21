const mongoose = require("mongoose");

const plaintiffSchema = new mongoose.Schema(
  {
    plt_id: { type: String, required: true, unique: true },
    first_name: { type: String },
    last_name: { type: String },
    attention: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    work_phone: { type: String },
    home_phone: { type: String },
    fax_number: { type: String },
    mobile_no: { type: String },
    mobile_no_2: { type: String },
    email_address: { type: String },
    last_user: {
      user_id: { type: String },
      updated_at: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plaintiff", plaintiffSchema);
