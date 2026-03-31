export default function Textarea({ label, placeholder, value, onChange, rows = 5, ...props }) {
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
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        style={{
          display: "block",
          width: "100%",
          padding: "12px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          fontSize: "14px",
          boxSizing: "border-box",
          fontFamily: "Arial, sans-serif",
          resize: "vertical",
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
