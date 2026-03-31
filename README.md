# TrampoMoz - Job Board Platform

A modern job board platform for connecting job seekers and employers in Mozambique.

## 🎯 Features

- **Browse Jobs**: Search and filter available job opportunities by title and location
- **Post Jobs**: Employers can quickly post new job openings with validation
- **User Authentication**: Sign up and login functionality with email and password validation
- **Job Details**: View complete job information with apply and save options
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional design with smooth interactions

## 🛠 Tech Stack

- **Framework**: Next.js (React)
- **Styling**: Inline CSS with modern design patterns
- **State Management**: React hooks (useState)

## 📁 Project Structure

```
app/
├── page.js                    # Home page with hero section
├── login/
│   └── page.js               # Login page with validation
├── signin/
│   └── page.js               # Sign up page with form validation
├── post/
│   └── page.js               # Post a job form
├── jobs/
│   ├── page.js               # Jobs listing with search
│   └── [id]/
│       └── page.js           # Individual job details
└── components/
    ├── Navbar.js             # Navigation bar with links
    ├── Logo.js               # Logo component
    ├── FormInput.js          # Reusable form input
    ├── Textarea.js           # Reusable textarea
    ├── Button.js             # Reusable button with variants
    ├── ErrorMessage.js       # Error message display
    ├── Container.js          # Layout container
    └── Card.js               # Card component
```

## 🎨 Components

### Reusable Components

- **FormInput**: Text, email, and number inputs with labels and focus states
- **Textarea**: Multi-line text input with auto-resize
- **Button**: Customizable buttons with variants (primary, secondary, outline)
- **ErrorMessage**: Error alert with icon
- **Card**: Container for content sections
- **Container**: Max-width wrapper for consistent spacing

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Color Scheme

- **Primary Blue**: #0070f3
- **Secondary Green**: #10b981
- **Light Background**: #f5f7fb
- **White**: #ffffff
- **Dark Text**: #222222
- **Gray Text**: #666666
- **Gray Border**: #ddd

## ✅ Features Implemented

- ✅ Home page with hero section and features grid
- ✅ User authentication (login/signup) with validation
- ✅ Job listing page with search functionality
- ✅ Job posting form with validation
- ✅ Job details page with save and apply options
- ✅ Responsive navbar with navigation
- ✅ Reusable UI components
- ✅ Error handling and user feedback
- ✅ Loading states on forms
- ✅ Hover effects and transitions

## 📝 Form Validations

### Login Form
- Email validation (must contain @)
- Password required
- Success feedback with alert

### Sign Up Form
- Full name required
- Email validation
- Password minimum 6 characters
- Password confirmation match
- Success feedback

### Job Posting Form
- Job title required
- Location required
- Salary validation (must be positive number)
- Description required
- Success feedback

## 🔮 Future Enhancements

- Database integration for persistent storage
- User profiles and saved jobs
- Job application tracking
- Email notifications
- Admin dashboard
- Advanced search filters (category, salary range, company)
- Company profiles
- Application management system

## 📌 Notes

- Forms currently use demo functionality with alerts
- Job listings are empty until connected to a database
- All components are ready to integrate with backend API
- Uses modern React patterns with hooks

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

---

Built with ❤️ using Next.js and React | TrampoMoz 2024
