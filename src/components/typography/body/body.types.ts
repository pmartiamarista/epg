import type { HTMLAttributes } from "react";

import type { TypographyBase } from "../shared/typography.types";

import type { SizeGeneric } from "@/types/generics.types";

const defaultBodyClasses = {
  xs: "body-xs",
  sm: "body-sm",
  md: "body-md",
  lg: "body-lg",
  xl: "body-lg",
} as const;

type BodySize = keyof typeof defaultBodyClasses;

interface BodyProps
  extends HTMLAttributes<HTMLParagraphElement>,
    Partial<SizeGeneric<BodySize>>,
    TypographyBase {}

export { defaultBodyClasses };
export type { BodyProps, BodySize };
