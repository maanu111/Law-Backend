const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    role_id: { type: String, required: true, unique: true },
    role_desc: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
