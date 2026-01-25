import React, { useState ,useEffect} from "react";
import axios from "../api/axios";
import { useNavigate ,useLocation} from "react-router-dom";

export default function CreateJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!jobId) return;
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const job = res.data;
        setTitle(job.title);
        setDescription(job.description);
        setBudget(job.budget);
        setSkillsInput(job.skills.join(", "));
      } catch (err) {
        setMessage("❌ Failed to load job for editing");
      }
    };
    fetchJob();
  }, [jobId, token]);

  const parseSkills = (input) =>
    input.split(",").map((s) => s.trim()).filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    
    const skills = parseSkills(skillsInput);

    try {
      if (jobId) {
        // ✏️ Update
        await axios.put(
          `http://localhost:5000/api/jobs/${jobId}`,
          { title, description, budget: Number(budget), skills },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("✅ Job updated successfully!");
      } else {
      await axios.post(
        "http://localhost:5000/api/jobs",
        { title, description, budget: Number(budget), skills },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Job posted successfully!");
    }
      setTimeout(() => navigate("/client-dashboard"), 1200);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to post job");
    }
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "30px 40px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#007bff" }}>{jobId ? "Edit Job" : "Post a New Job"}</h2>
      <p style={{ textAlign: "center", color: "#555" }}>
        Fill in the job details below and post it for freelancers.
      </p>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", padding:1 }}>Title</label>
          <input
            type="text"
            placeholder="e.g. React Frontend Developer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", padding:1 }}>
            Description
          </label>
          <textarea
            placeholder="Describe the project..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="5"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          ></textarea>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold" ,padding:1}}>Budget ($)</label>
          <input
            type="number"
            placeholder="e.g. 500"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold" ,padding:1}}>Skills</label>
          <input
            type="text"
            placeholder="e.g. React, Node, CSS"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 20px",
            fontWeight: "bold",
            width: "100%",
            cursor: "pointer",
          }}
        >
          {jobId ? "Update Job" : "Post Job"}
        </button>

        {message && (
          <p
            style={{
              marginTop: "15px",
              textAlign: "center",
              color: message.includes("successfully") ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
