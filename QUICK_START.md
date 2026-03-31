# TrampoMoz - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Your Browser
Navigate to: **http://localhost:3000**

---

## 📖 What You See

### Home Page
- Hero section with call-to-action buttons
- Feature cards (Easy Search, Post Instantly, Connect Directly)
- Navigation to jobs and posting
- Professional footer with links

### Navigation
- **Home** - Main page
- **Jobs** - Browse available jobs (currently empty, ready for database)
- **Sign Up** - Create new account
- **Log In** - Login to existing account

### Available Features
- ✅ View home page with features
- ✅ Sign up with validation
- ✅ Login with validation
- ✅ Post a job with validation
- ✅ View job details page
- ✅ Search jobs (UI ready, needs API)

---

## 🎯 Test the Features

### Test Sign-Up
1. Click "Sign Up" in navbar
2. Fill in: Name, Email, Password, Confirm Password
3. See validation errors if you:
   - Leave fields empty
   - Use invalid email
   - Use password < 6 characters
   - Passwords don't match
4. Click "Sign Up" to see success message

### Test Login
1. Click "Log In" in navbar
2. Fill in: Email, Password
3. Click "Log In" to see success message
4. Notice error states and loading feedback

### Test Job Posting
1. Click "Post a Job" button
2. Fill in: Job Title, Location, Salary, Description
3. See validation if:
   - Fields are empty
   - Salary isn't a positive number
4. Click "Post Job" to submit

### Test Job Listing
1. Click "Browse Jobs" button
2. Try searching by job title or location
3. Notice the search filters results in real-time

### Test Job Details
1. Click "Browse Jobs"
2. Click on any job card to view details
3. Click "Save Job" to test save functionality
4. Click "Apply Now" button

---

## 📁 Key Files to Know

### Pages (What users see)
```
app/
├── page.js                 # Home page
├── login/page.js          # Login page
├── signin/page.js         # Sign-up page
├── post/page.js           # Post job page
├── jobs/page.js           # Browse jobs page
└── jobs/[id]/page.js      # Job details page
```

### Components (Reusable parts)
```
app/components/
├── Navbar.js              # Top navigation
├── Footer.js              # Bottom footer
├── FormInput.js           # Text input component
├── Textarea.js            # Multi-line input
├── Button.js              # All buttons
├── ErrorMessage.js        # Error displays
├── Card.js                # Content container
├── Container.js           # Page wrapper
└── Logo.js                # Site logo
```

### Utilities (Helper functions)
```
app/
├── styles/theme.js        # Colors and design system
├── utils/validation.js    # Form validation
└── utils/constants.js     # App constants
```

### Documentation
```
README.md                   # Project overview
COMPONENTS.md              # Component guide
STYLE_GUIDE.md             # Design system
PROJECT_CONFIG.md          # Configuration
CONTRIBUTING.md            # How to contribute
IMPROVEMENTS.md            # What was improved
ROADMAP.md                 # Future plans
QUICK_START.md             # This file
```

---

## 🎨 Design System Quick Reference

### Colors
- **Primary Blue**: #0070f3 (buttons, links)
- **Secondary Green**: #10b981 (job posting)
- **Light Background**: #f5f7fb (page background)
- **White**: #ffffff (cards, content)
- **Dark Text**: #222222 (headings)
- **Gray Text**: #666666 (body text)

### Using Colors
```javascript
// In your styles
background: "#0070f3",    // Primary blue
color: "#666666",         // Gray text
border: "1px solid #ddd"  // Light border
```

### Spacing
- xs: 4px
- sm: 8px  
- md: 12px
- lg: 16px
- xl: 20px
- 2xl: 24px
- 3xl: 30px
- 4xl: 40px

---

## 🧩 Using Reusable Components

### FormInput
```jsx
import FormInput from "../components/FormInput";

<FormInput
  label="Email"
  type="email"
  placeholder="your@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Button
```jsx
import Button from "../components/Button";

<Button variant="primary" onClick={handleSubmit}>
  Log In
</Button>

<Button variant="secondary">Post Job</Button>
<Button variant="outline">Cancel</Button>
```

### ErrorMessage
```jsx
import ErrorMessage from "../components/ErrorMessage";

<ErrorMessage message={error} />
```

### Card & Container
```jsx
import Card from "../components/Card";
import Container from "../components/Container";

