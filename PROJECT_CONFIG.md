# TrampoMoz Project Configuration

## Project Overview

TrampoMoz is a modern job board platform built with Next.js and React, designed to connect job seekers and employers in Mozambique.

## Technology Stack

### Frontend
- **Framework**: Next.js (React)
- **JavaScript**: ES6+
- **Styling**: Inline CSS with custom design system
- **State Management**: React Hooks (useState)
- **Routing**: Next.js App Router

### Development
- **Package Manager**: npm (npm, yarn, pnpm, or bun supported)
- **Node Version**: Latest LTS recommended
- **Port**: 3000 (default)

## Project Structure

```
trampo-moz/
├── app/
│   ├── page.js                    # Home page
│   ├── login/
│   │   └── page.js               # Login page
│   ├── signin/
│   │   └── page.js               # Sign up page
│   ├── post/
│   │   └── page.js               # Post job page
│   ├── jobs/
│   │   ├── page.js               # Jobs listing
│   │   └── [id]/
│   │       └── page.js           # Job details
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Logo.js
│   │   ├── Footer.js
│   │   ├── FormInput.js
│   │   ├── Textarea.js
│   │   ├── Button.js
│   │   ├── ErrorMessage.js
│   │   ├── Card.js
│   │   └── Container.js
│   ├── styles/
│   │   └── theme.js              # Color and typography system
│   └── utils/
│       ├── validation.js         # Form validation functions
│       └── constants.js          # Application constants
├── public/                        # Static assets
├── README.md                      # Main documentation
├── COMPONENTS.md                  # Component documentation
├── STYLE_GUIDE.md                # Design system
├── PROJECT_CONFIG.md             # This file
├── package.json
├── next.config.js
├── .gitignore
└── .env.local (optional)
```

## Available Scripts

### Development
```bash
npm run dev
```
Starts the development server on http://localhost:3000

### Build
```bash
npm run build
```
Creates an optimized production build

### Production
```bash
npm start
```
Runs the production server

### Lint (if configured)
```bash
npm run lint
```
Runs ESLint to check code quality

## Environment Variables

Currently, the project does not require environment variables. In the future, you may need:

```
.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
DATABASE_URL=postgresql://...
```

## Color System Configuration

Colors are defined in `app/styles/theme.js`:

```javascript
export const colors = {
  primary: "#0070f3",
  secondary: "#10b981",
  // ... more colors
};
```

To modify colors:
1. Update `app/styles/theme.js`
2. Restart dev server
3. Changes apply to all components using theme colors

## Component System

All reusable components are in `app/components/`:

- **FormInput**: For all text, email, and number inputs
- **Textarea**: For multi-line text
- **Button**: For all buttons (with variants: primary, secondary, outline)
- **ErrorMessage**: For error displays
- **Card**: For content containers
- **Container**: For page content wrapping
- **Navbar**: Main navigation
- **Footer**: Footer with links and info

See `COMPONENTS.md` for detailed documentation.

## Design System

All styling follows the design system defined in `STYLE_GUIDE.md`:

- **Colors**: Carefully chosen palette with primary, secondary, and neutral colors
- **Typography**: Consistent font sizes and weights
- **Spacing**: Standardized spacing scale (4px, 8px, 12px, 16px, 20px, etc.)
- **Border Radius**: 4px (inputs), 6px (buttons), 8px (cards)
- **Shadows**: Subtle shadows for depth

## Validation

Form validation utilities are in `app/utils/validation.js`:

- `validateEmail(email)`
- `validatePassword(password, minLength)`
- `validatePasswordMatch(password, confirmPassword)`
- `validateSalary(salary)`
- `validateLoginForm(email, password)`
- `validateSignUpForm(name, email, password, confirmPassword)`
- `validateJobPostForm(title, location, salary, description)`

## Constants

Application constants are in `app/utils/constants.js`:

