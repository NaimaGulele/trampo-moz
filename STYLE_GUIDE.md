# TrampoMoz Style Guide

## Color Palette

### Primary Colors
- **Primary Blue**: `#0070f3` - Main brand color, used for CTAs and primary actions
- **Primary Blue Hover**: `#0051cc` - Darker shade for hover states
- **Secondary Green**: `#10b981` - Secondary action color (job posting)
- **Secondary Green Hover**: `#059669` - Darker shade for hover states

### Neutral Colors
- **White**: `#ffffff` - Background, cards, text containers
- **Light Background**: `#f5f7fb` - Page background
- **Dark Text**: `#222222` - Primary text color
- **Text**: `#333333` - Secondary text
- **Text Secondary**: `#666666` - Tertiary text
- **Text Muted**: `#999999` - Disabled or subtle text
- **Border**: `#ddd` - Standard borders
- **Border Light**: `#eee` - Subtle borders
- **Footer Background**: `#222222` - Dark footer

### Status Colors
- **Error**: `#c33` - Error text
- **Error Background**: `#fee` - Error alert background
- **Error Border**: `#fcc` - Error alert border
- **Success**: `#10b981` - Success states
- **Info**: `#0070f3` - Info messages
- **Info Background**: `#f0f7ff` - Info alert background
- **Info Border**: `#d0e8ff` - Info alert border

## Typography

### Font Family
- **Primary Font**: Arial, sans-serif
- **Fallback**: System fonts

### Font Sizes
- **xs**: 12px - Small labels, helper text
- **sm**: 14px - Form labels, small text
- **base**: 16px - Body text, default
- **lg**: 18px - Section text
- **xl**: 20px - Subheadings
- **2xl**: 24px - Large headings
- **3xl**: 28px - Form titles
- **4xl**: 36px - Page titles
- **5xl**: 48px - Hero titles

### Font Weights
- **Normal**: 400 - Body text
- **Medium**: 500 - Secondary text
- **Bold**: 700 - Headings, emphasized text

### Line Heights
- **Tight**: 1.2 - Headings
- **Normal**: 1.4 - Body text
- **Relaxed**: 1.6 - Long form text

## Spacing

Use the following spacing scale for consistency:

- **xs**: 4px
- **sm**: 8px
- **md**: 12px
- **lg**: 16px
- **xl**: 20px
- **2xl**: 24px
- **3xl**: 30px
- **4xl**: 40px

### Padding Examples
```
Buttons: padding: 12px 20px
Form Inputs: padding: 12px
Cards: padding: 30px
Container: padding: 40px 20px
```

## Border Radius

- **sm**: 4px - Form inputs, small elements
- **md**: 6px - Buttons, standard radius
- **lg**: 8px - Cards, large elements

## Shadows

- **sm**: `0 1px 3px rgba(0,0,0,0.05)` - Subtle shadow for cards
- **md**: `0 2px 8px rgba(0,0,0,0.08)` - Medium shadow for modals
- **lg**: `0 2px 10px rgba(0,0,0,0.1)` - Strong shadow for dropdowns

## Layout

### Max Widths
- **Container**: 1000px
- **Form Container**: 400-500px

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Grid System
```
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
gap: 20px - 30px
```

## Components Styling

### Buttons
```
Default (Primary):
- Background: #0070f3
- Color: white
- Padding: 12px 20px
- Border Radius: 4px
- Font Weight: bold
- Cursor: pointer
- Transition: all 0.2s ease

Hover:
- Background: #0051cc

Disabled:
- Opacity: 0.6
- Cursor: not-allowed
```

### Form Inputs
```
- Border: 1px solid #ddd
- Padding: 12px
- Border Radius: 4px
- Font Size: 14px
- Box Sizing: border-box

Focus:
- Border Color: #0070f3
- Outline: none
```

### Cards
```
- Background: white
- Padding: 30px
- Border Radius: 8px
- Box Shadow: 0 1px 3px rgba(0,0,0,0.1)
- Border: 1px solid #eee
```

### Navbar
```
- Padding: 16px 40px
- Background: white
- Box Shadow: 0 2px 8px rgba(0,0,0,0.08)
- Position: sticky
- Top: 0
- Z-index: 100
```

### Footer
```
- Background: #222222
- Color: white
- Padding: 40px 20px
- Margin Top: 80px
- Border Top: 1px solid #333
```

## Text Styles

### Headings
- Use font-weight: bold
- Line height: 1.2
- Color: #222222

### Body Text
- Font size: 16px
- Line height: 1.4-1.6
- Color: #333333 or #666666

### Labels
- Font weight: bold
- Font size: 14px
- Color: #222222
- Margin bottom: 8px

### Links
- Text decoration: none
- Color: #0070f3
- Cursor: pointer
- Transition: color 0.2s ease

## Interactive States

### Hover
- Smooth transition: 0.2s
- Color change or shadow enhancement
- Cursor change (pointer for interactive elements)

### Focus
- Border or outline change
- For form inputs: border-color to primary blue

### Active
- Slight color or shadow change
- Indicate selected state

### Disabled
- Opacity reduced (0.6)
- Cursor: not-allowed
- Gray or muted colors

## Form Design

### Input Container
```
Margin Bottom: 20px
Label Margin Bottom: 8px
```

### Error Messages
```
Background: #fee
Color: #c33
Padding: 12px 16px
Border Radius: 4px
Margin Bottom: 20px
```

### Success Messages
```
Background: #f0f7ff
Color: #0070f3
Border: 1px solid #d0e8ff
Padding: 12px 16px
```

## Accessibility

### Color Contrast
- Text on background: minimum 4.5:1 ratio
- Large text (18pt+): minimum 3:1 ratio

### Focus Indicators
- All interactive elements must have visible focus state
- Use border or outline changes

### Form Labels
- Always associate labels with inputs
- Use proper HTML structure

### Alt Text
- Provide descriptive alt text for images
- Use empty alt text for decorative images

## Loading States

### Loading Buttons
```
- Show loading text or spinner
- Disable interaction
- Reduce opacity to 0.6
- Use loading text: "Loading...", "Posting...", etc.
```

## Animations

### Transitions
- Default: 0.2s ease
- Used for: hover states, color changes
- Avoid: 0.5s or longer for micro-interactions

### Timing Functions
- ease: easeInOutCubic
- linear: for predictable animations

## Code Examples

### Button Style
```jsx
style={{
  background: "#0070f3",
  color: "white",
  padding: "12px 20px",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background 0.2s ease"
}}
onMouseEnter={(e) => e.target.style.background = "#0051cc"}
onMouseLeave={(e) => e.target.style.background = "#0070f3"}
```

### Card Style
```jsx
style={{
  background: "white",
  padding: "30px",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  border: "1px solid #eee"
}}
```

### Input Style
```jsx
style={{
  display: "block",
  width: "100%",
  padding: "12px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "14px",
  boxSizing: "border-box"
}}
onFocus={(e) => e.target.style.borderColor = "#0070f3"}
onBlur={(e) => e.target.style.borderColor = "#ddd"}
```

## Dark Mode (Future)

Reserved for future dark mode implementation:
- Use CSS variables for color switching
- Update theme.js with dark variants
- Test contrast ratios for dark backgrounds

## Brand Guidelines

### Logo
- Minimum size: 32px
- Always have breathing room around logo
- Don't stretch or distort

### Typography
- Use Arial as primary font
- Maintain consistent sizing
- Don't mix more than 2 font families

### Imagery
- Use professional, high-quality images
- Maintain consistent color tone
- Optimize for web

---

Last Updated: 2024
Version: 1.0
