const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email_address, password, user_id } =
      req.body;

    const exist = await User.findOne({ email_address });
    if (exist)
      return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({
      user_id,
      first_name,
      last_name,
      email_address,
      password, // auto-hashed in pre-save
    });

    return res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email_address, password } = req.body;

    const user = await User.findOne({ email_address });
    if (!user) {
      return res.status(400).json({
        status_code: 400,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status_code: 400,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      status_code: 200,
      message: "Login success",
      data: {
        token,
        user: {
          id: user._id,
          user_id: user.user_id,
          first_name: user.first_name,
          last_name: user.last_name,
          email_address: user.email_address,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({
      status_code: 500,
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = { registerUser, loginUser };