<Container>
  <Card>
    <h1>Content</h1>
  </Card>
</Container>
```

---

## 🔍 Inspect the Code

### View Component Structure
1. Open browser Developer Tools (F12)
2. Inspect an input field - notice it uses FormInput component
3. Inspect a button - uses Button component
4. Inspect errors - uses ErrorMessage component

### Check Source Code
1. Open your code editor
2. Look at `app/page.js` for home page
3. Look at `app/components/FormInput.js` to see component code
4. Look at `app/styles/theme.js` to see color system

---

## ⚙️ Make Changes

### Change Colors
1. Edit `app/styles/theme.js`
2. Update color values
3. Save file
4. Page will refresh automatically (HMR)

### Add New Component
1. Create file: `app/components/MyComponent.js`
2. Write component code
3. Export as default
4. Import and use in pages
5. Document in COMPONENTS.md

### Add New Page
1. Create folder: `app/mypage/`
2. Create file: `app/mypage/page.js`
3. Import Navbar and Footer
4. Build page content
5. Navigation updates automatically

---

## 🧪 Next Steps

### Short-term
1. Understand current structure
2. Review component documentation
3. Understand design system
4. Get familiar with validation system

### Medium-term
1. Start backend API development
2. Set up database
3. Implement authentication
4. Connect frontend to backend

### Long-term
1. Add more features
2. Optimize performance
3. Deploy to production
4. Monitor and improve

---

## 📚 Documentation Guide

### Start Here
1. **README.md** - Overview of project
2. **QUICK_START.md** - This file (you're reading it!)
3. **COMPONENTS.md** - How to use components

### Deep Dive
4. **STYLE_GUIDE.md** - Design system details
5. **PROJECT_CONFIG.md** - Project setup details
6. **CONTRIBUTING.md** - How to contribute code

### Planning
7. **IMPROVEMENTS.md** - What was improved
8. **ROADMAP.md** - Future development plans

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

### Dependencies Not Installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### Changes Not Showing
1. Save the file
2. Check if HMR shows updates in terminal
3. Refresh browser manually
4. Check console for errors

### Build Errors
```bash
npm run build
# Check error message
# Fix issue
npm run build
```

---

## 💡 Pro Tips

### Use the Theme System
```javascript
// Don't hardcode colors
// ❌ Bad
background: "#0070f3"

// ✅ Good  
background: colors.primary
// (import from theme.js)
```

### Use Reusable Components
```javascript
// Don't create custom inputs
// ❌ Bad
<input style={{ padding: "10px" }} />

// ✅ Good
<FormInput label="Name" value={name} onChange={setName} />
```

### Follow Spacing Scale
```javascript
// Use standardized spacing
// ❌ Bad
padding: "15px"

// ✅ Good
padding: "16px"  // Use standard value
```

### Test Forms Locally
1. Fill in correct data - should show success
2. Leave fields empty - should show error
3. Use invalid data - should show specific error
4. Check loading state works

---

## 🚀 Deploy to Vercel

### One-Click Deploy
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Manual Deploy
```bash
npm install -g vercel
vercel
```

---

## 📞 Need Help?

1. Check documentation files
2. Review component examples
3. Look at similar implementations
4. Check browser console for errors
5. Review git history for changes

---

## ✨ What's Ready for Backend

When you build the backend, connect these:

### Authentication
- `/login/page.js` - Connect login form to API
- `/signin/page.js` - Connect signup form to API
- Store JWT token from API

### Jobs
- `/jobs/page.js` - Fetch jobs from API
- `/jobs/[id]/page.js` - Fetch job details
- `/post/page.js` - Post job to API

### Features Already Built
- ✅ Form validation (reusable)
- ✅ Error handling (reusable)
- ✅ Loading states (ready to use)
- ✅ Search UI (ready to wire up)
- ✅ Navigation structure (ready to use)

---

## 🎉 You're Ready!

The frontend is complete and production-ready. You can now:

1. **Explore** the application
2. **Test** all features
3. **Review** the code
4. **Understand** the structure
5. **Begin** backend development

Happy coding! 💻

---

**Questions?** Check the documentation files!
**Ready to develop?** Start with CONTRIBUTING.md
**Ready for backend?** Review ROADMAP.md
