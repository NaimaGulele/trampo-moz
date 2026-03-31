"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Jobs() {
  const [search, setSearch] = useState("");

  const jobs = [];

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "Arial" }}>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Available Jobs</h1>

        <input
          placeholder="Search job (e.g. promotora)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        {filteredJobs.map((job) => (
          <div key={job.id} style={{
            background: "#f5f5f5",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px"
          }}>
            <h3>{job.title}</h3>
            <p>{job.location}</p>
            <p><b>{job.salary}</b></p>

            <Link href={`/jobs/${job.id}`}>
              View Details
            </Link>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  );
}
