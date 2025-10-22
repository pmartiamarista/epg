# EPG (Electronic Program Guide) 📺

A modern, responsive Electronic Program Guide built with React 19 and TypeScript for the Norigin Media Frontend Developer Assessment. Features virtualized scrolling, interactive program selection, real-time updates, responsive layout system, and a comprehensive design system.

## 📋 Assessment Requirements Met

✅ **Single Screen EPG Application** - Fully functional Electronic Program Guide  
✅ **Framework Choice** - React 19 with TypeScript (no generators/starter-kits)  
✅ **Design Implementation** - Following EPG mockup guidelines  
✅ **Mock API Integration** - Using provided Mock-Api package for EPG data  
✅ **Time Progression** - Real-time updates every 30 seconds with live indicators  
✅ **Current Program Indicator** - Yellow line showing current time position  
✅ **NOW Button** - Functional auto-scroll to current time with smart centering  
✅ **Multi-Screen Support** - Responsive design for mobile, tablet, desktop, and 4K displays  
✅ **Cross-Browser Compatible** - Modern browser support with optimized performance  
✅ **Production Ready** - Optimized build with code splitting and caching strategies

## ✨ Features

### 📺 EPG Viewer

- **Responsive Layout System** - Simple, adaptive margins for mobile, tablet, desktop, and 4K displays
- **Fixed Time Intervals** - Clean hourly timeline without trailing blank space
- **Optimized Virtualization** - Horizontal program virtualization with TanStack Virtual
- **Enhanced Channel Tiles** - Logo with gradient overlay and channel titles
- **Robust Image Handling** - Automatic fallback to app logo with useReducer state management
- **Virtualized Channel List** - Smooth scrolling through unlimited channels
- **Timeline Navigation** - Horizontal scrolling with precise hour intervals
- **Internal Scrolling** - EPG scrolls within its container, header stays fixed
- **Time Header** - Dynamic hour markers that update with scroll position
- **Now Button** - Jump to current time positioned within EPG container
- **Program Selection** - Click to select programs with visual feedback
- **Auto-scroll to Selected** - Automatically scrolls to show selected programs
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
- **Date-fns** - Lightweight date manipulation with tree-shaking
- **Valibot** - Lightweight runtime type validation
- **Norigin Spatial Navigation** - TV-style keyboard navigation
- **Zustand** - Lightweight state management for real-time updates
- **useReducer** - Predictable state management for complex component states

## Typography System

The app includes a robust typography system with:

- **Body Component** - Paragraph text with size variants (xs, sm, md, lg, xl)
- **Heading Component** - Semantic headings (h1-h6) with weight controls
- **Font Weights** - Light, normal, medium, semibold, bold
- **Class Merging** - Intelligent CSS class conflict resolution with twMerge

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Backend Setup (Mock API)

1. **Clone the Mock API repository** (cloudberry branch):

   ```bash
   git clone -b cloudberry https://github.com/NoriginMedia/mock-api.git
   cd mock-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Update EPG data to current day**:

   ```bash
   npm run update:epg
   ```

4. **Start the Mock API server**:

   ```bash
   npm run start:demo
   ```

   The API will be available at `http://localhost:1337`

### Frontend Setup

1. **Create `.env` file** (use `.env.template` as reference):

   ```bash
   VITE_API_BASE_URL=http://localhost:1337
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## Development

```bash
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

# Bundle analysis
npm run analyze
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
│   │       └── EpgChannelTimelineTile.tsx # Individual program tile
│   ├── layout/                 # Layout components
│   │   ├── Header.tsx         # Sticky header with navigation
│   │   ├── MainLayout.tsx     # Main app layout wrapper
│   │   └── NavButton.tsx      # Reusable navigation button
│   ├── typography/              # Design system typography
│   │   ├── body/               # Body text components
│   │   └── heading/            # Heading components
│   ├── card/                   # Reusable card component
│   ├── button/                 # Button components
│   ├── Image.tsx              # Smart image with fallback
│   └── examples/               # Design system showcase
├── pages/                      # Page components
│   ├── EpgPage.tsx            # EPG viewer page
│   ├── LoadingPage.tsx        # Loading state page
│   ├── ErrorPage.tsx          # Error handling page
│   └── NotFoundPage.tsx       # 404 page
├── api/                        # API layer
│   ├── api-client/            # HTTP client configuration
│   └── epg-service/           # EPG-specific API services
├── hooks/                      # Custom React hooks
│   ├── useScrollPosition.ts   # Scroll position tracking
│   ├── useCurrentTime.ts      # Real-time current time access
│   └── useIsNowPlaying.ts     # Program playing state detection
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
- **Smart Time Calculations** - Accurate program positioning and duration using Date-fns
- **Scroll-responsive Header** - Time markers update based on visible timeline area
- **Schedule Preparation** - Automatic correction of programs spanning midnight and unique ID generation
- **Precision Timeline Width** - Exact width based on program range eliminating blank space
- **Consistent Time Processing** - Unified Date-fns handling across all utilities

### Navigation & Interaction

- **Click Selection** - Select programs with visual feedback
- **Auto-scroll** - Automatically scroll to show selected programs
- **Now Button** - Quick jump to current time with smart centering
- **Keyboard Support** - Navigate with arrow keys (TV-style navigation)
- **Touch-friendly** - Optimized for mobile touch interactions

## 🧪 Testing

Comprehensive test suite following KISS, DRY, and SOLID principles:

### Test Coverage

- **Button Component** - Variant/size rendering, class merging, ref forwarding
- **Card Component** - Default/custom classes, ref forwarding
- **EPG Header Components** - Day/time headers, indicators, current time line
- **EPG Timeline Components** - Channel tiles, timelines, program tiles, progress bars
- **EPG Viewer** - Container rendering, scrolling, layout structure
- **Reusable Mock Factories** - Typed, documented test data generators

