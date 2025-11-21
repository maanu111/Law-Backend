const express = require("express");
const router = express.Router();

const {
  createPlaceholder,
  getPlaceholders,
} = require("../controllers/placeholderController");

router.post("/create", createPlaceholder);
router.get("/list", getPlaceholders);

module.exports = router;
