import React, {
  type FC,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";

import useCurrentTime from "@/hooks/useCurrentTime";

import Body from "@/components/typography/body/Body";

import { formatTime } from "@/utils/time/formatTime/formatTime";

import EpgChannelTimelineTileProgressBar from "./EpgChannelTimelineTileProgressBar";
import Card from "../../card/Card";

import type { EpgGridCell } from "@/types/egp.types";

interface EpgChannelTimelineTileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<EpgGridCell, "program"> {}

const EpgChannelTimelineTile: FC<EpgChannelTimelineTileProps> = ({
  program,
  style,
  className,

  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const timeRef = useRef<HTMLParagraphElement>(null);
  const isHoveredRef = useRef(false);
  const isTitleOverflowRef = useRef(false);
  const isTimeOverflowRef = useRef(false);

  const currentTime = useCurrentTime();

  const isNowPlaying =
    currentTime.isAfter(program.start) && currentTime.isBefore(program.end);

  const styles = twMerge(
    "h-full",
    "p-0 shrink-0 grow-0",
    "absolute top-0 left-0 flex items-center transition-all duration-200",
    "cursor-pointer overflow-hidden border border-border-primary hover:bg-bg-hover",
    "bg-bg-primary",
    isNowPlaying && "bg-bg-tertiary shadow-lg",
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
    const shouldAnimate = isHoveredRef.current && isTitleOverflowRef.current;

    if (titleRef.current) {
      titleRef.current.className = twMerge(
        "text-white text-sm font-semibold min-w-0",
        shouldAnimate ? "animate-marquee whitespace-nowrap" : "truncate"
      );
    }

    const shouldAnimateTime = isHoveredRef.current && isTimeOverflowRef.current;

    if (timeRef.current) {
      timeRef.current.className = twMerge(
        "text-text-secondary text-xs font-semibold min-w-0",
        shouldAnimateTime ? "animate-marquee whitespace-nowrap" : "truncate"
      );
    }
  }, []);

  useLayoutEffect(() => {
    // Check if text overflows container
    const checkOverflow = () => {
      if (titleRef.current) {
        const container = titleRef.current.parentElement;
        if (container) {
          const containerWidth = container.offsetWidth;
          const textWidth = titleRef.current.scrollWidth;
          isTitleOverflowRef.current = textWidth > containerWidth;
        }
      }

      if (timeRef.current) {
        const container = timeRef.current.parentElement;
        if (container) {
          const containerWidth = container.offsetWidth;
          const timeWidth = timeRef.current.scrollWidth;
          isTimeOverflowRef.current = timeWidth > containerWidth;
        }
      }

      updateAnimation();
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [program.title, updateAnimation]);

  return (
    <Card
      ref={cardRef}
      style={style}
      className={styles}
      role="button"
      aria-label={program.title}
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

        {isNowPlaying && (
          <div className="absolute bottom-0 left-0 right-0">
            <EpgChannelTimelineTileProgressBar program={program} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default EpgChannelTimelineTile;
