# EPG (Electronic Program Guide) 📺

A modern, responsive Electronic Program Guide built with React 19 and TypeScript, featuring virtualized scrolling, interactive program selection, fixed time intervals, and a comprehensive design system.

## ✨ Features

### 📺 EPG Viewer

- **Fixed Time Intervals** - Clean hourly timeline without trailing blank space
- **Optimized Virtualization** - Horizontal program virtualization with TanStack Virtual
- **Enhanced Channel Tiles** - Logo with gradient overlay and channel titles
- **Robust Image Handling** - Automatic fallback to app logo with useReducer state management
- **Virtualized Channel List** - Smooth scrolling through unlimited channels
- **Timeline Navigation** - Horizontal scrolling with precise hour intervals
- **Time Header** - Dynamic hour markers that update with scroll position
- **Now Button** - Jump to current time with smart centering
- **Program Selection** - Click to select programs with visual feedback
- **Auto-scroll to Selected** - Automatically scrolls to show selected programs
- **Responsive Design** - Adapts to mobile, tablet, and desktop viewports
- **Keyboard Navigation** - Full keyboard support with spatial navigation
- **Real-time Updates** - Live "now playing" indicators and current time line
- **Current Time Indicator** - Small yellow indicator at timeline bottom

### 🎨 Program Tiles

- **Dynamic Sizing** - Program duration determines tile width
- **Smart Text Handling** - Automatic text truncation with scrolling animation for both titles and time displays
- **Overflow Detection** - Intelligent detection when text doesn't fit in narrow tiles
- **Visual States** - Different styles for playing, selected, and normal states
- **Hidden Scrollbars** - Clean interface without visible scrollbars
- **Hover & Selection Effects** - Interactive feedback with marquee animation triggers

### 🖼️ Image Components

- **Smart Fallback System** - Automatic fallback to app logo when images fail to load
- **useReducer State Management** - Predictable state transitions for image loading states
- **Channel Logo Enhancement** - Gradient overlays with channel titles for better recognition
- **Centered Image Display** - Properly contained logos with aspect ratio preservation
- **Error Handling** - Graceful handling of network errors, 404s, and loading failures
- **Accessibility** - Proper alt text and aria-labels for screen readers

### ⚡ Performance

- **Multi-level Virtualization** - Both channel and program virtualization for unlimited scalability
- **Fixed Time Intervals** - Optimized timeline calculations without unnecessary empty space
- **Viewport-based Rendering** - Only renders programs currently visible in scroll view
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
- **Tailwind CSS v4** - Utility-first CSS framework with gradient overlays
- **Day.js** - Lightweight date manipulation
- **Zod** - Runtime type validation
- **Norigin Spatial Navigation** - TV-style keyboard navigation
- **Zustand** - Lightweight state management for real-time updates
- **useReducer** - Predictable state management for complex component states

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
│   │   │   ├── EpgDayHeader.tsx     # Day navigation header
│   │   │   └── TimeInterval.tsx     # Individual hour interval
│   │   └── timeline/            # Timeline-related components
│   │       ├── EpgChannelTile.tsx        # Channel information tile
│   │       ├── EpgChannelTimeline.tsx    # Channel's program timeline
│   │       ├── EpgChannelTimelineTile.tsx # Individual program tile
│   │       └── CurrentTimeLine.tsx       # Real-time current time indicator
│   ├── typography/              # Design system typography
│   │   ├── body/               # Body text components
│   │   └── heading/            # Heading components
│   ├── card/                   # Reusable card component
│   └── examples/               # Design system showcase
├── api/                        # API layer
│   ├── api-client/            # HTTP client configuration
│   └── epg-service/           # EPG-specific API services
├── hooks/                      # Custom React hooks
│   ├── useScrollPosition.ts   # Scroll position tracking
│   └── useCurrentTime.ts      # Real-time current time access
├── utils/                      # Consolidated utility functions
│   ├── calculateTimelineWidth/ # Timeline width calculation (fixed intervals)
│   ├── calculateVisibleHours/ # Visible hour calculation (viewport-based)
│   ├── calculateGlobalTimeRange/ # Global time range across all channels
│   ├── calculateCurrentTimePosition/ # Current time position utilities
│   ├── calculateProgressPercentage/ # Program progress calculation
│   ├── generateUniqueId/       # Unique ID generation utility
│   ├── prepareChannelSchedules/ # Channel schedule preparation and overnight fix
│   └── time/                  # Time utility functions
│       ├── formatTime/        # Time formatting utilities
│       ├── now/              # Current time helpers
│       ├── isToday/          # Date comparison utilities
│       ├── isBetweenDates/   # Date range checking utilities
│       └── getCurrentDay/    # Current day calculation
├── styles/                     # Global styles
│   ├── base.css               # Base styles and animations
│   ├── colors.css             # Color system
│   ├── typography.css         # Typography classes
│   └── theme.css              # Theme configuration
├── routes/                     # File-based routing
├── stores/                     # Zustand state management
│   ├── timeStore.ts           # Global time state
│   └── time.selectors.ts      # Time state selectors
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

