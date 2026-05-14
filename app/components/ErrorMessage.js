export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div
      style={{
        padding: "12px 16px",
        marginBottom: "20px",
        background: "#fee",
        color: "#c33",
        borderRadius: "4px",
        fontSize: "14px",
        border: "1px solid #fcc",
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}
    >
      <span style={{ fontSize: "18px" }}>⚠️</span>
      <span>{message}</span>
    </div>
  );
}
