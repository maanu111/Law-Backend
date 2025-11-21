const express = require("express");
const {
  createRole,
  listRoles,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");

const router = express.Router();

router.post("/create", createRole);
router.get("/list", listRoles);
router.put("/update/:id", updateRole);
router.delete("/remove/:id", deleteRole);

module.exports = router;