- **Fixed Time Intervals** - Clean hourly timeline without extra trailing space
- **Global Timeline Sync** - All channels share the same time reference
- **Optimized Width Calculation** - Timeline rounds start down, end up to hour boundaries
- **Hour Intervals** - Timeline broken into hour segments with dynamic header
- **Current Time Indicator** - Small yellow indicator at timeline bottom
- **Real-time Updates** - Live current time updates every 30 seconds via Zustand store
- **Smart Time Calculations** - Accurate program positioning and duration using Day.js
- **Scroll-responsive Header** - Time markers update based on visible timeline area
- **Schedule Preparation** - Automatic correction of programs spanning midnight and unique ID generation
- **Precision Timeline Width** - Exact width based on program range eliminating blank space
- **Consistent Time Processing** - Unified Day.js handling across all utilities

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

- **Multi-level Virtualization** - TanStack Virtual for both channels and programs
- **Fixed Time Intervals** - Eliminates unnecessary empty space calculations
- **Viewport-based Program Rendering** - Only renders programs visible in scroll view
- **Memoized Components** - Prevents unnecessary re-renders with React.memo
- **useLayoutEffect** - Synchronous DOM measurements for smooth animations
- **CSS Animations** - Hardware-accelerated marquee transforms
- **Ref-based State** - Uses refs instead of useState for animation state
- **Hidden Scrollbars** - Clean UI without scrollbar performance impact
- **Efficient Time Calculations** - Cached and memoized Day.js utilities
- **Timeline Width Caching** - Memoized timeline width calculations optimized for exact program range
- **Scroll Position Tracking** - Optimized scroll event handling with debouncing
- **Enhanced Utility Functions** - Comprehensive JSDoc documentation with improved algorithms
- **Zustand State Management** - Efficient global state with minimal re-renders
- **Real-time Updates** - Single timer updates all components simultaneously (30 second intervals)
- **Selective Re-renders** - Only components using current time re-render on updates

## 🎨 Design System

The app features a comprehensive design system with:

- **Typography Components** - Semantic heading and body text
- **Color System** - Consistent dark theme with accent colors
- **Gradient System** - Smooth visual transitions
- **Component Variants** - Flexible, reusable components
- **Accessibility** - WCAG compliant with proper focus management

## 🔧 Recent Updates

### Image Component Enhancements

- **Smart Image Component** - Built with useReducer for predictable state management
- **Automatic Fallback System** - Defaults to app logo (`/tv-icon.svg`) when images fail
- **Enhanced Channel Tiles** - Gradient overlays with channel titles for better recognition
- **Centered Logo Display** - Properly contained channel logos with aspect ratio preservation
- **Robust Error Handling** - Graceful handling of network errors and loading failures

### Timeline Optimization

- **Fixed Time Intervals** - Timeline width now exact to program range (no trailing blank space)
- **Enhanced Virtualization** - Program-level virtualization with TanStack Virtual
- **Optimized Calculations** - Timeline width rounds start down, end up to hour boundaries
- **Viewport-based Rendering** - Only renders programs currently visible in scroll view

### Real-time Features

- **Live Current Time** - Global time state updates every 30 seconds
- **Current Time Indicator** - Small yellow indicator at timeline bottom
- **Dynamic "Now Playing"** - Program tiles update their playing state in real-time
- **Zustand Integration** - Lightweight state management for time updates

### Enhanced Navigation

- **Keyboard Support** - Full keyboard navigation with spatial navigation
- **Touch-friendly** - Optimized for mobile touch interactions

### Code Quality

- **Utility Consolidation** - Moved time utilities to consolidated `src/utils/` structure
- **Enhanced JSDoc** - Comprehensive documentation for all utility functions with realistic examples
- **useReducer Pattern** - Implemented for complex state management in Image component
- **Performance Optimization** - Multi-level virtualization and efficient timeline calculations
- **Unique ID Generation** - Robust ID generation for program data
- **Schedule Preparation** - Enhanced channel schedule processing with overnight fixes
- **Type Safety** - Improved type definitions and utility function interfaces
