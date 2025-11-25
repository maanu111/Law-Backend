const FormCategory = require("../models/formCategoryModel");

// Helper function to build wildcard query
const buildWildcardQuery = (field, value) => {
  if (!value || value.trim() === "") return null;

  const trimmedValue = value.trim();

  // @ means field is null
  if (trimmedValue === "@") {
    return { [field]: { $in: [null, ""] } };
  }

  // ! means field is not null
  if (trimmedValue === "!") {
    return { [field]: { $nin: [null, ""], $exists: true } };
  }

  // > means greater than
  if (trimmedValue.startsWith(">")) {
    const compareValue = trimmedValue.substring(1);
    return { [field]: { $gt: compareValue } };
  }

  // < means less than
  if (trimmedValue.startsWith("<")) {
    const compareValue = trimmedValue.substring(1);
    return { [field]: { $lt: compareValue } };
  }

  // % is wildcard (matches any character)
  if (trimmedValue.includes("%")) {
    const regexPattern = trimmedValue.replace(/%/g, ".*");
    return { [field]: { $regex: new RegExp(`^${regexPattern}$`, "i") } };
  }

  // Default: exact match (case-insensitive)
  return { [field]: { $regex: new RegExp(`^${trimmedValue}$`, "i") } };
};

// Search categories with wildcard support (for form-based navigation)
exports.searchCategories = async (req, res) => {
  try {
    const { catg_id, catg_desc } = req.body;

    // Build query with wildcard support
    const query = {};

    const catgIdQuery = buildWildcardQuery("catg_id", catg_id);
    const catgDescQuery = buildWildcardQuery("catg_desc", catg_desc);

    if (catgIdQuery) Object.assign(query, catgIdQuery);
    if (catgDescQuery) Object.assign(query, catgDescQuery);

    const categories = await FormCategory.find(query).sort({ catg_id: 1 });

    res.status(200).json({
      status: "success",
      status_code: 200,
      message:
        categories.length > 0 ? "Categories found" : "No categories found",
      data: {
        categories: categories,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      status_code: 500,
      message: "Failed to search categories",
      error: error.message,
    });
  }
};

// Get all categories with optional filters (for table view)
exports.listCategories = async (req, res) => {
  try {
    const { catg_id, catg_desc } = req.query;

    // Build query object
    const query = {};
    if (catg_id) {
      query.catg_id = { $regex: catg_id, $options: "i" }; // case-insensitive search
    }
    if (catg_desc) {
      query.catg_desc = { $regex: catg_desc, $options: "i" };
    }

    const categories = await FormCategory.find(query).sort({ catg_id: 1 });

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};

// Create new category
exports.createCategory = async (req, res) => {
  try {
    const { catg_id, catg_desc } = req.body;

    // Validation
    if (!catg_id || !catg_desc) {
      return res.status(400).json({
        success: false,
        status_code: 400,
        message: "CATG_ID and CATG_DESC are required",
      });
    }

    // Check if category ID already exists
    const existing = await FormCategory.findOne({
      catg_id: catg_id.toUpperCase(),
    });
    if (existing) {
      return res.status(400).json({
        success: false,
        status_code: 400,
        message: "Category ID already exists",
      });
    }

    // Get user ID from token/session (adjust based on your auth)
    const userId = req.user?.id || req.user?.username || "system";

    const newCategory = new FormCategory({
      catg_id: catg_id.toUpperCase(),
      catg_desc,
      last_user_id: userId,
    });

    await newCategory.save();

    res.status(201).json({
      success: true,
      status_code: 200,
      data: newCategory,
      message: "Category created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: error.message,
    });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { catg_desc } = req.body;

    if (!catg_desc) {
      return res.status(400).json({
        success: false,
        status_code: 400,
        message: "CATG_DESC is required",
      });
    }

    // Get user ID from token/session
    const userId = req.user?.id || req.user?.username || "system";

    const updated = await FormCategory.findByIdAndUpdate(
      id,
      {
        catg_desc,
        last_user_id: userId,
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        status_code: 404,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      status_code: 200,
      data: updated,
      message: "Category updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update category",
      error: error.message,
    });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await FormCategory.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        status_code: 404,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      status_code: 200,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: error.message,
    });
  }
};

// Create new category
exports.createCategory = async (req, res) => {
  try {
    const { catg_id, catg_desc } = req.body;

    // Validation
    if (!catg_id || !catg_desc) {
      return res.status(400).json({
        success: false,
        message: "CATG_ID and CATG_DESC are required",
      });
    }

    // Check if category ID already exists
    const existing = await FormCategory.findOne({
      catg_id: catg_id.toUpperCase(),
    });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Category ID already exists",
      });
    }

    // Get user ID from token/session (adjust based on your auth)
    const userId = req.user?.id || req.user?.username || "system";

    const newCategory = new FormCategory({
      catg_id: catg_id.toUpperCase(),
      catg_desc,
      last_user_id: userId,
    });

    await newCategory.save();

    res.status(201).json({
      success: true,
      data: newCategory,
      message: "Category created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: error.message,
    });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { catg_desc } = req.body;

    if (!catg_desc) {
      return res.status(400).json({
        success: false,
        message: "CATG_DESC is required",
      });
    }

    // Get user ID from token/session
    const userId = req.user?.id || req.user?.username || "system";

    const updated = await FormCategory.findByIdAndUpdate(
      id,
      {
        catg_desc,
        last_user_id: userId,
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updated,
      message: "Category updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update category",
      error: error.message,
    });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await FormCategory.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: error.message,
    });
  }
};
