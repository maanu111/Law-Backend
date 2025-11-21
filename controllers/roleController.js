const Role = require("../models/Role");

// Create role
exports.createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res
      .status(200)
      .json({
        status_code: 200,
        message: "Role created successfully",
        data: role,
      });
  } catch (err) {
    res.status(500).json({ status_code: 500, message: err.message });
  }
};

// List roles (for dropdown or search)
exports.listRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({
      status_code: 200,
      data: { roles },
    });
  } catch (err) {
    res.status(500).json({ status_code: 500, message: err.message });
  }
};

// Update role
exports.updateRole = async (req, res) => {
  try {
    const updated = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({
        status_code: 200,
        message: "Role updated successfully",
        data: updated,
      });
  } catch (err) {
    res.status(500).json({ status_code: 500, message: err.message });
  }
};

// Delete role
exports.deleteRole = async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ status_code: 200, message: "Role deleted successfully" });
  } catch (err) {
    res.status(500).json({ status_code: 500, message: err.message });
  }
};
