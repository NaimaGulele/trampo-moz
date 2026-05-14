# TrampoMoz Components Documentation

## Overview

This document provides a comprehensive guide to all reusable components in the TrampoMoz application.

## Table of Contents

1. [FormInput](#forminput)
2. [Textarea](#textarea)
3. [Button](#button)
4. [ErrorMessage](#errormessage)
5. [Card](#card)
6. [Container](#container)
7. [Navbar](#navbar)
8. [Footer](#footer)

---

## FormInput

A reusable form input component with built-in validation styling and focus states.

### Props

- `label` (string) - Optional label above the input
- `type` (string) - Input type (text, email, number, password, etc.) - Default: "text"
- `placeholder` (string) - Placeholder text
- `value` (string) - Current input value
- `onChange` (function) - Change handler function
- `...props` - Any additional HTML input attributes

### Usage

```jsx
<FormInput
  label="Email"
  type="email"
  placeholder="your@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Features

- Focus state changes border to primary blue
- Label styling with proper spacing
- Responsive input width (100% width)
- Clean, minimal design

---

## Textarea

A reusable textarea component for multi-line text input.

### Props

- `label` (string) - Optional label above the textarea
- `placeholder` (string) - Placeholder text
- `value` (string) - Current textarea value
- `onChange` (function) - Change handler function
- `rows` (number) - Number of visible rows - Default: 5
- `...props` - Any additional HTML textarea attributes

### Usage

```jsx
<Textarea
  label="Job Description"
  placeholder="Describe the role..."
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={6}
/>
```

### Features

- Auto-resize capability
- Focus state styling
- Vertical resize allowed
- Proper label and spacing

---

## Button

A customizable button component with multiple variants and hover effects.

### Props

- `children` (ReactNode) - Button text or content
- `variant` (string) - Button style variant
  - `"primary"` - Blue background (Default)
  - `"secondary"` - Green background
  - `"outline"` - Transparent with blue border
- `disabled` (boolean) - Disable button - Default: false
- `onClick` (function) - Click handler function
- `...props` - Any additional button attributes

### Usage

```jsx
<Button variant="primary" onClick={handleSubmit}>
  Log In
</Button>

<Button variant="secondary" disabled={loading}>
  {loading ? "Posting..." : "Post Job"}
</Button>

<Button variant="outline">
  Cancel
</Button>
```

### Features

- Three pre-configured variants
- Disabled state styling
- Hover effects with color transitions
- Full-width layout
- Loading state support

### Variants

#### Primary
- Background: #0070f3
- Hover: #0051cc
- Text: white

#### Secondary
- Background: #10b981
- Hover: #059669
- Text: white

#### Outline
- Background: transparent
- Hover: #f0f0f0
- Border: 2px solid #0070f3
- Text: #0070f3

---

## ErrorMessage

A component for displaying error messages with icon.

### Props

- `message` (string) - Error message text

### Usage

```jsx
const [error, setError] = useState("");

<ErrorMessage message={error} />
```

### Features

- Only renders if message is provided
- Icon and styling included
- Alert-style appearance
- Light red background with red text

---

## Card

A container component for grouping content with shadow and border.

### Props

- `children` (ReactNode) - Card content
- `style` (object) - Additional inline styles to merge

### Usage

```jsx
<Card>
  <h2>Card Title</h2>
  <p>Card content here</p>
</Card>

<Card style={{ padding: "20px" }}>
  <Content />
</Card>
```

### Features

- White background
- Subtle shadow
- Border styling
- Hover effects on mouse enter/leave

---

## Container

A max-width wrapper component for consistent page spacing.

### Props

- `children` (ReactNode) - Container content
- `style` (object) - Additional inline styles to merge

### Usage

```jsx
<Container>
  <h1>Page Title</h1>
  <p>Page content</p>
</Container>

<Container style={{ textAlign: "center" }}>
  <Content />
</Container>
```

### Features

- Max-width: 1000px
- Centered horizontally
- Default padding: 40px 20px
- Responsive padding

---

## Navbar

Navigation component displayed at the top of every page.

### Props

None - Uses internal state for mobile menu

### Usage

```jsx
import Navbar from "../components/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <div>{/* Page content */}</div>
    </>
  );
}
```

### Features

- Sticky positioning
- Logo on left
- Navigation links
- Sign In and Log In buttons
- Hover effects on links
- Mobile responsive design
- Internal mobile menu state

---

## Footer

Footer component with links and contact information.

### Props

None - Uses static content from constants

### Usage

```jsx
import Footer from "../components/Footer";

export default function Page() {
  return (
    <>
      <div>{/* Page content */}</div>
      <Footer />
    </>
  );
}
```

### Features

- Dark background (#222222)
- Multiple link sections
- Contact information
- Copyright notice
- Responsive grid layout

---

## Theming

All components use colors defined in `app/styles/theme.js`. To customize colors, update the theme file:

```javascript
// app/styles/theme.js
export const colors = {
  primary: "#0070f3",
  secondary: "#10b981",
  // ... more colors
};
```

## Best Practices

1. **Always use FormInput** for text inputs instead of creating custom styled inputs
2. **Use Button component** for all buttons to maintain consistency
3. **Wrap error messages** with ErrorMessage component
4. **Use Container** for page-level content wrapping
5. **Use Card** for content sections that need visual separation
6. **Import components** at the top of your files
7. **Pass proper Props** to each component
8. **Use React hooks** (useState, useEffect) for state management

## Example Form

Here's a complete example using multiple components:

```jsx
"use client";

import { useState } from "react";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import Container from "../components/Container";
import Card from "../components/Card";

export default function ExampleForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    // Handle submission
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <Container>
      <Card>
        <h1>Login Form</h1>
        
        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="primary" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </Card>
    </Container>
  );
}
```

---

## Contributing

When adding new components:

1. Create component file in `app/components/`
2. Use functional components with React hooks
3. Accept style props for customization
4. Include PropTypes or JSDoc comments
5. Update this documentation
6. Use colors from theme.js

---

Last Updated: 2024
