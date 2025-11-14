# Grant Expedition Design System

## Overview
This design system ensures visual consistency across all pages with standardized spacing, sizing, and component patterns.

## Core Spacing Variables

### CSS Variables (defined in `index.css`)
```css
--space-sm: 8px      /* Small spacing for tight elements */
--space-md: 16px     /* Medium spacing for element separation */
--space-lg: 32px     /* Large spacing for section separation */
--space-xl: 48px     /* Extra large spacing */
--space-2xl: 64px    /* Maximum spacing */
```

### Tailwind Classes (defined in `tailwind.config.ts`)
- `space-sm` = 8px
- `space-md` = 16px
- `space-lg` = 32px
- `space-xl` = 48px
- `space-2xl` = 64px

## Section Standards

### Standard Section Padding
**Vertical:** 32px (top and bottom)  
**Horizontal:** 16px (left and right)

#### Usage:
```tsx
// Method 1: Use the utility class
<section className="section-padding">
  {/* content */}
</section>

// Method 2: Use Tailwind spacing
<section className="py-section-y px-section-x">
  {/* content */}
</section>

// Method 3: Use responsive padding
<section className="py-8 px-4 md:py-section-y md:px-section-x">
  {/* content */}
</section>
```

## Hero Section Standards

### Heights
- **Mobile:** 250px minimum
- **Desktop:** 400px minimum

#### Usage:
```tsx
// Method 1: Use the utility class
<section className="hero-section">
  <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary/60" />
  <div className="relative z-10 text-center text-white px-4">
    <h1>Your Hero Title</h1>
  </div>
</section>

// Method 2: Manual implementation
<section className="relative h-[250px] md:h-[400px] flex items-center justify-center">
  {/* hero content */}
</section>
```

## Card Component Standards

### Specifications
- **Maximum Width:** 350px
- **Internal Padding:** 16px (space-md)
- **Gap Between Cards:** 32px (space-lg)
- **Border Radius:** 0.5rem (inherited from --radius)
- **Aspect Ratios:**
  - Standard: 4:3
  - Wide: 16:9

### Card Grid Layout
```tsx
// Use the card-grid utility class
<div className="card-grid">
  <div className="card-standard">
    <img src="..." className="card-image-4-3" />
    <div className="p-4">
      <h3>Card Title</h3>
      <p>Card description...</p>
    </div>
  </div>
  {/* more cards */}
</div>

// Or use Tailwind directly
<div className="grid gap-card-gap sm:grid-cols-2 lg:grid-cols-3">
  <div className="max-w-card bg-card p-space-md rounded-lg shadow-sm hover:shadow-lg transition-all">
    {/* card content */}
  </div>
</div>
```

## Component Patterns

### Standard Card with Image
```tsx
<Card className="max-w-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
  <img 
    src={imageSrc} 
    alt={title}
    className="aspect-[4/3] w-full object-cover rounded-t-lg"
  />
  <CardHeader className="p-space-md">
    <CardTitle>{title}</CardTitle>
    <CardDescription>{description}</CardDescription>
  </CardHeader>
  <CardContent className="px-space-md pb-space-md">
    {/* content */}
  </CardContent>
  <CardFooter className="px-space-md pb-space-md">
    <Button className="w-full">Action</Button>
  </CardFooter>
</Card>
```

### Hero Section Template
```tsx
<section className="hero-section">
  {/* Background Image */}
  <img 
    src={heroImage} 
    alt="Hero background" 
    className="absolute inset-0 w-full h-full object-cover object-center" 
  />
  
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/50 to-primary/60" />
  
  {/* Content */}
  <div className="relative z-10 text-center text-white px-4">
    <p className="text-2xl md:text-3xl italic font-light mb-2">subtitle</p>
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-wide">
      MAIN TITLE
    </h1>
  </div>
</section>
```

### Section with Cards
```tsx
<section className="section-padding bg-background">
  <div className="container mx-auto px-4">
    {/* Section Header */}
    <div className="text-center mb-space-lg">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">Section Title</h2>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        Section description...
      </p>
    </div>
    
    {/* Card Grid */}
    <div className="card-grid">
      {items.map((item, index) => (
        <Card key={index} className="card-standard">
          {/* card content */}
        </Card>
      ))}
    </div>
  </div>
</section>
```

## Utility Classes Reference

### Section Classes
- `.section-padding` - Standard section padding (32px vertical, 16px horizontal)
- `.hero-section` - Standard hero section (250px mobile, 400px desktop)
- `.space-y-section` - Standard vertical spacing between sections

### Card Classes
- `.card-grid` - Responsive card grid layout (1 col mobile, 2 cols tablet, 3 cols desktop)
- `.card-standard` - Standard card styling with hover effects
- `.card-image-4-3` - 4:3 aspect ratio for card images
- `.card-image-16-9` - 16:9 aspect ratio for card images

## Responsive Breakpoints

```css
/* Mobile First Approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices (tablets) */
lg: 1024px  /* Large devices (desktops) */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

## Color Usage

Always use semantic color tokens from the design system:

```tsx
// ✅ CORRECT
<div className="bg-background text-foreground">
<Button variant="default">Primary Action</Button>
<Badge className="bg-accent">Status</Badge>

// ❌ WRONG
<div className="bg-white text-black">
<Button className="bg-blue-500">Action</Button>
<Badge className="bg-green-500">Status</Badge>
```

## Migration Checklist for Existing Pages

When updating existing pages to use the design system:

1. **Hero Sections**
   - [ ] Replace custom height classes with `.hero-section` or `h-[250px] md:h-[400px]`
   - [ ] Ensure content is vertically and horizontally centered

2. **Section Padding**
   - [ ] Replace custom padding with `.section-padding` or `py-section-y px-section-x`
   - [ ] Use consistent spacing between sections

3. **Card Components**
   - [ ] Limit card width to `max-w-card` (350px)
   - [ ] Use `p-space-md` for internal padding (16px)
   - [ ] Use `gap-card-gap` between cards (32px)
   - [ ] Apply standard hover effects

4. **Image Aspect Ratios**
   - [ ] Use `aspect-[4/3]` or `aspect-[16/9]` for consistency
   - [ ] Apply `object-cover` for proper image fitting

5. **Spacing**
   - [ ] Replace arbitrary values like `gap-6` with semantic spacing like `gap-card-gap`
   - [ ] Use spacing variables: `space-sm`, `space-md`, `space-lg`

## Examples

See the following pages for reference implementations:
- Zanzibar Islands (`/locations/zanzibar`)
- Northern Circuit (`/locations/northern-circuit`)
- Hiking Adventures (`/activities/hiking`)

## Questions or Updates?

For design system updates or questions, please refer to:
- `src/index.css` - CSS variables and utility classes
- `tailwind.config.ts` - Tailwind configuration and spacing utilities
