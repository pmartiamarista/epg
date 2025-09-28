import { forwardRef, memo } from "react";
import { twMerge } from "tailwind-merge";

import { type BodyProps, defaultBodyClasses } from "./body.types";
import { defaultWeightClasses } from "../shared/typography.types";

/**
 * Body component for paragraph text with typography controls.
 *
 * Supports size variants using your existing CSS classes.
 * Extends HTML paragraph element with all standard attributes.
 *
 * @param size - Text size variant (xs, sm, md, lg, xl)
 * @param weight - Font weight variant (light, normal, medium, semibold, bold)
 * @param className - Additional CSS classes
 * @param children - Text content
 *
 * @example
 * ```tsx
 * <Body size="lg">
 *   This is a large body text
 * </Body>
 * ```
 *
 * @example
 * ```tsx
 * <Body size="md" weight="medium" className="text-center">
 *   Medium weight, centered body text with custom styling
 * </Body>
 * ```
 *
 * @example
 * ```tsx
 * <Body size="sm" weight="bold">
 *   Small, bold body text for emphasis
 * </Body>
 * ```
 */
const Body = forwardRef<HTMLParagraphElement, BodyProps>(
  ({ size = "md", className, children, weight = "normal", ...props }, ref) => {
    const bodyClasses = twMerge(
      className,
      defaultBodyClasses[size],
      defaultWeightClasses[weight]
    );

    return (
      <p ref={ref} className={bodyClasses} {...props}>
        {children}
      </p>
    );
  }
);

export default memo(Body);
