const mongoose = require("mongoose");

const defendantRecordSchema = new mongoose.Schema(
  {
    plt_id: { type: mongoose.Schema.Types.ObjectId, ref: "Plaintiff" },
    def_atty_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DefendantAttorney",
    },

    agent: String,
    start_date: Date,
    agent_phone: String,

    def_address: String,
    def_city: String,
    def_state: String,
    def_zip: String,

    def1_first_name: String,
    def1_middle_name: String,
    def1_last_name: String,

    def2_first_name: String,
    def2_middle_name: String,
    def2_last_name: String,

    def3_first_name: String,
    def3_middle_name: String,
    def3_last_name: String,

    def4_first_name: String,
    def4_middle_name: String,
    def4_last_name: String,

    def5_first_name: String,
    def5_middle_name: String,
    def5_last_name: String,

    def6_first_name: String,
    def6_middle_name: String,
    def6_last_name: String,

    case_type: String,
    case_number: String,
    jury_trial: String,
    jury_trial_attorney: String,

    memo: String,
    memo1: String,

    late_fee_yn: { type: String, enum: ["Y", "N"], default: "N" },
    hold_invoice_yn: { type: String, enum: ["Y", "N"], default: "N" },
    hourly_atty_initials: String,

    write_off_amt: { type: Number, default: 0 },
    write_off_date: Date,

    balance: { type: Number, default: 0 },
    writeoff_display: { type: Number, default: 0 },
    payments: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DefendantRecord", defendantRecordSchema);
