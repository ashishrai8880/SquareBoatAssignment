const express = require("express");
const CandidateRouter = express.Router();
const authMiddleware = require("../middleware/jwt.middleware");
const CandidateController = require("../controllers/candidate.controller");

CandidateRouter.get("/jobs", authMiddleware, CandidateController.viewJobs); //for get all job
CandidateRouter.post("/apply", authMiddleware, CandidateController.applyJob); // for applying job
CandidateRouter.get(
  "/applied",
  authMiddleware,
  CandidateController.viewAppliedJobs
); // get all applied job

module.exports = CandidateRouter;
