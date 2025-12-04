const Role = require("../models/Role");

// Create role
exports.createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(200).json({
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
    res.status(200).json({
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
exports.bulkImportRoles = async (req, res) => {
  try {
    const { roles } = req.body;

    if (!roles || !Array.isArray(roles) || roles.length === 0) {
      return res.status(400).json({
        status_code: 400,
        message: "No role data provided",
      });
    }

    let imported = 0;
    let updated = 0;
    let failed = 0;

    for (const role of roles) {
      try {
        const existing = await Role.findOne({ role_id: role.role_id });

        if (existing) {
          await Role.findOneAndUpdate(
            { role_id: role.role_id },
            { role_desc: role.role_desc }
          );
          updated++;
        } else {
          await Role.create({
            role_id: role.role_id,
            role_desc: role.role_desc,
          });
          imported++;
        }
      } catch (err) {
        failed++;
        console.log(`Failed: ${role.role_id} - ${err.message}`);
      }
    }

    res.status(200).json({
      status_code: 200,
      message: `Imported ${imported} new roles, updated ${updated} existing roles${
        failed > 0 ? `, ${failed} failed` : ""
      }`,
      data: { imported, updated, failed },
    });
  } catch (error) {
    res.status(400).json({
      status_code: 400,
      message: error.message,
    });
  }
};
