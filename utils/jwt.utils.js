const jwt = require("jsonwebtoken");
module.exports = {
  signToken: (user) => {
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  },
};
