import Link from "next/link";

export default function PostJob() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Post a Job</h1>

      <input placeholder="Job Title" />
      <br /><br />
      <input placeholder="Location" />
      <br /><br />
      <input placeholder="Salary (MZN)" />
      <br /><br />
      <textarea placeholder="Description"></textarea>
      <br /><br />
      <Link href="/">⬅️ Back Home</Link>
    </div>
  );
}