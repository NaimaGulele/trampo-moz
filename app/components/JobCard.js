import Link from "next/link";
import Badge from "./Badge";

export default function JobCard({ job }) {
  return (
    <Link 
      href={`/jobs/${job.id}`}
      className="block p-6 bg-surface border border-border rounded-lg hover:shadow-lg hover:border-primary transition-all group"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {job.title}
          </h3>
          <p className="text-sm text-foreground-light mt-1">{job.company}</p>
        </div>
        <Badge variant="primary">
          {job.type}
        </Badge>
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
  );
}
