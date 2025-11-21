const express = require("express");
const router = express.Router();

const formLetterController = require("../controllers/formLetterController");

// Create a template
router.post("/templates/create", formLetterController.createFormLetter);

// List templates (supports query-by-example)
router.get("/templates/list", formLetterController.listFormLetters);

// Get single template
router.get("/templates/:id", formLetterController.getFormLetter);

// Update template
router.put("/templates/update/:id", formLetterController.updateFormLetter);

// Delete template
router.delete("/templates/delete/:id", formLetterController.deleteFormLetter);

module.exports = router;
