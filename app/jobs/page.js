import Link from "next/link";

export default function Jobs() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Jobs Available</h1>

      <div>
        <p>Promotora - Maputo - 3500 MZN</p>
        <Link href="/jobs/1">View Details</Link>
      </div>

      <br />

      <div>
        <p>Recepcionista - Matola - 5000 MZN</p>
        <Link href="/jobs/2">View Details</Link>
      </div>

      <br />
      <Link href="/">⬅️ Back Home</Link>
    </div>
  );
}