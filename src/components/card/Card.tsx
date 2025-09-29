import React from "react";
import { twMerge } from "tailwind-merge";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", ...props }, ref) => {
    const styles = twMerge("bg-bg-secondary p-4", className);

    return (
      <div ref={ref} className={styles} {...props}>
        {children}
      </div>
    );
  }
);

export default Card;
