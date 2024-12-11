const User = require("../models/users.models");
const jwt = require("jsonwebtoken");
const usersModels = require("../models/users.models");
const { signToken } = require("../utils/jwt.utils");

exports.createUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = new User(req.body);
    await user.save();

    res
      .status(201)
      .json({ message: "You have succesfully registered ", role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Error in signup", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken(user);

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Error in login", error: error.message });
  }
};
