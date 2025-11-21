const express = require("express");
const router = express.Router();
const {
  createDefendant,
  listAllDefendants,
  updateDefendant,
  deleteDefendant,
} = require("../controllers/defendantController");

router.post("/create", createDefendant);
router.get("/list", listAllDefendants);
router.put("/update/:id", updateDefendant);
router.delete("/delete/:id", deleteDefendant);

module.exports = router;
