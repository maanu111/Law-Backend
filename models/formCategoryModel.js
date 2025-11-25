const mongoose = require("mongoose");

const formCategorySchema = new mongoose.Schema(
  {
    catg_id: {
      type: String,
      required: true,
      unique: true,
      maxlength: 10,
      uppercase: true,
      trim: true,
    },
    catg_desc: {
      type: String,
      required: true,
      maxlength: 30,
      trim: true,
    },
    last_user_id: {
      type: String,
      maxlength: 20,
    },
  },
  {
    timestamps: true,
    collection: "form_categories",
  }
);

// Indexes for faster searching
formCategorySchema.index({ catg_id: 1 });
formCategorySchema.index({ catg_desc: 1 });

const FormCategory = mongoose.model("FormCategory", formCategorySchema);

module.exports = FormCategory;
