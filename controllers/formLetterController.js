const FormTemplate = require("../models/FormLetter");

// Create a new template
exports.createFormLetter = async (req, res) => {
  try {
    const { category, template_id, description, google_doc_link } = req.body;

    // Validation
    if (!category || !template_id || !description || !google_doc_link) {
      return res.status(400).json({
        status_code: 400,
        message:
          "All fields are required: category, template_id, description, google_doc_link",
      });
    }

    const template = new FormTemplate({
      category: category.trim(),
      template_id: template_id.trim(),
      description: description.trim(),
      google_doc_link: google_doc_link.trim(),
      updated_by: req.user?._id,
      last_updated: Date.now(),
    });

    await template.save();

    res.status(200).json({
      status_code: 200,
      message: "Template saved successfully",
      data: template,
    });
  } catch (error) {
    console.error("Error creating template:", error);
    res.status(500).json({
      status_code: 500,
      message: "Error saving template",
      error: error.message,
    });
  }
};

// List all templates
exports.listFormLetters = async (req, res) => {
  try {
    const filter = {};

    // Query-by-example (search)
    if (req.query.category) {
      filter.category = new RegExp(req.query.category, "i");
    }
    if (req.query.template_id) {
      filter.template_id = new RegExp(req.query.template_id, "i");
    }
    if (req.query.description) {
      filter.description = new RegExp(req.query.description, "i");
    }

    const templates = await FormTemplate.find(filter)
      .sort({ last_updated: -1 })
      .populate("updated_by", "first_name last_name");

    res.status(200).json({
      status_code: 200,
      data: templates,
    });
  } catch (error) {
    console.error("Error listing templates:", error);
    res.status(500).json({
      status_code: 500,
      message: "Error fetching templates",
      error: error.message,
    });
  }
};

// Get a single template by ID
exports.getFormLetter = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await FormTemplate.findById(id).populate(
      "updated_by",
      "first_name last_name"
    );

    if (!template) {
      return res.status(404).json({
        status_code: 404,
        message: "Template not found",
      });
    }

    res.status(200).json({
      status_code: 200,
      data: template,
    });
  } catch (error) {
    console.error("Error fetching template:", error);
    res.status(500).json({
      status_code: 500,
      message: "Error fetching template",
      error: error.message,
    });
  }
};

// Update a template
exports.updateFormLetter = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, template_id, description, google_doc_link } = req.body;

    const updated = {
      category,
      template_id,
      description,
      google_doc_link,
      updated_by: req.user?._id,
      last_updated: Date.now(),
    };

    const template = await FormTemplate.findByIdAndUpdate(id, updated, {
      new: true,
      runValidators: true,
    });

    if (!template) {
      return res.status(404).json({
        status_code: 404,
        message: "Template not found",
      });
    }

    res.status(200).json({
      status_code: 200,
      message: "Template updated successfully",
      data: template,
    });
  } catch (error) {
    console.error("Error updating template:", error);
    res.status(500).json({
      status_code: 500,
      message: "Error updating template",
      error: error.message,
    });
  }
};

// Delete a template
exports.deleteFormLetter = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await FormTemplate.findByIdAndDelete(id);

    if (!template) {
      return res.status(404).json({
        status_code: 404,
        message: "Template not found",
      });
    }

    res.status(200).json({
      status_code: 200,
      message: "Template deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting template:", error);
    res.status(500).json({
      status_code: 500,
      message: "Error deleting template",
      error: error.message,
    });
  }
};
