const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// -------------------------------------------------------------
// GET LOGGED-IN USER PROFILE
// -------------------------------------------------------------
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "role", "createdAt"],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Get Profile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------------------------------------------
// ADMIN — GET ALL USERS
// -------------------------------------------------------------
exports.getAllUsers = async (req, res) => {
  try {
    const list = await User.findAll({
      attributes: ["id", "name", "email", "role", "createdAt"],
      order: [["createdAt", "DESC"]],
    });

    res.json(list);
  } catch (err) {
    console.error("Get All Users Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------------------------------------------
// ADMIN — DELETE USER
// -------------------------------------------------------------
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    await user.destroy();

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------------------------------------------
// ADMIN — UPDATE USER (EMAIL + ROLE)
// -------------------------------------------------------------
exports.updateUser = async (req, res) => {
  try {
    const { email, role, name } = req.body;

    const user = await User.findByPk(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    // update fields ONLY if provided
    if (email) user.email = email;
    if (role) user.role = role;
    if (name) user.name = name;

    await user.save();

    res.json({ message: "User updated", user });
  } catch (err) {
    console.error("Update User Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------------------------------------------
// ADMIN — MAKE USER ADMIN
// -------------------------------------------------------------
exports.makeAdmin = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.role = "admin";
    await user.save();

    res.json({ message: "User promoted to admin", user });
  } catch (err) {
    console.error("Make Admin Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------------------------------------------
// REGISTER USER (used by auth register route)
// -------------------------------------------------------------
exports.register = async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ where: { email } });
    if (exists)
      return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
    });

    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------------------------------------------
// LOGIN USER (used by auth login route)
// -------------------------------------------------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
