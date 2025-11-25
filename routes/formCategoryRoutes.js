const express = require("express");
const router = express.Router();
const {
  listCategories,
  searchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/formCategoryController");

// Add your auth middleware here if needed
// const { authenticate } = require("./authMiddleware");

// POST /api/form-categories/search - Search categories with wildcard support (for form navigation)
router.post("/search", searchCategories);

// GET /api/form-categories - List all categories (with optional filters)
router.get("/", listCategories);

// POST /api/form-categories - Create new category
router.post("/", createCategory);

// PUT /api/form-categories/:id - Update category
router.put("/:id", updateCategory);

// DELETE /api/form-categories/:id - Delete category
router.delete("/:id", deleteCategory);

module.exports = router;
