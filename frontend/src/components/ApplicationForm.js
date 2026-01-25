import React, { useState } from "react";
import axios from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ApplicationForm() {
  const { jobId } = useParams();
  const [proposal, setProposal] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post("/applications", { jobId, proposal });
      setMessage("Application submitted");
      setTimeout(()=> navigate("/my-applications"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto" }}>
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit}>
        <textarea placeholder="Write your proposal" value={proposal} onChange={e=>setProposal(e.target.value)} required/>
        <br />
        <button type="submit">Submit Application</button>
      </form>
      {message && <p style={{ color: message.toLowerCase().includes("submitted") ? "green":"red" }}>{message}</p>}
    </div>
  );
}
