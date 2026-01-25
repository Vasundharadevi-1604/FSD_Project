import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

function ClientDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

 
  useEffect(() => {
    if (!user || !user._id) return; // ✅ prevent null access

    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ Make sure job.client exists before comparing
        const clientJobs = res.data.filter(
          (job) => job.client && job.client._id === user._id
        );

        setJobs(clientJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user, token]); // ✅ safe dependency array

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
      alert("Job deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete job.");
    }
  };

  const handleEdit = (jobId) => {
    navigate(`/create-job?id=${jobId}`);
  };

  if (!user) {
    return <p style={{ textAlign: "center" }}>Loading user data...</p>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ color: "#007bff" }}>Freelance Job Finder</h1>
      <p style={{ color: "#555" }}>Find freelancers and manage your job posts</p>

      <div style={{ marginTop: "30px" }}>
        <Link
          to="/create-job"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 18px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          + Post a New Job
        </Link>
      </div>

      <h2 style={{ marginTop: "40px" }}>Your Job Listings</h2>

      {loading ? (
        <p>Loading your jobs...</p>
      ) : jobs.length === 0 ? (
        <p style={{ color: "#777" }}>You haven’t posted any jobs yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginTop: "20px",
            maxWidth: "1200px",
            margin: "20px auto",
          }}
        >
          {jobs.map((job) => (
            <div
              key={job._id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h3 style={{ color: "#333" }}>{job.title}</h3>
              <p style={{ color: "#666", fontSize: "14px" }}>
                {job.description}
              </p>
              <p style={{ fontWeight: "bold", color: "#007bff" }}>
                ${job.budget}
              </p>
              <p style={{ color: "#888", fontSize: "13px" }}>
                Skills: {job.skills.join(", ")}
              </p>
              <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleEdit(job._id)}
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClientDashboard;
