const express = require("express");
const {
  createDefendantRecord,
  listDefendantRecords,
  viewDefendantRecord,
  updateDefendantRecord,
  deleteDefendantRecord,
} = require("../controllers/defendantRecordsController");

const router = express.Router();

router.post("/create", createDefendantRecord);
router.get("/list", listDefendantRecords);
router.get("/view/:id", viewDefendantRecord);
router.put("/update/:id", updateDefendantRecord);
router.delete("/remove/:id", deleteDefendantRecord);

module.exports = router;
