"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import Container from "../components/Container";
import Input from "../components/Input";

export default function Jobs() {
  const [search, setSearch] = useState("");

  const jobs = [
    {
      id: 1,
      title: "Promotora",
      location: "Maputo",
      salary: "3,500 MZN",
      company: "TechCorp Moçambique",
      type: "Full-time"
    },
    {
      id: 2,
      title: "Recepcionista",
      location: "Matola",
      salary: "5,000 MZN",
      company: "Hotel Complexo",
      type: "Full-time"
    },
    {
      id: 3,
      title: "Desenvolvedor Web",
      location: "Maputo",
      salary: "8,000 MZN",
      company: "StartUp Digital",
      type: "Full-time"
    },
    {
      id: 4,
      title: "Designer Gráfico",
      location: "Beira",
      salary: "6,500 MZN",
      company: "Creative Agency",
      type: "Part-time"
    }
  ];

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <Container className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Available Jobs</h1>
          <p className="text-foreground-light">Find the perfect opportunity for your career</p>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <Input
            placeholder="Search by job title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-foreground-light text-lg">No jobs found matching your search.</p>
            <button
              onClick={() => setSearch("")}
              className="mt-4 text-primary font-semibold hover:text-primary-dark"
            >
              Clear search
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}
  ];

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Available Jobs</h1>
          <p className="text-foreground-light">Find the perfect opportunity for your career</p>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <input
            placeholder="Search by job title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-foreground-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Link 
              key={job.id}
              href={`/jobs/${job.id}`}
              className="block p-6 bg-surface border border-border rounded-lg hover:shadow-lg hover:border-primary transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm text-foreground-light mt-1">{job.company}</p>
                </div>
                <span className="px-3 py-1 text-xs font-semibold bg-primary text-white rounded-full">
                  {job.type}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-foreground-light flex items-center gap-2">
                  📍 {job.location}
                </p>
                <p className="text-lg font-semibold text-primary">
                  {job.salary}
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <span className="text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform inline-block">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground-light text-lg">No jobs found matching your search.</p>
            <Link 
              href="/jobs"
              className="mt-4 inline-block text-primary font-semibold hover:text-primary-dark"
            >
              Clear search
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
