const express = require("express");
const router = express.Router();
const {
  createPlaintiff,
  listAllPlaintiffs,
  updatePlaintiff,
  deletePlaintiff,
  bulkImportPlaintiffs,
} = require("../controllers/plaintiffController");

router.post("/create", createPlaintiff);
router.get("/list", listAllPlaintiffs);
router.post("/list-all", listAllPlaintiffs);
router.put("/update/:id", updatePlaintiff);
router.delete("/delete/:id", deletePlaintiff);
router.post("/bulk-import", bulkImportPlaintiffs);
module.exports = router;
