import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function JobDetails({ params }) {
  // Mock job data - In production, this would come from a database
  const jobDetails = {
    id: params.id,
    title: "Promotora",
    company: "TechCorp Moçambique",
    location: "Maputo",
    salary: "3,500 MZN",
    type: "Full-time",
    postedDate: "2 days ago",
    description: "We are looking for an experienced Promotora to join our dynamic team in Maputo. You will be responsible for promoting our products and services in the local market.",
    requirements: [
      "2+ years of experience in sales or marketing",
      "Excellent communication skills in Portuguese",
      "Ability to work independently",
      "Valid driver's license",
      "Passion for customer service"
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Professional development opportunities",
      "Flexible work hours"
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link 
          href="/jobs"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-8 font-semibold"
        >
          ← Back to Jobs
        </Link>

        {/* Header */}
        <div className="mb-8 pb-8 border-b border-border">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{jobDetails.title}</h1>
              <p className="text-lg text-foreground-light">{jobDetails.company}</p>
            </div>
            <span className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg">
              {jobDetails.type}
            </span>
          </div>

          <div className="flex flex-wrap gap-6 text-foreground-light">
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>{jobDetails.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💰</span>
              <span className="text-lg font-semibold text-primary">{jobDetails.salary}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⏱️</span>
              <span>Posted {jobDetails.postedDate}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">About this job</h2>
              <p className="text-foreground-light leading-relaxed">
                {jobDetails.description}
              </p>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Requirements</h2>
              <ul className="space-y-3">
                {jobDetails.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-foreground-light">
                    <span className="text-primary font-bold mt-1">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Benefits */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Benefits</h2>
              <ul className="space-y-3">
                {jobDetails.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-foreground-light">
                    <span className="text-success font-bold mt-1">★</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 p-6 bg-surface border border-border rounded-lg">
              <button className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors mb-4">
                Apply Now
              </button>
              
              <button className="w-full px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-surface transition-colors">
                Save Job
              </button>

              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-3">Share</h3>
                <div className="flex gap-3">
                  <button className="w-10 h-10 rounded-lg bg-background border border-border hover:border-primary transition-colors flex items-center justify-center">
                    f
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-background border border-border hover:border-primary transition-colors flex items-center justify-center">
                    𝕏
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-background border border-border hover:border-primary transition-colors flex items-center justify-center">
                    in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
