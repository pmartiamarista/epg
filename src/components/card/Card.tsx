import React from "react";
import { twMerge } from "tailwind-merge";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  const styles = twMerge("bg-gray-800 rounded-lg p-4", className);

  return (
    <div className={styles} {...props}>
      {children}
    </div>
  );
};

export default Card;
