import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" aria-label="Trampo Moz home" className="flex items-center gap-3">
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="false">
        <title>Trampo Moz logo</title>
        <rect width="64" height="64" rx="12" fill="url(#g)" />
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0b6efd" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        <text x="32" y="38" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="20" fill="#fff">TM</text>
      </svg>

      <span className="font-bold text-lg text-[var(--primary)]">Trampo Moz</span>
    </Link>
  );
}