const express = require("express");
const {
  createRole,
  listRoles,
  updateRole,
  deleteRole,
  bulkImportRoles,
} = require("../controllers/roleController");

const router = express.Router();

router.post("/create", createRole);
router.post("/list-all", listRoles);
router.put("/update/:id", updateRole);
router.delete("/remove/:id", deleteRole);
router.post("/bulk-import", bulkImportRoles);

module.exports = router;
