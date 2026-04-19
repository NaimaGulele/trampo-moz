"use client";
import { useState } from "react";

// Sample job data
const initialJobs = [
  { id: 1, title: "Frontend Developer", company: "TechMaputo", location: "Maputo", type: "Full-time" },
  { id: 2, title: "Marketing Manager", company: "Matola Industries", location: "Matola", type: "Full-time" },
  { id: 3, title: "Accountant", company: "Beira Finance", location: "Beira", type: "Part-time" },
  { id: 4, title: "Sales Representative", company: "Nampula Trading", location: "Nampula", type: "Full-time" },
  { id: 5, title: "UI/UX Designer", company: "CreativeMZ", location: "Maputo", type: "Remote" },
];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobs] = useState(initialJobs);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === "" || job.location === locationFilter;
    return matchesSearch && matchesLocation;
  });

  const locations = ["", "Maputo", "Matola", "Beira", "Nampula"];

  return (
    <div className="jobs-container">
      <h1>Find Jobs</h1>

      {/* Search and Filter Section */}
      <div className="search-section">
        <input
          type="text"
          placeholder="🔍 Search by job title or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Locations</option>
          {locations.filter(l => l !== "").map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Job Listings */}
      <div className="jobs-list">
        {filteredJobs.length === 0 ? (
          <p className="no-jobs">No jobs found. Try a different search.</p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p className="company">{job.company}</p>
              <div className="job-meta">
                <span className="location">📍 {job.location}</span>
                <span className="job-type">{job.type}</span>
              </div>
              <button className="apply-btn" onClick={() => alert("Please login to apply")}>
                Apply Now →
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}