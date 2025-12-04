const express = require("express");
const router = express.Router();
const {
  createDefendant,
  listAllDefendants,
  updateDefendant,
  deleteDefendant,
  bulkImportDefendants,
} = require("../controllers/defendantController");

router.post("/create", createDefendant);
router.get("/list", listAllDefendants);
router.post("/list-all", listAllDefendants);
router.put("/update/:id", updateDefendant);
router.delete("/delete/:id", deleteDefendant);
router.post("/bulk-import", bulkImportDefendants);
module.exports = router;
