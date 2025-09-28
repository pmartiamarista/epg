import { forwardRef, memo } from "react";
import { twMerge } from "tailwind-merge";

import { type HeadingProps } from "./heading.types";
import { defaultWeightClasses } from "../shared/typography.types";

/**
 * Heading component with semantic HTML and typography controls.
 *
 * Renders semantic heading elements (h1-h6) with your existing CSS classes.
 * Extends HTML heading element with all standard attributes.
 *
 * @param as - HTML heading level (h1, h2, h3, h4, h5, h6)
 * @param weight - Font weight variant (light, normal, medium, semibold, bold)
 * @param className - Additional CSS classes
 * @param children - Heading content
 *
 * @example
 * ```tsx
 * <Heading as="h2">
 *   This is an h2 heading
 * </Heading>
 * ```
 *
 * @example
 * ```tsx
 * <Heading as="h1" weight="bold" className="text-center">
 *   Bold, centered main heading
 * </Heading>
 * ```
 *
 * @example
 * ```tsx
 * <Heading as="h3" weight="light">
 *   Light weight heading
 * </Heading>
 * ```
 *
 * @example
 * ```tsx
 * <Heading as="h4" weight="semibold" className="text-accent-blue">
 *   Semibold heading with custom color
 * </Heading>
 * ```
 */
const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as = "h1", className, children, weight = "normal", ...props }, ref) => {
    const Element = as;

    const headingClasses = twMerge(className, defaultWeightClasses[weight]);

    return (
      <Element ref={ref} className={headingClasses} {...props}>
        {children}
      </Element>
    );
  }
);

export default memo(Heading);
