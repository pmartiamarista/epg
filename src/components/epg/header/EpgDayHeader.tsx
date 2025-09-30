import { type FC, memo, useMemo } from "react";

import EpgDayHeaderIndicator from "./EpgDayHeaderIndicator";
import { useScrollPosition } from "../../../hooks/useScrollPosition";
import { getCurrentDay } from "../../../utils/time/getCurrentDay/getCurrentDay";

import type { EpgDateTimeHeaderBaseProps } from "@/types/components.type";

type EpgDayHeaderProps = EpgDateTimeHeaderBaseProps;

const EpgDayHeader: FC<EpgDayHeaderProps> = memo(
  ({
    globalEarliestStart,
    scrollContainerRef,
    channelColumnWidth,
    hourWidth,
  }) => {
    const { scrollLeft } = useScrollPosition(scrollContainerRef);

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
