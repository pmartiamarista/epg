import { Link } from "@tanstack/react-router";
import { type FC } from "react";

import NavButton from "./NavButton";

const Header: FC = () => {
  return (
    <header className="bg-bg-secondary border-b border-border-primary sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3 mx-2 sm:mx-8 lg:mx-16 xl:mx-32">
        {/* App Logo/Brand */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/tv-icon.svg" alt="EPG Guide Logo" className="w-8 h-8" />
          <span className="text-text-primary font-bold text-lg">EPG Guide</span>
        </Link>

        <nav className="flex items-center gap-6">
          <NavButton to="/">Guide</NavButton>
        </nav>
      </div>
    </header>
  );
};

export default Header;
