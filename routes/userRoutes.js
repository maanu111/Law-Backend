const express = require("express");
const {
  createUser,
  listAllUsers,
  viewUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", createUser);
router.patch("/list-all", listAllUsers);
router.get("/view/:id", viewUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

// Optional protected test route
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

module.exports = router;
