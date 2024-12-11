const CandidateRouter = require("./candidate.route");
const RecruiterRouter = require("./recruiter.route");
const UserRouter = require("./user.router");

const api = require("express")();

api.use("/user", UserRouter);
api.use("/candidate", CandidateRouter);
api.use("/recruiter", RecruiterRouter);

module.exports = api;
