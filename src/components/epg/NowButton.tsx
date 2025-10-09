import { type FC, memo, useCallback } from "react";

import Button from "@/components/button/Button";

import dayjs from "@/constants/dayjs/dayjs";
import now from "@/utils/time/now/now";

import type {
  ContainerRef,
  GlobalEarliestStart,
  HourWidth,
} from "@/types/common.types";

interface NowButtonProps extends GlobalEarliestStart, HourWidth, ContainerRef {}

/**
 * Button to scroll EPG to current time
 * @param containerRef - Scroll container reference
 * @param globalEarliestStart - Timeline start time
 * @param hourWidth - Width per hour in pixels
 */
const NowButton: FC<NowButtonProps> = ({
  containerRef,
  globalEarliestStart,
  hourWidth,
}) => {
  const handleScrollToNow = useCallback(() => {
    if (!containerRef.current) return;

    const nowTime = now();
    const hoursFromStart = nowTime.diff(
      dayjs(globalEarliestStart),
      "hour",
      true
    );
    const scrollLeft = hoursFromStart * hourWidth;
    const containerWidth = containerRef.current.clientWidth;
    const centeredScrollLeft = scrollLeft - containerWidth / 2 + 96; // channelColumnWidth

    containerRef.current.scrollTo({
      left: Math.max(0, centeredScrollLeft),
      behavior: "smooth",
    });
  }, [containerRef, globalEarliestStart, hourWidth]);

  return (
    <Button
      variant="yellow"
      size="sm"
      onClick={handleScrollToNow}
      className="absolute bottom-4 right-4 z-10 shadow-lg opacity-60 hover:opacity-100 active:opacity-100 transition-opacity duration-200"
    >
      Now
    </Button>
  );
};

export default memo(NowButton);
