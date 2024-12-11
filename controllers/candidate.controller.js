const Job = require("../models/jobs.models");
const User = require("../models/users.models");
const nodemailer = require("nodemailer"); // Using Nodemailer for sending emails

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ashishrai8880@gmail.com", // Replace with your email
    pass: process.env.EMAIL_PASSWORD, // Replace with your email password
  },
});

exports.viewJobs = async (req, res) => {
  try {
    const jobs = await Job.find().select("-applicants");
    res.json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching jobs", error: error.message });
  }
};

exports.applyJob = async (req, res) => {
  const { jobId } = req.body;

  try {
    const job = await Job.findById(jobId);
    const candidate = req.user; // Get the current logged-in user from the middleware

    if (!job) return res.status(404).json({ message: "Job not found" });

    job.applicants.push(candidate._id);
    await job.save();

    // Send email to candidate and recruiter
    const recruiter = await User.findById(job.recruiter);
    const candidateEmail = candidate.email;
    const recruiterEmail = recruiter.email;

    // Send Email to Candidate
    transporter.sendMail({
      to: candidateEmail,
      subject: "Job Application",
      text: `You have successfully applied for the job: ${job.title}`,
    });

    // Send Email to Recruiter
    transporter.sendMail({
      to: recruiterEmail,
      subject: "New Job Application",
      text: `A candidate has applied for the job: ${job.title}`,
    });

    res.status(200).json({ message: "Job applied successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error applying to job", error: error.message });
  }
};

exports.viewAppliedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ applicants: req.user._id }).select(
      "-applicants"
    );
    res.json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching applied jobs", error: error.message });
  }
};
