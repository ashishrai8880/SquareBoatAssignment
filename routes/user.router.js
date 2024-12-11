const express = require("express");
const UserRouter = express.Router();
const UserController = require("../controllers/user.controller");

UserRouter.post("/register", UserController.createUser);
UserRouter.post("/login", UserController.login);

module.exports = UserRouter;
