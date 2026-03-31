import Link from "next/link";
import Button from "./Button";
import Input from "./Input";

export default function AuthForm({
  title,
  subtitle,
  fields,
  onSubmit,
  submitLabel = "Submit",
  loading = false,
  footerText,
  footerLink,
  footerLinkText,
  dividerText = "Or"
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  };

  return (
    <div className="w-full max-w-md px-4">
      <div className="bg-surface border border-border rounded-lg p-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
        {subtitle && <p className="text-foreground-light mb-8">{subtitle}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map((field) => (
            <Input
              key={field.name}
              {...field}
            />
          ))}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? `${submitLabel}...` : submitLabel}
          </Button>
        </form>

        {(footerText || footerLink) && (
          <>
            <div className="my-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface text-foreground-light">{dividerText}</span>
              </div>
            </div>

            <p className="text-center text-foreground-light">
              {footerText}{" "}
              {footerLink && (
                <Link href={footerLink} className="text-primary font-semibold hover:text-primary-dark">
                  {footerLinkText}
                </Link>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
