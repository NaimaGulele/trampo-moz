import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          <div className="flex gap-2 items-center">
            <Link 
              href="/" 
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>

            <Link 
              href="/signin" 
              className="px-3 py-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Sign Up
            </Link>

            <Link 
              href="/login" 
              className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
