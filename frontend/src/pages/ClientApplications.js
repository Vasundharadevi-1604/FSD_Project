import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientApplications = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
 const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/applications/client', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(res.data);
      } catch (err) {
        setError('Failed to load applications');
      }
    };
    fetchApplications();
  }, []);
  

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ color: "#222" }}>Client Applications</h1>
      <p style={{ color: "#555" }}>
        View all freelancer applications for your job postings
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : applications.length === 0 ? (
        <p style={{ color: "#777", marginTop: "40px" }}>
          No applications found for your jobs
        </p>
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
          {applications.map((app) => (
            <div
              key={app._id}
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
              <h3 style={{ color: "#007bff", marginBottom: "6px" }}>
                {app.job?.title || "Untitled Job"}
              </h3>
              <p style={{ color: "#444", fontSize: "14px", minHeight: "40px" }}>
                {app.job?.description?.slice(0, 80) || "No description"}...
              </p>
              <p
                style={{
                  color: "#007bff",
                  fontWeight: "bold",
                  marginTop: "8px",
                }}
              >
                Budget: ${app.job?.budget || "N/A"}
              </p>
              <p style={{ color: "#666", fontSize: "13px" }}>
                Skills: {app.job?.skills?.join(", ") || "Not specified"}
              </p>
              <hr style={{ margin: "12px 0", borderColor: "#eee" }} />
              <p style={{ color: "#333", fontWeight: "bold", fontSize: "14px" }}>
                👤 Freelancer: {app.freelancer?.name || "Unknown"}
              </p>
              <p style={{ color: "#333", marginTop: "6px", fontSize: "14px" }}>
                📅 Applied on:{" "}
                {isNaN(new Date(app.createdAt))
                  ? "N/A"
                  : new Date(app.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
              </p>
              <p
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  color:
                    app.status === "Accepted"
                      ? "green"
                      : app.status === "Rejected"
                      ? "red"
                      : "#ff9800",
                }}
              >
                Status: {app.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientApplications;
