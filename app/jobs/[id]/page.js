import Link from "next/link";

export default function JobDetails({ params }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Job Details</h1>
      <p>Job ID: {params.id}</p>
      <p>Salary paid in MZN 💰</p>

      <br />
      <Link href="/jobs">⬅️ Back to Jobs</Link>
    </div>
  );
}