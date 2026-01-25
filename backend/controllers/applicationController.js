

// // controllers/applicationController.js
// import asyncHandler from 'express-async-handler';
// import Application from '../models/applicationModel.js';
// import Job from '../models/jobModel.js';

// // Apply for a job
// export const applyJob = asyncHandler(async (req, res) => {
//   const { jobId, coverLetter } = req.body;
//   const job = await Job.findById(jobId);
//   if (!job) { res.status(404); throw new Error('Job not found'); }

//   const alreadyApplied = await Application.findOne({ job: jobId, freelancer: req.user._id });
//   if (alreadyApplied) { res.status(400); throw new Error('You already applied for this job'); }

//   const application = await Application.create({ job: jobId, freelancer: req.user._id, coverLetter });
//   res.status(201).json(application);
// });

// // Get freelancer applications
// export const getMyApplications = asyncHandler(async (req, res) => {
//   const applications = await Application.find({ freelancer: req.user._id }).populate('job');
//   res.json(applications);
// });

// // Update status (client only)
// export const updateApplicationStatus = asyncHandler(async (req, res) => {
//   const application = await Application.findById(req.params.id);
//   if (!application) { res.status(404); throw new Error('Application not found'); }

//   const job = await Job.findById(application.job);
//   if (job.client.toString() !== req.user._id.toString()) { res.status(401); throw new Error('Not authorized'); }

//   application.status = req.body.status;
//   await application.save();
//   res.json(application);
// });


// controllers/applicationController.js
import asyncHandler from 'express-async-handler';
import Application from '../models/Application.js';
import Job from '../models/Job.js';

// Apply for a job
export const applyJob = asyncHandler(async (req, res) => {
  const { jobId, proposal } = req.body;
  const job = await Job.findById(jobId);
  if (!job) { res.status(404); throw new Error('Job not found'); }

  const alreadyApplied = await Application.findOne({ job: jobId, freelancer: req.user._id });
  if (alreadyApplied) { res.status(400); throw new Error('You already applied for this job'); }

  const application = await Application.create({ job: jobId, freelancer: req.user._id, proposal });
  res.status(201).json(application);
});

// Get freelancer applications
export const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ freelancer: req.user._id }).populate('job');
  res.json(applications);
});

// Update status (client only)
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (!application) { res.status(404); throw new Error('Application not found'); }

  const job = await Job.findById(application.job);
  if (job.client.toString() !== req.user._id.toString()) { res.status(401); throw new Error('Not authorized'); }

  application.status = req.body.status;
  await application.save();
  res.json(application);
});
