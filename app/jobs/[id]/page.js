import Link from "next/link";

export default function JobDetails({ params }) {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif", backgroundColor: "#eef2f7", minHeight: "100vh" }}>
      <h1 style={{ color: "#0d6efd", marginBottom: "20px" }}>Job Details</h1>

      <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Job ID: {params.id}</p>
      <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>Salary paid in MZN 💰</p>

      <Link href="/jobs" style={{
        display: "inline-block",
        marginTop: "20px",
        backgroundColor: "#6c757d",
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
        textDecoration: "none"
      }}>⬅️ Back to Jobs</Link>
    </div>
  );
}
