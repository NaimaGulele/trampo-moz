export default function Button({ 
  children, 
  variant = "primary", 
  disabled = false, 
  onClick,
  ...props 
}) {
  const variants = {
    primary: {
      background: "#0070f3",
      hoverBackground: "#0051cc",
      color: "white"
    },
    secondary: {
      background: "#10b981",
      hoverBackground: "#059669",
      color: "white"
    },
    outline: {
      background: "transparent",
      hoverBackground: "#f0f0f0",
      color: "#0070f3",
      border: "2px solid #0070f3"
    }
  };

  const style = variants[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "12px 20px",
        background: disabled ? "#ccc" : style.background,
        color: style.color,
        border: style.border || "none",
        borderRadius: "4px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        opacity: disabled ? 0.6 : 1
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.background = style.hoverBackground;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.background = style.background;
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}
