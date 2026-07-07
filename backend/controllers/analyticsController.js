const Job = require('../models/Job');

exports.getAnalytics = async (req, res) => {
  try {
    const jobs = await Job.find();

    const summary = {
      totalApplications: jobs.length,
      applied: jobs.filter((job) => job.status === 'Applied').length,
      onlineAssessment: jobs.filter((job) => job.status === 'Online Assessment').length,
      interview: jobs.filter((job) => job.status === 'Interview').length,
      hrRound: jobs.filter((job) => job.status === 'HR Round').length,
      offer: jobs.filter((job) => job.status === 'Offer').length,
      rejected: jobs.filter((job) => job.status === 'Rejected').length
    };

    const statusData = Object.entries(summary)
      .filter(([key]) => key !== 'totalApplications')
      .map(([name, value]) => ({ name: name.replace(/([A-Z])/g, ' $1').trim(), value }));

    const typeData = ['Full-Time', 'Internship', 'Remote', 'Hybrid', 'Onsite'].map((type) => ({
      name: type,
      value: jobs.filter((job) => job.jobType === type).length
    }));

    res.status(200).json({ summary, statusData, typeData });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analytics', error: error.message });
  }
};
