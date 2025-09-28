/// <reference types="vitest" />
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optimize JSX runtime
      jsxRuntime: "automatic",
    }),
    tanstackRouter(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Production build optimizations
  build: {
    // Target modern browsers for better performance
    target: "esnext",
    // Use esbuild for fastest minification
    minify: "esbuild",
    // Aggressive chunk splitting for optimal caching
    rollupOptions: {
      // Externalize dev dependencies in production
      external: id => {
        if (process.env.NODE_ENV === "production") {
          return id.includes("@tanstack/react-router-devtools");
        }
        return false;
      },
      output: {
        manualChunks: {
          // Core React libraries
          vendor: ["react", "react-dom"],
          // Router functionality
          router: ["@tanstack/react-router"],
          // Query functionality
          query: ["@tanstack/react-query"],
          // Virtualization
          virtual: ["@tanstack/react-virtual"],
          // Validation library
          validation: ["zod"],
          // Utility libraries
          utils: ["tailwind-merge", "clsx"],
        },
        // Optimize chunk file names for better caching
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    // Enable source maps for production debugging
    sourcemap: true,
    // Optimize asset handling
    assetsInlineLimit: 4096,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize bundle size
    reportCompressedSize: true,
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  // Development optimizations
  server: {
    // Enable HMR
    hmr: true,
    // Optimize file watching
    watch: {
      usePolling: false,
      ignored: ["**/node_modules/**", "**/dist/**", "**/.git/**"],
    },
    // Enable CORS for development
    cors: true,
    // Set host for network access
    host: true,
    // Enable compression for faster dev server
    middlewareMode: false,
    // Optimize dev server performance
    fs: {
      strict: false,
    },
  },
  // Dependency optimization
  optimizeDeps: {
    // Pre-bundle dependencies
    include: [
      "react",
      "react-dom",
      "@tanstack/react-router",
      "@tanstack/react-query",
      "@tanstack/react-virtual",
      "zod",
      "clsx",
      "tailwind-merge",
    ],
    // Exclude from pre-bundling
    exclude: ["@tanstack/react-router-devtools"],
    // Force optimization for better performance
    force: true,
    // Optimize esbuild for better performance
    esbuildOptions: {
      target: "esnext",
      // Enable tree shaking
      treeShaking: true,
      // Optimize for modern browsers
      supported: {
        "top-level-await": true,
      },
    },
  },
  // CSS optimizations
  css: {
    // Enable CSS code splitting
    devSourcemap: true,
    // Optimize CSS processing for Tailwind v4
    // PostCSS is not needed for Tailwind v4
  },
  // Test configuration
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
