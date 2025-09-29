import React, {
  type FC,
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";

import { formatTime } from "@/utils/time/formatTime/formatTime";

import Card from "../../card/Card";

import type { IsPlaying, IsSelected } from "@/types/common.types";
import type { EpgGridCell } from "@/types/egp.types";

interface EpgChannelTimelineTileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<EpgGridCell, "program">,
    Partial<IsSelected>,
    Partial<IsPlaying> {}

const EpgChannelTimelineTile: FC<EpgChannelTimelineTileProps> = ({
  program,
  style,
  className,
  isPlaying,
  isSelected = false,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const timeRef = useRef<HTMLParagraphElement>(null);
  const isTitleNarrowRef = useRef(false);
  const isTimeNarrowRef = useRef(false);
  const isHoveredRef = useRef(false);

  const currentClassName = twMerge(
    "h-full",
    "absolute top-0 left-0 flex items-center rounded-lg transition-all duration-200",
    "cursor-pointer overflow-hidden",
    isPlaying
      ? "bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg z-10"
      : isSelected
        ? "bg-blue-600 hover:bg-blue-500 z-10"
        : "bg-gray-700 hover:bg-gray-600",
    className
  );

  const startTimeFormatted = useMemo(
    () => formatTime(new Date(program.start)),
    [program.start]
  );
  const endTimeFormatted = useMemo(
    () => formatTime(new Date(program.end)),
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
        "text-gray-400 text-xs min-w-0",
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
      className={`${currentClassName} p-0`}
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
      <div className="flex flex-col min-w-0 w-full h-full px-1 py-2 justify-center gap-0.5 relative">
        <div className="overflow-hidden">
          <p
            ref={titleRef}
            className="text-white text-sm font-semibold truncate min-w-0"
          >
            {program.title}
          </p>
        </div>
        <div className="overflow-hidden">
          <p ref={timeRef} className="text-gray-400 text-xs truncate min-w-0">
            {startTimeFormatted} - {endTimeFormatted}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default memo(EpgChannelTimelineTile);
