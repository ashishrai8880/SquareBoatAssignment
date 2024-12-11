const express = require("express");
const RecruiterRouter = express.Router();
const authMiddleware = require("../middleware/jwt.middleware");
const RecruiterController = require("../controllers/recruiter.controller");

RecruiterRouter.post(
  "/create-job",
  authMiddleware,
  RecruiterController.postJob
);
RecruiterRouter.get(
  "/applicants",
  authMiddleware,
  RecruiterController.viewApplicants
);

module.exports = RecruiterRouter;
