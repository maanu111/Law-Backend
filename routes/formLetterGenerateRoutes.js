const express = require("express");
const router = express.Router();
const {
  generateLetter,
} = require("../controllers/formLetterGenerateController");

router.post("/generate", generateLetter);

module.exports = router;
