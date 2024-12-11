const Job = require("../models/jobs.models");

exports.postJob = async (req, res) => {
  const { title, description } = req.body;

  try {
    const job = new Job({
      title,
      description,
      recruiter: req.user._id,
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error posting job", error: error.message });
  }
};

exports.viewApplicants = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user._id }).populate(
      [
        {
          path: "applicants",
          select: "-password",
        },
      ]
      //   "applicants"
    );
    res.json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching applicants", error: error.message });
  }
};
