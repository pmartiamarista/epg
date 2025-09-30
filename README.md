# EPG (Electronic Program Guide) 📺

A modern, responsive Electronic Program Guide built with React 19 and TypeScript, featuring virtualized scrolling, interactive program selection, and a comprehensive design system.

## ✨ Features

### 📺 EPG Viewer

- **Virtualized Channel List** - Smooth scrolling through unlimited channels
- **Timeline Navigation** - Horizontal scrolling with hour intervals
- **Time Header** - Dynamic hour markers that update with scroll position
- **Now Button** - Jump to current time with smart centering
- **Program Selection** - Click to select programs with visual feedback
- **Auto-scroll to Selected** - Automatically scrolls to show selected programs
- **Responsive Design** - Adapts to mobile, tablet, and desktop viewports
- **Keyboard Navigation** - Full keyboard support with spatial navigation

### 🎨 Program Tiles

- **Dynamic Sizing** - Program duration determines tile width
- **Smart Text Handling** - Automatic text truncation with scrolling animation for both titles and time displays
- **Overflow Detection** - Intelligent detection when text doesn't fit in narrow tiles
- **Visual States** - Different styles for playing, selected, and normal states
- **Hidden Scrollbars** - Clean interface without visible scrollbars
- **Hover & Selection Effects** - Interactive feedback with marquee animation triggers

### ⚡ Performance

- **Virtual Scrolling** - Only renders visible channels for optimal performance
- **Optimized Animations** - Hardware-accelerated CSS animations
- **Efficient Re-renders** - Smart memoization and ref usage
- **Layout Effects** - Synchronous DOM measurements for smooth UX

## 🛠 Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Full type safety throughout the application
- **Vite** - Lightning-fast build tool and dev server
- **TanStack Router** - Type-safe file-based routing
- **TanStack Query** - Powerful server state management
- **TanStack Virtual** - High-performance virtual scrolling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Day.js** - Lightweight date manipulation
- **Zod** - Runtime type validation
- **Norigin Spatial Navigation** - TV-style keyboard navigation

## Typography System

The app includes a robust typography system with:

- **Body Component** - Paragraph text with size variants (xs, sm, md, lg, xl)
- **Heading Component** - Semantic headings (h1-h6) with weight controls
- **Font Weights** - Light, normal, medium, semibold, bold
- **Class Merging** - Intelligent CSS class conflict resolution with twMerge

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Type checking
npm run typecheck

# Linting
npm run lint

# Format code
npm run format
```

## Build

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── epg/                      # EPG-specific components
│   │   ├── EpgViewer.tsx        # Main EPG container with virtualization
│   │   ├── NowButton.tsx        # Jump to current time button
│   │   ├── header/              # Time header components
│   │   │   ├── EpgTimeHeader.tsx    # Dynamic hour markers
│   │   │   └── TimeInterval.tsx     # Individual hour interval
│   │   └── timeline/            # Timeline-related components
│   │       ├── EpgChannelTile.tsx        # Channel information tile
│   │       ├── EpgChannelTimeline.tsx    # Channel's program timeline
│   │       └── EpgChannelTimelineTile.tsx # Individual program tile
│   ├── typography/              # Design system typography
│   │   ├── body/               # Body text components
│   │   └── heading/            # Heading components
│   ├── card/                   # Reusable card component
│   └── examples/               # Design system showcase
├── api/                        # API layer
│   ├── api-client/            # HTTP client configuration
│   └── epg-service/           # EPG-specific API services
├── hooks/                      # Custom React hooks
│   └── useScrollPosition.ts   # Scroll position tracking
├── utils/
│   └── time/                   # Time utility functions
│       ├── formatTime/         # Time formatting utilities
│       ├── now/               # Current time helpers
│       ├── isToday/           # Date comparison utilities
│       ├── isBetweenDates/    # Date range checking utilities
│       ├── getCurrentDay/     # Current day calculation
│       ├── calculateTimelineWidth/ # Timeline width calculation
│       ├── calculateVisibleHours/ # Visible hour calculation
│       └── fixOvernightSchedules/ # Overnight schedule correction
├── styles/                     # Global styles
│   ├── base.css               # Base styles and animations
│   ├── colors.css             # Color system
│   ├── typography.css         # Typography classes
│   └── theme.css              # Theme configuration
├── routes/                     # File-based routing
├── types/                      # TypeScript definitions
└── constants/                  # App-wide constants
│   ├── layout.ts              # Responsive layout configuration
│   └── dayjs/                 # Day.js configuration
```

## 🎮 EPG Key Features

### Smart Program Tiles

- **Overflow Detection** - Automatically detects when text doesn't fit (titles & time displays)
- **Dual Scrolling Animation** - Smooth marquee animation for both program titles and time text
- **Intelligent Triggers** - Animation activates on hover or program selection
- **State-aware Styling** - Visual feedback for playing, selected, and normal states
- **Responsive Sizing** - Tiles adjust width based on program duration
- **Performance Optimized** - Uses refs and layout effects for smooth animations

### Time Management

- **Global Timeline Sync** - All channels share the same time reference
- **Hour Intervals** - Timeline broken into hour segments with dynamic header
- **Current Time Indicator** - Visual marker showing the current time
- **Smart Time Calculations** - Accurate program positioning and duration using Day.js
- **Scroll-responsive Header** - Time markers update based on visible timeline area
- **Overnight Schedule Fix** - Automatic correction of programs spanning midnight
- **Timeline Width Optimization** - Rounds up to hour boundaries for clean appearance
- **UTC Time Handling** - Consistent timezone handling across all components

### Navigation & Interaction

- **Click Selection** - Select programs with visual feedback
- **Auto-scroll** - Automatically scroll to show selected programs
- **Now Button** - Quick jump to current time with smart centering
- **Keyboard Support** - Navigate with arrow keys (TV-style navigation)
- **Touch-friendly** - Optimized for mobile touch interactions

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test -- --watch

# Run test UI
npm run test:ui
```

## 🚀 Performance Optimizations

- **Virtual Scrolling** - Only renders visible channels with TanStack Virtual
- **Memoized Components** - Prevents unnecessary re-renders with React.memo
- **useLayoutEffect** - Synchronous DOM measurements for smooth animations
- **CSS Animations** - Hardware-accelerated marquee transforms
- **Ref-based State** - Uses refs instead of useState for animation state
- **Hidden Scrollbars** - Clean UI without scrollbar performance impact
- **Efficient Time Calculations** - Cached and memoized Day.js utilities
- **Timeline Width Caching** - Memoized timeline width calculations
- **Scroll Position Tracking** - Optimized scroll event handling with debouncing
- **Type-safe Utilities** - Comprehensive JSDoc documentation for all utility functions

## 🎨 Design System

The app features a comprehensive design system with:

- **Typography Components** - Semantic heading and body text
- **Color System** - Consistent dark theme with accent colors
- **Gradient System** - Smooth visual transitions
- **Component Variants** - Flexible, reusable components
- **Accessibility** - WCAG compliant with proper focus management
