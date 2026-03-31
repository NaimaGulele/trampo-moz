# Contributing to TrampoMoz

Thank you for your interest in contributing to TrampoMoz! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Acknowledge contributions
- Report issues professionally

## Getting Started

### Prerequisites
- Node.js (LTS version)
- npm, yarn, pnpm, or bun
- Git
- Code editor (VS Code recommended)

### Setup Development Environment

1. Clone the repository:
```bash
git clone https://github.com/NaimaGulele/trampo-moz.git
cd trampo-moz
```

2. Install dependencies:
```bash
npm install
```

3. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

4. Start development server:
```bash
npm run dev
```

5. Open http://localhost:3000 in browser

## Development Guidelines

### Code Style

#### JavaScript/React
- Use ES6+ syntax
- Use functional components only
- Use React hooks for state management
- Write descriptive variable names
- Keep functions small and focused

#### Styling
- Use inline CSS with JSX
- Reference colors from `app/styles/theme.js`
- Follow spacing scale from `STYLE_GUIDE.md`
- Add hover/focus states for interactive elements
- Use consistent border radius values (4px, 6px, 8px)

#### Components
- Keep components in `app/components/`
- One component per file
- Accept `style` prop for customization
- Provide proper JSDoc comments
- Use descriptive prop names

### File Naming
- Components: `PascalCase.js` (e.g., `FormInput.js`)
- Pages: `kebab-case.js` (e.g., `job-details.js`)
- Utilities: `kebab-case.js` (e.g., `form-validation.js`)
- Hooks: `useHookName.js` (e.g., `useFormState.js`)

### Commit Messages

Write clear, descriptive commit messages:

```bash
# Good
git commit -m "Add FormInput component with validation"
git commit -m "Fix: Navbar styling on mobile devices"
git commit -m "Refactor: Extract validation logic to utils"

# Avoid
git commit -m "fix stuff"
git commit -m "update"
git commit -m "asdf"
```

### Commit Types
- **feat**: New feature
- **fix**: Bug fix
- **refactor**: Code refactoring without feature changes
- **style**: Styling changes
- **docs**: Documentation updates
- **test**: Test additions/updates
- **chore**: Maintenance tasks

## Making Changes

### Creating Features

1. **Plan your feature**
   - Discuss approach for large features
   - Check existing components for similar patterns
   - Plan component structure

2. **Implement the feature**
   - Follow code style guidelines
   - Use reusable components
   - Add proper error handling
   - Include user feedback (loading states, error messages)

3. **Test your changes**
   - Test in development server
   - Test on different screen sizes
   - Verify browser compatibility
   - Check for console errors

4. **Update documentation**
   - Update COMPONENTS.md for new components
   - Update STYLE_GUIDE.md if adding new styles
   - Update README.md if adding features

### Fixing Bugs

1. **Identify the issue**
   - Check console for errors
   - Review git history for related changes
   - Create minimal reproduction

2. **Implement fix**
   - Fix the root cause (not symptoms)
   - Add comments explaining complex fixes
   - Verify fix doesn't break other features

3. **Document the fix**
   - Reference the issue in commit message
   - Update documentation if needed
   - Add comments for future developers

## Pull Request Process

### Before Submitting

1. Update your branch with latest main:
```bash
git fetch origin
git rebase origin/main
```

2. Test thoroughly:
```bash
npm run dev
# Test all features manually
```

3. Run build check:
```bash
npm run build
```

4. Check for console errors/warnings

### Submitting PR

1. Push your branch:
```bash
git push origin feature/your-feature-name
```

