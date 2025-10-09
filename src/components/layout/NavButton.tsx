import { Link, type LinkProps } from "@tanstack/react-router";
import { type FC, memo, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface NavButtonProps {
  to: LinkProps["to"];
  children: ReactNode;
}

/**
 * Navigation button with active state styling
 * @param to - Route path
 * @param children - Button content
 */
const NavButton: FC<NavButtonProps> = ({ to, children }) => {
  return (
    <Link to={to} activeOptions={{ exact: true }}>
      {({ isActive }) => {
        const className = twMerge(
          "transition-colors duration-200",
          isActive
            ? "text-accent-primary"
            : "text-text-secondary hover:text-text-primary"
        );
        return <span className={className}>{children}</span>;
      }}
    </Link>
  );
};

export default memo(NavButton);
