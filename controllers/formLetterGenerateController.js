const Template = require("../models/Template");
const DefendantRecord = require("../models/DefendantRecord");
const Plaintiff = require("../models/Plaintiff");
const DefendantAttorney = require("../models/DefendantAttorney");
const axios = require("axios");

// Utility: replace {{FIELD}} occurrences
function replaceAll(content, key, value) {
  const regex = new RegExp(`{{${key}}}`, "g");
  return content.replace(regex, value || "");
}

exports.generateLetter = async (req, res) => {
  try {
    const { case_id, template_id } = req.body;

    if (!case_id || !template_id) {
      return res.status(400).json({
        status_code: 400,
        message: "case_id and template_id are required",
      });
    }

    // 1. Load template
    const template = await Template.findById(template_id);
    if (!template)
      return res.status(404).json({ message: "Template not found" });

    // Fetch Google Doc content (TEXT only for now)
    const googleDoc = await axios.get(template.google_doc_link);
    let content = googleDoc.data;

    // 2. Load full case record
    const caseRecord = await DefendantRecord.findById(case_id)
      .populate("plt_id")
      .populate("def_atty_id");

    if (!caseRecord)
      return res.status(404).json({ message: "Case record not found" });

    const p = caseRecord.plt_id; // plaintiff
    const d = caseRecord; // defendant record
    const atty = caseRecord.def_atty_id; // defendant attorney

    // 3. Build all bind fields
    const binds = {
      DATE: new Date().toLocaleDateString(),
      TIME: new Date().toLocaleTimeString(),

      // PLAINTIFF
      PLAINTIFF_FIRST_NAME: p?.first_name,
      PLAINTIFF_LAST_NAME: p?.last_name,
      PLAINTIFF_PHONE: p?.phone_no,
      PLAINTIFF_EMAIL: p?.email,
      PLAINTIFF_ADDRESS: `${p?.address1 || ""} ${p?.address2 || ""}`,
      PLAINTIFF_CITY: p?.city,
      PLAINTIFF_STATE: p?.state,
      PLAINTIFF_ZIP: p?.zip,

      // DEFENDANT RECORD (ALL 6 DEFENDANT NAMES)
      DEF1_FIRST: d.def1_first_name,
      DEF1_MIDDLE: d.def1_middle_name,
      DEF1_LAST: d.def1_last_name,

      DEF2_FIRST: d.def2_first_name,
      DEF2_MIDDLE: d.def2_middle_name,
      DEF2_LAST: d.def2_last_name,

      DEF3_FIRST: d.def3_first_name,
      DEF3_MIDDLE: d.def3_middle_name,
      DEF3_LAST: d.def3_last_name,

      DEF4_FIRST: d.def4_first_name,
      DEF4_MIDDLE: d.def4_middle_name,
      DEF4_LAST: d.def4_last_name,

      DEF5_FIRST: d.def5_first_name,
      DEF5_MIDDLE: d.def5_middle_name,
      DEF5_LAST: d.def5_last_name,

      DEF6_FIRST: d.def6_first_name,
      DEF6_MIDDLE: d.def6_middle_name,
      DEF6_LAST: d.def6_last_name,

      // CASE DETAILS
      CASE_TYPE: d.case_type,
      CASE_NUMBER: d.case_number,
      AGENT: d.agent,
      AGENT_PHONE: d.agent_phone,
      START_DATE: d.start_date
        ? new Date(d.start_date).toLocaleDateString()
        : "",

      // ADDRESS
      PROPERTY_ADDRESS: d.def_address,
      PROPERTY_CITY: d.def_city,
      PROPERTY_STATE: d.def_state,
      PROPERTY_ZIP: d.def_zip,

      // MONEY
      BALANCE: d.balance,
      WRITE_OFF_AMOUNT: d.write_off_amt,
      WRITE_OFF_DATE: d.write_off_date
        ? new Date(d.write_off_date).toLocaleDateString()
        : "",
      PAYMENTS: d.payments,

      // FLAGS
      JURY_TRIAL: d.jury_trial,
      HOLD_INVOICE: d.hold_invoice_yn,
      LATE_FEE: d.late_fee_yn,
      ATTORNEY_INITIALS: d.hourly_atty_initials,

      // DEFENDANT ATTORNEY
      DEF_ATTY_FULLNAME: atty?.full_name,
      DEF_ATTY_PHONE: atty?.phone_no,
      DEF_ATTY_EMAIL: atty?.email,
      DEF_ATTY_ADDRESS: atty
        ? `${atty.address1 || ""} ${atty.address2 || ""}`
        : "",
      DEF_ATTY_CITY: atty?.city,
      DEF_ATTY_STATE: atty?.state,
      DEF_ATTY_ZIP: atty?.zip,
    };

    // 4. Replace all bind fields in document
    Object.entries(binds).forEach(([key, value]) => {
      content = replaceAll(content, key, value);
    });

    // 5. Return the generated content as response
    return res.status(200).json({
      status_code: 200,
      message: "Letter generated successfully",
      content, // replaced template text
      binds_used: binds,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status_code: 500,
      message: err.message,
    });
  }
};