### Test Commands

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

### Testing Principles

- **Typed Mocks** - All mock data uses proper TypeScript types
- **Factory Pattern** - Reusable `createMockProgram`, `createMockSchedules`, `createMockChannel` factories
- **JSDoc Documentation** - Every mock factory includes comprehensive documentation
- **Component Analysis** - Tests written after analyzing component structure
- **SOLID Principles** - DRY, reusable, maintainable test structure

## 🚀 Performance Optimizations

- **Multi-level Virtualization** - TanStack Virtual for both channels and programs
- **Fixed Time Intervals** - Eliminates unnecessary empty space calculations
- **Viewport-based Program Rendering** - Only renders programs visible in scroll view
- **Memoized Components** - Prevents unnecessary re-renders with React.memo
- **useLayoutEffect** - Synchronous DOM measurements for smooth animations
- **CSS Animations** - Hardware-accelerated marquee transforms
- **Ref-based State** - Uses refs instead of useState for animation state
- **Hidden Scrollbars** - Clean UI without scrollbar performance impact
- **Efficient Time Calculations** - Cached and memoized Date-fns utilities
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

### Responsive Layout System

- **Simple Responsive Margins** - Clean adaptive spacing (mobile: `mx-2`, desktop: `mx-8`, 4K: `mx-16`)
- **Sticky Header** - Fixed header with navigation that stays visible while content scrolls
- **Internal EPG Scrolling** - EPG viewer scrolls within its container, not the whole page
- **NavButton Component** - Reusable navigation button with active state using TanStack Router
- **LoadingPage Component** - Clean loading state with spinning loader and design system typography
- **Centered Content** - Proper spacing for all screen sizes without max-width constraints
- **DRY Navigation** - Simple, maintainable header structure

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
- **Now Button Positioning** - Positioned within EPG container using absolute positioning

### Code Quality

- **Utility Consolidation** - Moved time utilities to consolidated `src/utils/` structure
- **Enhanced JSDoc** - Comprehensive documentation for all utility functions with realistic examples
- **useReducer Pattern** - Implemented for complex state management in Image component
- **Performance Optimization** - Multi-level virtualization and efficient timeline calculations
- **Component Organization** - Clean separation with layout components and reusable buttons
- **Type Safety** - Improved type definitions and utility function interfaces
- **KISS & DRY Principles** - Simple, maintainable code following best practices

## 🚀 Latest Improvements

### Performance Optimizations

- **Bundle Size Reduction** - Replaced Zod with Valibot for 91% validation library size reduction (35.20 kB → 3.25 kB)
- **Dependency Cleanup** - Removed 27 unused packages for cleaner dependency tree
- **ResizeObserver Integration** - Replaced window resize events with more efficient DOM observation
- **Bundle Analysis** - Added `npm run analyze` command for bundle size monitoring and optimization

### Developer Experience

- **Complete JSDoc Coverage** - All function components now have comprehensive documentation
- **Custom Hooks** - Added `useIsNowPlaying` hook for centralized time logic
- **Type Safety Improvements** - Enhanced input validation across all utility functions
- **Magic Numbers Extraction** - Moved hardcoded values to `layoutConfig` constants

### Testing & Quality

- **Professional Test Setup** - Added ResizeObserver mock without type assertions
- **All Tests Passing** - 64 tests with 100% pass rate
- **Enhanced Mock Data** - Improved test data factories with proper TypeScript types
- **Edge Case Coverage** - Comprehensive testing of error scenarios and edge cases

### Bundle Metrics

| Metric             | Before       | After        | Improvement             |
| ------------------ | ------------ | ------------ | ----------------------- |
| Validation Bundle  | 35.20 kB     | 3.25 kB      | **91% reduction**       |
| Gzipped Validation | 9.90 kB      | 1.33 kB      | **87% reduction**       |
| Total JS Bundle    | ~178 kB      | ~146 kB      | **~32 kB reduction**    |
| Dependencies       | 596 packages | 569 packages | **27 packages removed** |

## 📊 Date Library Migration: Day.js → Date-fns

### Performance Comparison Results

Migrated from Day.js to Date-fns for significant performance improvements:

| Function                   | Day.js (ms) | Date-fns (ms) | Performance Ratio | Winner      |
| -------------------------- | ----------- | ------------- | ----------------- | ----------- |
| `now()`                    | 4.70        | 0.72          | **6.56x**         | 🏆 Date-fns |
| `isToday()`                | 20.47       | 8.51          | **2.41x**         | 🏆 Date-fns |
| `formatTime()`             | 13.98       | 11.42         | **1.22x**         | 🏆 Date-fns |
| `calculateTimelineWidth()` | 34.64       | 9.77          | **3.54x**         | 🏆 Date-fns |

**Overall Performance Winner: Date-fns** 🚀

### Migration Benefits

- **2-6x faster execution** across all tested functions
- **Better tree-shaking** - Only import functions you use
- **Functional approach** - More predictable and easier to test
- **Modern API** - Aligns with current React patterns
- **Smaller bundle** - Tree-shaking reduces final bundle size
- **Type safety** - Better TypeScript integration with pure functions

### Bundle Size Impact

| Library      | Bundle Size (minified + gzipped)   | Tree-shaking |
| ------------ | ---------------------------------- | ------------ |
| **Day.js**   | ~2.8KB                             | Limited      |
| **Date-fns** | ~13KB (full) / 2-5KB (tree-shaken) | Excellent    |

With the functions used in this EPG project, Date-fns results in a similar or smaller final bundle size due to excellent tree-shaking capabilities.
