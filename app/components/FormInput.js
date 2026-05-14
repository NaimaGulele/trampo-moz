export default function FormInput({ label, type = "text", placeholder, value, onChange, required = false, id, ...props }) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div style={{ marginBottom: "20px" }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#222",
            fontSize: "14px"
          }}
        >
          {label}
          {required && <span style={{color: "#dc3545", marginLeft: "4px"}}>*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        aria-label={label}
        aria-required={required}
        style={{
          display: "block",
          width: "100%",
          padding: "12px",
          border: "2px solid #ddd",
          borderRadius: "4px",
          fontSize: "16px",
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
