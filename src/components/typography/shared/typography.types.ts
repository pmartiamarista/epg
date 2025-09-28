export const defaultWeightClasses = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

export type Weight = keyof typeof defaultWeightClasses;

type WithWeight = {
  weight?: Weight;
};

export type TypographyBase = WithWeight;
