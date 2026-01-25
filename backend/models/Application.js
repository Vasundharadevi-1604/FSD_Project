// const mongoose = require('mongoose');

// const applicationSchema = new mongoose.Schema({
//     job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
//     freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     coverLetter: String,
//     status: { type: String, enum: ['applied','accepted','rejected'], default: 'applied' }
// }, { timestamps: true });

// module.exports = mongoose.model('Application', applicationSchema);


// import mongoose from 'mongoose';

// const applicationSchema = new mongoose.Schema({
//   job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
//   freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   coverLetter: { type: String },
//   status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
// }, { timestamps: true });

// const Application = mongoose.model('Application', applicationSchema);
// export default Application;

// const mongoose = require('mongoose');

// const applicationSchema = mongoose.Schema({
//   job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
//   freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   coverLetter: { type: String, required: true },
//   status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
// }, { timestamps: true });

// module.exports = mongoose.model('Application', applicationSchema);

// models/Application.js
import mongoose from 'mongoose';

const applicationSchema = mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, default: 'Applied',  enum: ["Applied", "Under Review", "Accepted", "Rejected"], },
  },
  { timestamps: true }
);

const Application = mongoose.model('Application', applicationSchema);
export default Application;

