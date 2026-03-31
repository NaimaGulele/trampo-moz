export default function Badge({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary: "bg-primary text-white",
    success: "bg-success text-white",
    warning: "bg-warning text-white",
    error: "bg-error text-white",
    neutral: "bg-surface border border-border text-foreground"
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
