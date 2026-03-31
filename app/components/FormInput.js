export default function FormInput({ label, type = "text", placeholder, value, onChange, ...props }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#222",
            fontSize: "14px"
          }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          display: "block",
          width: "100%",
          padding: "12px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          fontSize: "14px",
          boxSizing: "border-box",
          fontFamily: "Arial, sans-serif",
          transition: "border-color 0.2s ease",
          outline: "none"
        }}
        onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
        onBlur={(e) => (e.target.style.borderColor = "#ddd")}
        {...props}
      />
    </div>
  );
}
