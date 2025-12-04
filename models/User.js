const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: false },
    last_name: { type: String },
    email_address: { type: String, required: false, sparse: true, default: "" },
    mobile_number: { type: String },
    roles: [{ type: String }],
    disabled_yn: { type: String, enum: ["Y", "N"], default: "N" },
    must_change_password: { type: String, enum: ["Y", "N"], default: "Y" },
    last_updated: {
      user_id: { type: String },
      updatedAt: { type: Date },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
