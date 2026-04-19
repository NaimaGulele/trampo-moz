"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostJobPage() {
  const router = useRouter();
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, save to database
    alert("Job posted successfully!");
    router.push("/jobs");
  };

  return (
    <div className="post-job-container">
      <h1>Post a Job</h1>
      <p>Reach qualified candidates in Mozambique</p>

      <form onSubmit={handleSubmit} className="post-job-form">
        <input
          type="text"
          placeholder="Job Title"
          value={jobData.title}
          onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Company Name"
          value={jobData.company}
          onChange={(e) => setJobData({ ...jobData, company: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location (e.g., Maputo, Matola)"
          value={jobData.location}
          onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
          required
        />
        <select
          value={jobData.type}
          onChange={(e) => setJobData({ ...jobData, type: e.target.value })}
        >
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Remote</option>
          <option>Contract</option>
        </select>
        <textarea
          placeholder="Job Description"
          rows="5"
          value={jobData.description}
          onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
          required
        />
        <button type="submit" className="btn-primary">📢 Post Job</button>
      </form>
    </div>
  );
}