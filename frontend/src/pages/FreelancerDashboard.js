import React, { useEffect, useState } from "react";
import axios from "../api/axios";

function FreelancerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (query = "") => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`http://localhost:5000/api/jobs${query}`);
      setJobs(response.data);
    } catch (err) {
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim() === "") {
      fetchJobs(); // fetch all
    } else {
      fetchJobs(`?title=${value}`);
    }
  };
  
  const handleApply = async (jobId) => {
  try {
    const token = localStorage.getItem("token"); // assuming JWT stored here
    const user = JSON.parse(localStorage.getItem("user")); // assuming user stored here

    if (!token || !user) {
      alert("Please login first!");
      return;
    }

    const response = await axios.post(
      "http://localhost:5000/api/applications/apply",
      { jobId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.message);
  } catch (error) {
    alert(error.response?.data?.message || "Failed to apply for job");
  }
};

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ color: "#222" }}>Freelance Job Finder</h1>
      <p style={{ color: "#555" }}>Find freelance jobs and connect with clients</p>

      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={handleSearch}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          width: "280px",
          marginTop: "20px",
        }}
      />

      {loading ? (
        <p>Loading jobs...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : jobs.length === 0 ? (
        <p style={{ color: "#777", marginTop: "40px" }}>No jobs found</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            justifyContent: "center",
            marginTop: "40px",
            padding: "0 40px",
          }}
        >
          {jobs.map((job) => (
            <div
              key={job._id}
              style={{
                border: "1px solid #eee",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                padding: "20px",
                textAlign: "left",
                backgroundColor: "#fff",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <h3 style={{ color: "#007bff", marginBottom: "6px" }}>{job.title}</h3>
              <p style={{ color: "#444", fontSize: "14px", minHeight: "40px" }}>
                {job.description.slice(0, 80)}...
              </p>
              <p style={{ color: "#007bff", fontWeight: "bold", marginTop: "8px" }}>
                Budget: ${job.budget}
              </p>
              <p style={{ color: "#666", fontSize: "13px" }}>
                Skills: {job.skills.join(", ")}
              </p>
              <hr style={{ margin: "12px 0", borderColor: "#eee" }} />
              <p style={{ color: "#333", fontWeight: "bold", fontSize: "14px" }}>
                👤 Client: {job.client?.name || "Unknown"}
              </p>
              <button
              onClick={() => handleApply(job._id)}
                style={{
                  marginTop: "12px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  width: "100%",
                  fontWeight: "bold",
                }}
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FreelancerDashboard;
