const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const secretKey = process.env.JWT_SECRET_KEY;

async function registerUser(req, res) {
  const { username, password } = req.body;
  const usernameLower = username.toLowerCase();

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long." });
  }

  try {
    const newUser = await User.create({ username: usernameLower, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  const usernameLower = username.toLowerCase();
  try {
    const user = await User.findOne({ where: { username: usernameLower } });

    if (!user) {
      return res.status(404).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" }); // Adjust expiration as needed

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updatePassword(req, res) {
  const { username, oldPassword, newPassword } = req.body;
  const usernameLower = username.toLowerCase();
  try {
    const user = await User.findOne({ where: { username: usernameLower } });

    if (!user) {
      return res.status(404).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({ message: "Invalid username or password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  updatePassword,
};
