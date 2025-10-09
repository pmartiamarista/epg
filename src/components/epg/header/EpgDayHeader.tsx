import { type FC, memo, useMemo } from "react";

import EpgDayHeaderIndicator from "./EpgDayHeaderIndicator";
import { useScrollPosition } from "../../../hooks/useScrollPosition";
import { getCurrentDay } from "../../../utils/time/getCurrentDay/getCurrentDay";

import type { EpgDateTimeHeaderBaseProps } from "@/types/components.type";

type EpgDayHeaderProps = EpgDateTimeHeaderBaseProps;

/**
 * Day header showing current day based on scroll position
 * @param globalEarliestStart - Timeline start time
 * @param containerRef - Scroll container reference
 * @param channelColumnWidth - Channel column width
 * @param hourWidth - Width per hour in pixels
 */
const EpgDayHeader: FC<EpgDayHeaderProps> = memo(
  ({ globalEarliestStart, containerRef, channelColumnWidth, hourWidth }) => {
    const { scrollLeft } = useScrollPosition(containerRef);

    const currentDay = useMemo(() => {
      return getCurrentDay({
        globalEarliestStart,
        scrollLeft,
        channelColumnWidth,
        hourWidth,
      });
    }, [globalEarliestStart, scrollLeft, channelColumnWidth, hourWidth]);

    return <EpgDayHeaderIndicator currentDay={currentDay} />;
  }
);

export default EpgDayHeader;
