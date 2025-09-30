import React from "react";
import { twMerge } from "tailwind-merge";

import type { SizeGeneric, VariantGeneric } from "@/types/generics.types";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "yellow"
  | "green"
  | "red"
  | "blue";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<SizeGeneric<ButtonSize>>,
    Partial<VariantGeneric<ButtonVariant>> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className = "", variant = "primary", size = "md", ...props },
    ref
  ) => {
    const styles = twMerge("btn", `btn-${variant}`, `btn-${size}`, className);

    return (
      <button {...props} className={styles} ref={ref}>
        {children}
      </button>
    );
  }
);

export default Button;

