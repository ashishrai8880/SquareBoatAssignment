const jwt = require("jsonwebtoken");
const User = require("../models/users.models");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, "process.env.JWT_SECRET");
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // Attach the user to the request object
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token", error: error.message });
  }
};
