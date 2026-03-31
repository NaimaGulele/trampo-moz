"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import FormInput from "../components/FormInput";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";

export default function PostJob() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!title || !location || !salary || !description) {
      setError("Please fill in all fields");
      return;
    }

    if (isNaN(salary) || salary <= 0) {
      setError("Please enter a valid salary");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Job posted successfully!");
      setTitle("");
      setLocation("");
      setSalary("");
      setDescription("");
    }, 1000);
  };

  return (
    <div style={{ fontFamily: "Arial", minHeight: "100vh", background: "#f5f7fb" }}>
      <Navbar />

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 80px)",
        padding: "20px"
      }}>
        <div style={{
          background: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "500px"
        }}>
          <h1 style={{ fontSize: "28px", marginBottom: "10px", color: "#222" }}>
            Post a New Job
          </h1>
          <p style={{ color: "#555", marginBottom: "30px" }}>
            Share your job opening with our community
          </p>

          <ErrorMessage message={error} />

          <form onSubmit={handleSubmit}>
            <FormInput
              label="Job Title"
              type="text"
              placeholder="e.g., Senior Developer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <FormInput
              label="Location"
              type="text"
              placeholder="e.g., Maputo, Mozambique"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <FormInput
              label="Salary (MZN)"
              type="number"
              placeholder="e.g., 25000"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />

            <Textarea
              label="Job Description"
              placeholder="Describe the role, responsibilities, and requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
            />

            <div style={{ marginBottom: "20px" }}>
              <Button
                variant="secondary"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Posting..." : "Post Job"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
