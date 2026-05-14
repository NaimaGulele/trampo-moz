// Application constants

export const SITE_NAME = "TrampoMoz";
export const SITE_DESCRIPTION = "Job board platform for connecting job seekers and employers in Mozambique";

export const NAVIGATION_LINKS = [
  { label: "Home", href: "/" },
  { label: "Jobs", href: "/jobs" },
  { label: "Sign Up", href: "/signin" },
  { label: "Log In", href: "/login" },
];

export const JOB_TYPES = [
  { id: 1, label: "Full-time", value: "full-time" },
  { id: 2, label: "Part-time", value: "part-time" },
  { id: 3, label: "Contract", value: "contract" },
  { id: 4, label: "Freelance", value: "freelance" },
];

export const SALARY_RANGES = [
  { id: 1, label: "0 - 5,000 MZN", min: 0, max: 5000 },
  { id: 2, label: "5,000 - 15,000 MZN", min: 5000, max: 15000 },
  { id: 3, label: "15,000 - 30,000 MZN", min: 15000, max: 30000 },
  { id: 4, label: "30,000 - 50,000 MZN", min: 30000, max: 50000 },
  { id: 5, label: "50,000+ MZN", min: 50000, max: Infinity },
];

export const LOCATIONS = [
  "Maputo",
  "Matola",
  "Beira",
  "Nampula",
  "Chimoio",
  "Inhambane",
  "Gaza",
  "Sofala",
  "Tete",
  "Zambézia",
];

export const FEATURES = [
  {
    icon: "🔍",
    title: "Easy to Search",
    description: "Find jobs by title, location, or company with our powerful search and filter options."
  },
  {
    icon: "📱",
    title: "Post Instantly",
    description: "Share your job opening in minutes and connect with qualified candidates in your area."
  },
  {
    icon: "🤝",
    title: "Connect Directly",
    description: "Build meaningful relationships with employers and candidates in Mozambique."
  },
];

export const FOOTER_LINKS = {
  quickLinks: [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Post a Job", href: "/post" },
    { label: "Sign Up", href: "/signin" },
  ],
  contact: {
    email: "support@trampomoz.com",
    phone: "+258 21 123 456",
  },
};

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email",
  PASSWORD_TOO_SHORT: "Password must be at least 6 characters",
  PASSWORDS_NOT_MATCH: "Passwords do not match",
  INVALID_SALARY: "Please enter a valid salary",
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful!",
  SIGNUP_SUCCESS: "Account created successfully!",
  JOB_POSTED: "Job posted successfully!",
};

export const API_ENDPOINTS = {
  JOBS: "/api/jobs",
  LOGIN: "/api/auth/login",
  SIGNUP: "/api/auth/signup",
  APPLY: "/api/jobs/apply",
};
