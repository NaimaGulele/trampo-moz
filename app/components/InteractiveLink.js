"use client";

export default function InteractiveLink({ 
  href, 
  children, 
  style,
  hoverBgColor,
  normalBgColor,
  onClick,
  className,
  ...props 
}) {
  const baseStyle = {
    ...style,
    transition: "all 0.2s ease",
    touchAction: "manipulation",
    WebkitTapHighlightColor: "transparent",
    ...style
  };

  const hoverStyle = hoverBgColor ? {
    [`&:hover`]: { backgroundColor: hoverBgColor },
    [`&:active`]: { backgroundColor: normalBgColor || hoverBgColor }
  } : {};

  return (
    <a 
      href={href}
      style={baseStyle}
      onClick={onClick}
      className={`interactive-link ${className || ''}`}
      {...props}
    >
      {children}
    </a>
  );
}
