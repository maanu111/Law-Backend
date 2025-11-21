const express = require("express");
const router = express.Router();
const {
  createPlaintiff,
  listAllPlaintiffs,
  updatePlaintiff,
  deletePlaintiff,
} = require("../controllers/plaintiffController");

router.post("/create", createPlaintiff);
router.get("/list", listAllPlaintiffs);
router.put("/update/:id", updatePlaintiff);
router.delete("/delete/:id", deletePlaintiff);

module.exports = router;
