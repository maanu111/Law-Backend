const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const defendantRecordsRoutes = require("./routes/defendantRecords.js");
const roleRoutes = require("./routes/roleRoutes");
const plaintiffRoutes = require("./routes/plaintiffRoutes");
const defendantRoutes = require("./routes/defendantRoutes");
const placeholderRoutes = require("./routes/placeholderRoutes");
const formLetterRoutes = require("./routes/formLetterRoutes");
const formCategoryRoutes = require("./routes/formCategoryRoutes");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/defendantRecords", defendantRecordsRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/plaintiff", plaintiffRoutes);
app.use("/api/defendant", defendantRoutes);
app.use("/api/placeholders", placeholderRoutes);
app.use("/api/form-letters", formLetterRoutes);
app.use("/api/form-categories", formCategoryRoutes);
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));

app.get("/", (req, res) => {
  res.send("LawFirm backend running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
