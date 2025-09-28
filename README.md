# EPG App

React EPG (Electronic Program Guide) application built with modern web technologies and a comprehensive design system.

## Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Server state management
- **Tailwind CSS v4** - Utility-first CSS framework
- **Zod** - Schema validation
- **Vitest** - Fast unit testing
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Features

- 🎨 **Design System** - Comprehensive typography and component system
- 🧪 **Testing** - Full test coverage with Vitest and Testing Library
- 📱 **Responsive** - Mobile-first responsive design
- ♿ **Accessible** - WCAG compliant components
- 🚀 **Performance** - Optimized builds and lazy loading
- 🔧 **Developer Experience** - Hot reload, type checking, and linting

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

## Project Structure

```
src/
├── components/
│   ├── typography/          # Typography components
│   │   ├── body/           # Body text component
│   │   └── heading/        # Heading component
│   └── examples/           # Design system examples
├── styles/                 # CSS files
│   ├── base.css           # Base styles and resets
│   ├── typography.css     # Typography classes
│   ├── colors.css         # Color variables
│   └── theme.css          # Theme configuration
├── api/                   # API client and services
├── constants/             # App constants
├── routes/                # TanStack Router routes
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## Testing

The project includes comprehensive tests for all typography components:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test -- --watch
```

## Contributing

1. Follow the existing code style
2. Write tests for new components
3. Ensure all tests pass
4. Run linting and formatting before committing