2. Create pull request on GitHub with:
   - Clear title describing the change
   - Description of what and why
   - Reference to related issues (#123)
   - Screenshots if UI changes
   - Testing notes

### PR Title Format
```
[TYPE] Brief description

Examples:
[FEATURE] Add job save functionality
[FIX] Fix navbar layout on mobile
[DOCS] Update component documentation
```

### PR Description Template
```markdown
## Description
Brief explanation of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactoring

## Testing
How to test these changes:
1. Step 1
2. Step 2

## Screenshots (if applicable)
Before and after screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No console errors
- [ ] Tested in development
- [ ] Build successful
```

## Component Development

### Creating a New Component

1. Create file in `app/components/YourComponent.js`

2. Use this template:
```jsx
/**
 * Brief component description
 * @param {Object} props - Component props
 * @param {string} props.label - Label text
 * @param {function} props.onChange - Change handler
 * @param {Object} props.style - Additional styles
 * @returns {JSX.Element}
 */
export default function YourComponent({ label, onChange, style = {} }) {
  return (
    <div style={{
      // Your styles
      ...style
    }}>
      {/* Component content */}
    </div>
  );
}
```

3. Document in `COMPONENTS.md`

4. Use in pages and other components

### Component Checklist
- [ ] Functional component with hooks
- [ ] Accepts style prop for customization
- [ ] Has proper prop validation/documentation
- [ ] Includes hover/focus states if interactive
- [ ] Uses theme colors from theme.js
- [ ] Documented in COMPONENTS.md
- [ ] Example usage provided

## Testing

### Manual Testing
1. Test in development server
2. Test different screen sizes
3. Test on different browsers
4. Check for console errors
5. Test form validation
6. Test navigation

### Areas to Test
- Form input validation
- Error message display
- Loading states
- Navigation between pages
- Responsive design
- Keyboard navigation
- Button interactions

## Documentation

### When to Update Documentation

- Adding new components → Update COMPONENTS.md
- Changing styles → Update STYLE_GUIDE.md
- Adding features → Update README.md
- Changing project structure → Update PROJECT_CONFIG.md
- Adding utilities → Update relevant docs

### Documentation Quality
- Clear and concise
- Include code examples
- Use proper formatting
- Keep up-to-date
- Add table of contents for long docs

## Reporting Issues

### Issue Template

```markdown
## Description
Clear description of the issue

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable

## Environment
- OS: Windows 10
- Browser: Chrome 120
- Node version: 18.17
```

## Feature Requests

### Suggestion Template

```markdown
## Problem
Describe the problem being solved

## Proposed Solution
Describe your proposed solution

## Alternatives
Any alternative solutions

## Additional Context
Any other relevant information
```

## Best Practices

### Do's ✅
- ✅ Use reusable components
- ✅ Follow existing patterns
- ✅ Write clear comments for complex logic
- ✅ Test before submitting
- ✅ Keep commits focused
- ✅ Document your changes
- ✅ Review similar implementations
- ✅ Use proper error handling

### Don'ts ❌
- ❌ Don't hardcode colors (use theme.js)
- ❌ Don't create duplicate components
- ❌ Don't ignore console errors
- ❌ Don't submit untested code
- ❌ Don't use var (use const/let)
- ❌ Don't add external dependencies without discussion
- ❌ Don't make multiple unrelated changes
- ❌ Don't ignore code review feedback

## Common Tasks

### Adding a New Page

```javascript
// app/yourpage/page.js
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function YourPage() {
  return (
    <div style={{ fontFamily: "Arial", minHeight: "100vh", background: "#f5f7fb" }}>
      <Navbar />
      
      {/* Your content */}
      
      <Footer />
    </div>
  );
}
```

### Adding a New Component

```javascript
// app/components/YourComponent.js
export default function YourComponent({ label, value, onChange, style = {} }) {
  return (
    <div style={{ ...style }}>
      {/* Component content */}
    </div>
  );
}
```

### Using Theme Colors

```javascript
import { colors } from "../styles/theme";

// In styles
background: colors.primary,
color: colors.dark,
```

## Performance Considerations

- Keep components small and focused
- Avoid unnecessary re-renders
- Use React hooks efficiently
- Optimize images for web
- Minimize bundle size
- Lazy load non-critical components

## Accessibility

All contributions should:
- Have proper semantic HTML
- Include accessible color contrast
- Support keyboard navigation
- Include proper labels for form inputs
- Provide alt text for images
- Follow WCAG 2.1 AA guidelines

## Questions?

- Check existing documentation
- Review similar components
- Check git history
- Ask in pull request comments
- Open a discussion issue

## Recognition

Contributors will be recognized:
- In commit history
- In future releases
- In contributor list (if applicable)

---

Thank you for contributing to TrampoMoz! 🙏

Happy coding! 💻
