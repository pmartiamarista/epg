import type { HTMLAttributes } from "react";

import type { TypographyBase } from "../shared/typography.types";

type HeadingAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    TypographyBase {
  as?: HeadingAs;
}

export type { HeadingAs, HeadingProps };
