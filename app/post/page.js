"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function PostJob() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    jobType: "full-time",
    salary: "",
    salaryRange: "monthly",
    description: "",
    requirements: "",
    benefits: "",
    category: "technology"
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Job posted successfully!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Post a New Job</h1>
          <p className="text-foreground-light">Fill out the details below to post your job opening</p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Job Title */}
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-semibold text-foreground mb-2">
                Job Title *
              </label>
              <input
                id="jobTitle"
                type="text"
                name="jobTitle"
                placeholder="e.g., Senior Frontend Developer"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-foreground-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-foreground mb-2">
                Location *
              </label>
              <input
                id="location"
                type="text"
                name="location"
                placeholder="e.g., Maputo, Mozambique"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-foreground-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Job Type & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="jobType" className="block text-sm font-semibold text-foreground mb-2">
                  Job Type *
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-foreground mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="technology">Technology</option>
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                  <option value="operations">Operations</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="salary" className="block text-sm font-semibold text-foreground mb-2">
                  Salary (MZN) *
                </label>
                <input
                  id="salary"
                  type="number"
                  name="salary"
                  placeholder="e.g., 25000"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-foreground-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="salaryRange" className="block text-sm font-semibold text-foreground mb-2">
                  Salary Type
                </label>
                <select
                  id="salaryRange"
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="hourly">Hourly</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-2">
                Job Description *
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe the role, responsibilities, and what you're looking for..."
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-foreground-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              ></textarea>
            </div>

            {/* Requirements */}
            <div>
              <label htmlFor="requirements" className="block text-sm font-semibold text-foreground mb-2">
                Key Requirements
              </label>
              <textarea
                id="requirements"
                name="requirements"
                placeholder="List the main requirements (one per line)"
                value={formData.requirements}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-foreground-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              ></textarea>
            </div>

            {/* Benefits */}
            <div>
              <label htmlFor="benefits" className="block text-sm font-semibold text-foreground mb-2">
                Benefits & Perks
              </label>
              <textarea
                id="benefits"
                name="benefits"
                placeholder="List the benefits offered (one per line)"
                value={formData.benefits}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-foreground-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              ></textarea>
            </div>

            {/* Info Box */}
            <div className="p-4 bg-primary bg-opacity-5 border border-primary border-opacity-30 rounded-lg">
              <p className="text-sm text-foreground-light">
                💡 <span className="font-semibold">Tip:</span> A detailed and well-written job posting will attract more qualified candidates.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
              >
                {loading ? "Posting..." : "Post Job"}
              </button>
              <Link
                href="/jobs"
                className="flex-1 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-surface transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
