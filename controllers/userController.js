const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Create User
exports.createUser = async (req, res) => {
  try {
    const {
      user_id,
      password,
      first_name,
      last_name,
      email_address,
      mobile_number,
      roles,
      disabled_yn,
      must_change_password,
    } = req.body;

    if (!user_id || !password || !email_address) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      user_id,
      password: hashedPassword,
      first_name,
      last_name,
      email_address,
      mobile_number,
      roles,
      disabled_yn,
      must_change_password,
    });

    res.status(200).json({
      status_code: 200,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// List All Users (with filters)
exports.listAllUsers = async (req, res) => {
  try {
    const filters = req.body.data || {};
    const query = {};

    if (filters.user_id)
      query.user_id = { $regex: filters.user_id, $options: "i" };
    if (filters.first_name)
      query.first_name = { $regex: filters.first_name, $options: "i" };
    if (filters.last_name)
      query.last_name = { $regex: filters.last_name, $options: "i" };
    if (filters.email_address)
      query.email_address = { $regex: filters.email_address, $options: "i" };
    if (filters.mobile_number)
      query.mobile_number = { $regex: filters.mobile_number, $options: "i" };
    if (filters.roles?.length) query.roles = { $in: filters.roles };
    if (filters.disabled_yn) query.disabled_yn = filters.disabled_yn;
    if (filters.must_change_password)
      query.must_change_password = filters.must_change_password;

    const users = await User.find(query);

    res.status(200).json({
      status_code: 200,
      message: users.length ? "Users fetched successfully" : "No users found",
      data: { users },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// View Single User by ID
exports.viewUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      status_code: 200,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status_code: 200,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      status_code: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
