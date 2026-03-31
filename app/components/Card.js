export default function Card({
  children,
  className = "",
  variant = "default",
  ...props
}) {
  const variants = {
    default: "bg-surface border border-border",
    elevated: "bg-surface border border-border shadow-lg hover:shadow-xl transition-shadow"
  };

  return (
    <div
      className={`rounded-lg p-6 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
