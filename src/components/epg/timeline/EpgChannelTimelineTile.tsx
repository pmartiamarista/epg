import React, {
  type FC,
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";

import useCurrentTime from "@/hooks/useCurrentTime";

import Body from "@/components/typography/body/Body";

import { formatTime } from "@/utils/time/formatTime/formatTime";

import Card from "../../card/Card";

import type { IsSelected } from "@/types/common.types";
import type { EpgGridCell } from "@/types/egp.types";

interface EpgChannelTimelineTileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<EpgGridCell, "program">,
    Partial<IsSelected> {}

const EpgChannelTimelineTile: FC<EpgChannelTimelineTileProps> = ({
  program,
  style,
  className,
  isSelected = false,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const timeRef = useRef<HTMLParagraphElement>(null);
  const isTitleNarrowRef = useRef(false);
  const isTimeNarrowRef = useRef(false);
  const isHoveredRef = useRef(false);

  const currentTime = useCurrentTime();

  const isNowPlaying =
    currentTime.isAfter(program.start) && currentTime.isBefore(program.end);

  const currentClassName = twMerge(
    "h-full",
    "absolute top-0 left-0 flex items-center transition-all duration-200",
    "cursor-pointer overflow-hidden border border-border-primary hover:bg-bg-hover",
    "bg-bg-primary",
    isNowPlaying && "bg-bg-tertiary shadow-lg ",
    isSelected && "bg-bg-tertiary ",
    className
  );

  const startTimeFormatted = useMemo(
    () => formatTime(program.start),
    [program.start]
  );
  const endTimeFormatted = useMemo(
    () => formatTime(program.end),
    [program.end]
  );

  const updateAnimation = useCallback(() => {
    const shouldAnimate = isHoveredRef.current || isSelected;

    if (titleRef.current) {
      titleRef.current.className = twMerge(
        "text-white text-sm font-semibold min-w-0",
        shouldAnimate && isTitleNarrowRef.current
          ? "animate-marquee whitespace-nowrap"
          : "truncate"
      );
    }

    if (timeRef.current) {
      timeRef.current.className = twMerge(
        "text-text-secondary text-xs font-semibold min-w-0",
        shouldAnimate && isTimeNarrowRef.current
          ? "animate-marquee whitespace-nowrap"
          : "truncate"
      );
    }
  }, [isSelected]);

  useLayoutEffect(() => {
    const checkWidth = () => {
      if (titleRef.current) {
        const textContainer = titleRef.current.parentElement;
        if (textContainer) {
          const containerWidth = textContainer.offsetWidth;
          const textWidth = titleRef.current.scrollWidth;
          isTitleNarrowRef.current = textWidth > containerWidth;
        }
      }

      if (timeRef.current) {
        const timeContainer = timeRef.current.parentElement;
        if (timeContainer) {
          const containerWidth = timeContainer.offsetWidth;
          const timeWidth = timeRef.current.scrollWidth;
          isTimeNarrowRef.current = timeWidth > containerWidth;
        }
      }

      updateAnimation();
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, [program.title, updateAnimation]);

  useLayoutEffect(() => {
    updateAnimation();
  }, [isSelected, updateAnimation]);

  return (
    <Card
      ref={cardRef}
      style={style}
      className={twMerge("p-0 shrink-0 grow-0", currentClassName)}
      onMouseEnter={() => {
        isHoveredRef.current = true;
        updateAnimation();
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        updateAnimation();
      }}
      {...props}
    >
      <div className="flex flex-col min-w-0 w-full h-full px-1 py-2 justify-center gap-0.5 relative truncate">
        <div className="overflow-hidden">
          <Body ref={titleRef}>{program.title}</Body>
        </div>
        <div className="overflow-hidden">
          <Body ref={timeRef}>
            {startTimeFormatted} - {endTimeFormatted}
          </Body>
        </div>
      </div>
    </Card>
  );
};

export default memo(EpgChannelTimelineTile);
