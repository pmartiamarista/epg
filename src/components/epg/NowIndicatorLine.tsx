import React, { type FC, memo } from "react";
import { twMerge } from "tailwind-merge";

type NowIndicatorLineProps = React.HTMLAttributes<HTMLDivElement>;

const NowIndicatorLine: FC<NowIndicatorLineProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        "absolute top-0 h-full w-0.5 bg-pink-500 z-30",
        className
      )}
      {...props}
    />
  );
};

export default memo(NowIndicatorLine);
