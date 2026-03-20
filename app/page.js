import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>TrampoMoz 🇲🇿</h1>
      <p>Find jobs in Mozambique</p>

      <br />
      <Link href="/jobs">➡️ Browse Jobs</Link>
      <br />
      <Link href="/post">➕ Post a Job</Link>
    </div>
  );
}