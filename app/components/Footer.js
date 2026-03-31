import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#222222",
        color: "#fff",
        padding: "40px 20px",
        marginTop: "80px",
        borderTop: "1px solid #333"
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
          marginBottom: "40px"
        }}
      >
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "15px" }}>
            About
          </h3>
          <p style={{ color: "#ccc", fontSize: "14px", lineHeight: "1.6", margin: "0" }}>
            TrampoMoz connects job seekers with employers in Mozambique, providing opportunities for career growth.
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "15px" }}>
            Quick Links
          </h3>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li style={{ marginBottom: "10px" }}>
              <Link href="/jobs" style={{ color: "#0070f3", textDecoration: "none" }}>
                Browse Jobs
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link href="/post" style={{ color: "#0070f3", textDecoration: "none" }}>
                Post a Job
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link href="/signin" style={{ color: "#0070f3", textDecoration: "none" }}>
                Sign Up
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "15px" }}>
            Contact
          </h3>
          <p style={{ color: "#ccc", fontSize: "14px", margin: "0" }}>
            📧 support@trampomoz.com
          </p>
          <p style={{ color: "#ccc", fontSize: "14px", margin: "10px 0 0 0" }}>
            📱 +258 21 123 456
          </p>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #333",
          paddingTop: "20px",
          textAlign: "center",
          color: "#999",
          fontSize: "14px"
        }}
      >
        <p style={{ margin: "0" }}>
          © 2024 TrampoMoz. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
