import { type FC, type ReactNode } from "react";

import Header from "./Header";

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * Main Layout Component
 *
 * Simple responsive layout with header and content area.
 * Follows design system colors and maintains consistent spacing.
 */
const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-bg-primary text-text-primary flex flex-col">
      <Header />
      <main className="flex-1 px-2 sm:px-4 py-2 sm:py-3 overflow-hidden mx-1 sm:mx-8 lg:mx-16 xl:mx-32">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