- `SITE_NAME`: "TrampoMoz"
- `NAVIGATION_LINKS`: Navigation menu items
- `JOB_TYPES`: Array of job types
- `SALARY_RANGES`: Salary range options
- `LOCATIONS`: List of cities
- `ERROR_MESSAGES`: Predefined error messages
- `SUCCESS_MESSAGES`: Predefined success messages
- `API_ENDPOINTS`: API endpoint paths (for future API integration)

## Features Status

### ✅ Implemented
- Home page with hero section
- Navigation bar with links
- Login page with validation
- Sign up page with validation
- Job posting form with validation
- Job listing page with search
- Job details page
- Footer with links
- Reusable component system
- Form validation utilities
- Color and typography system

### 🔄 In Progress
- None currently

### 📋 Planned
- Database integration (Supabase, Neon, or custom)
- User authentication backend
- Job storage and retrieval
- Job applications system
- User profiles
- Saved jobs functionality
- Admin dashboard
- Email notifications
- Advanced search filters

## Development Workflow

### Adding a New Page

1. Create file in appropriate directory under `app/`
2. Use reusable components (FormInput, Button, etc.)
3. Import Navbar and Footer
4. Follow the design system from STYLE_GUIDE.md
5. Use colors from theme.js

### Adding a New Component

1. Create `.js` file in `app/components/`
2. Use functional component with React hooks
3. Accept style props for customization
4. Export as default export
5. Update COMPONENTS.md with documentation

### Updating Styles

1. Never use hardcoded colors - use theme.js
2. Follow spacing scale from STYLE_GUIDE.md
3. Use standardized border radius values
4. Maintain consistency with existing patterns

## Performance Considerations

### Current Optimizations
- Inline CSS (no additional CSS parsing)
- Minimal dependencies
- React functional components with hooks
- Next.js built-in optimization

### Future Optimizations
- Image optimization with next/image
- Font optimization with next/font
- Code splitting
- Lazy loading components
- Database query caching

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest versions

## Accessibility

All components follow WCAG 2.1 AA guidelines:

- Proper semantic HTML
- Accessible color contrast ratios
- Keyboard navigation support
- ARIA labels where appropriate
- Form labels properly associated with inputs

## Security Considerations

### Current
- Client-side form validation
- No sensitive data in client code

### Future Implementation
- Server-side validation (critical)
- HTTPS only
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting
- Input sanitization

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Traditional Hosting
1. Run `npm run build`
2. Upload `.next` and `node_modules` to server
3. Set `NODE_ENV=production`
4. Run `npm start`

## Troubleshooting

### Port already in use
```bash
lsof -i :3000  # Find process
kill -9 <PID>  # Kill process
npm run dev    # Restart server
```

### Build errors
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Component not rendering
1. Check import paths
2. Verify component exports default
3. Check for syntax errors
4. Ensure props are passed correctly

## Code Style Guidelines

### JavaScript
- Use ES6+ syntax
- Use const/let (no var)
- Use arrow functions
- Use template literals for strings

### React
- Functional components only
- Use hooks for state (useState, useEffect)
- Props drilling acceptable for small projects
- Destructure props when possible

### Styling
- Use inline styles with JSX
- Follow theme.js for colors
- Use spacing scale from STYLE_GUIDE.md
- Add hover effects for interactive elements
- Use transitions (0.2s ease) for smooth interactions

## Future Integration Checklist

### Backend API
- [ ] Setup Express/Node server
- [ ] Create database schema
- [ ] Implement authentication endpoints
- [ ] Create job CRUD endpoints
- [ ] Add application tracking

### Database
- [ ] Choose provider (Supabase, Neon, AWS)
- [ ] Design schema
- [ ] Setup migrations
- [ ] Configure backups

### Authentication
- [ ] Implement JWT or session-based auth
- [ ] Add refresh token logic
- [ ] Setup password hashing (bcrypt)
- [ ] Add email verification

## Contact & Support

For issues or questions:
1. Check documentation files
2. Review existing components
3. Check console for error messages
4. Review git commit history for similar changes

## License

This project is property of TrampoMoz.

---

Last Updated: 2024
Version: 1.0
