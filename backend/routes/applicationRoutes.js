
import express from 'express';
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/apply", protect, async (req, res) => {
  try {
    const { jobId } = req.body;
    const freelancerId = req.user.id; // from JWT token
    if (!jobId || !freelancerId) {
      return res.status(400).json({ message: "Missing jobId or userId" });
    }
    // Check if already applied
    const existing = await Application.findOne({ job: jobId, freelancer: freelancerId });
    if (existing) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    const application = new Application({ job: jobId, freelancer: freelancerId });
    await application.save();

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get applications of logged-in freelancer
router.get("/my-applications", protect, async (req, res) => {
  try {
    const freelancerId = req.user.id;
    const applications = await Application.find({ freelancer: freelancerId })
      .populate({path:"job",
      populate:{path:"client",select:"name email"},
      }).populate("freelancer", "name email");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
});

router.get('/client',protect,async(req,res)=>{
    try{
        const clientJobs=await Job.find({client:req.user._id});
        const jobIds=clientJobs.map(job=>job._id);
        const applications=await Application.find({job:{$in:jobIds}})
          .populate('freelancer','name email')
          .populate('job','title description budget');
        res.status(200).json(applications);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:'Failed to fetch client applications'});
    }
})


export default router; // ✅ default export
