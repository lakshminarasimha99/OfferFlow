const Job = require('../models/Job');

exports.getJobs = async (req, res) => {
  try {
    const { search, status, jobType, sortBy } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { jobRole: { $regex: search, $options: 'i' } }
      ];
    }

    if (status) query.status = status;
    if (jobType) query.jobType = jobType;

    let sort = { applicationDate: -1 };
    if (sortBy === 'oldest') sort = { applicationDate: 1 };
    if (sortBy === 'az') sort = { companyName: 1 };
    if (sortBy === 'za') sort = { companyName: -1 };

    const jobs = await Job.find(query).sort(sort);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch job', error: error.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create job', error: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update job', error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete job', error: error.message });
  }
};
