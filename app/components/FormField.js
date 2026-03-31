export default function FormField({
  label,
  error,
  required = false,
  children,
  className = ""
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-foreground mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  );
}
