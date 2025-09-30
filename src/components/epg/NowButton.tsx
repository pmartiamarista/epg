import React, { type FC, memo, useCallback } from "react";

import Button from "@/components/button/Button";

import dayjs from "@/constants/dayjs/dayjs";
import now from "@/utils/time/now/now";

import type { GlobalEarliestStart, HourWidth } from "@/types/common.types";
import type { LayoutConfig } from "@/types/components.type";

interface NowButtonProps extends GlobalEarliestStart, HourWidth {
  layoutRef: React.RefObject<LayoutConfig>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const NowButton: FC<NowButtonProps> = ({
  containerRef,
  layoutRef,
  globalEarliestStart,
}) => {
  const handleScrollToNow = useCallback(() => {
    if (!containerRef.current) return;

    const nowTime = now();
    const hoursFromStart = nowTime.diff(
      dayjs(globalEarliestStart),
      "hour",
      true
    );
    const scrollLeft = hoursFromStart * layoutRef.current.hourWidth;
    const containerWidth = containerRef.current.clientWidth;
    const centeredScrollLeft =
      scrollLeft - containerWidth / 2 + layoutRef.current.channelColumnWidth;

    containerRef.current.scrollTo({
      left: Math.max(0, centeredScrollLeft),
      behavior: "smooth",
    });
  }, [containerRef, globalEarliestStart, layoutRef]);

  return (
    <Button
      variant="yellow"
      size="sm"
      onClick={handleScrollToNow}
      className="fixed bottom-4 right-4 z-40 shadow-lg opacity-60 hover:opacity-100 active:opacity-100 transition-opacity duration-200"
    >
      Now
    </Button>
  );
};

export default memo(NowButton);
