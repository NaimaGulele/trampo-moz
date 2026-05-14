export default function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        border: "1px solid #eee",
        transition: "all 0.2s ease",
        ...style
      }}
    >
      {children}
    </div>
  );
}
