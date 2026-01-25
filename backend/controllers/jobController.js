import asyncHandler from 'express-async-handler';
import Job from '../models/Job.js';


export const createJob = asyncHandler(async (req, res) => {
  const { title, description, skills, budget } = req.body;

  if (!title || !description || !budget) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const job = await Job.create({
    title,
    description,
    skills,
    budget,
    client: req.user._id,
  });

  res.status(201).json(job);
});

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = asyncHandler(async (req, res) => {
  const {skill, title}=req.query;
  let filter={}
  if (skill) {
    filter.skills = { $in: [skill] };
  }

  if (title) {
    filter.title = { $regex: title, $options: "i" }; // case-insensitive search
  }

  const jobs = await Job.find(filter).populate('client', 'name email');
  res.json(jobs);
});

// @desc    Get a job by ID
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate('client', 'name email');

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  res.json(job);
});

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private
export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  if (job.client.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this job');
  }

  const { title, description, skills, budget } = req.body;

  job.title = title || job.title;
  job.description = description || job.description;
  job.skills = skills || job.skills;
  job.budget = budget || job.budget;

  const updatedJob = await job.save();
  res.json(updatedJob);
});

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private
export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  if (job.client.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this job');
  }

  await job.deleteOne();
  res.json({ message: 'Job removed' });
});
