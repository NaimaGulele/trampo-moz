import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" style={{ textDecoration: "none", cursor: "pointer" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        transition: "opacity 0.2s ease"
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
      onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
      >
        <div style={{
          width: "40px",
          height: "40px",
          background: "#0070f3",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px"
        }}>
          TM
        </div>

        <h2 style={{
          margin: 0,
          color: "#0070f3",
          fontSize: "20px",
          fontWeight: "bold"
        }}>
          TrampoMoz
        </h2>
      </div>
    </Link>
  );
}
