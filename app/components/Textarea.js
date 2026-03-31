import { forwardRef } from 'react';

const Textarea = forwardRef(({
  label,
  error,
  required = false,
  className = "",
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-foreground mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        className={`w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-foreground-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
          error ? 'border-error ring-error ring-2' : ''
        } ${className}`}
        {...props}
      ></textarea>
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
