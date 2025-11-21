const mongoose = require("mongoose");

const formTemplateSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true, index: true },
    template_id: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true, trim: true },
    google_doc_link: { type: String, required: true, trim: true },

    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    last_updated: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model("FormTemplate", formTemplateSchema);
