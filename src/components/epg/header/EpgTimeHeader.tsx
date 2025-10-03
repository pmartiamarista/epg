import { type FC, memo, useMemo } from "react";

import { useScrollPosition } from "@/hooks/useScrollPosition";

import Body from "@/components/typography/body/Body";

import { calculateVisibleHours } from "@/utils/time/calculateVisibleHours/calculateVisibleHours";

import CurrentTimeIndicator from "./CurrentTimeIndicator";
import EpgTimeHeaderIndicator from "./EpgTimeHeaderIndicator";

import type { GlobalLatestEnd, TotalWidth } from "@/types/common.types";
import type { EpgDateTimeHeaderBaseProps } from "@/types/components.type";

interface EpgTimeHeaderProps
  extends EpgDateTimeHeaderBaseProps,
    TotalWidth,
    GlobalLatestEnd {}

const EpgTimeHeader: FC<EpgTimeHeaderProps> = ({
  globalEarliestStart,
  globalLatestEnd,
  hourWidth,
  channelColumnWidth,
  totalWidth,
  scrollContainerRef,
}) => {
  const { scrollLeft, containerWidth } = useScrollPosition(scrollContainerRef);

  const visibleHours = useMemo(() => {
    const visibleRange = {
      start: scrollLeft,
      end: scrollLeft + containerWidth,
    };

    return calculateVisibleHours(
      globalEarliestStart,
      globalLatestEnd,
      hourWidth,
      visibleRange
    );
  }, [
    globalEarliestStart,
    globalLatestEnd,
    hourWidth,
    scrollLeft,
    containerWidth,
  ]);

  return (
    <div
      className="sticky top-0 z-30 flex bg-bg-primary border-b border-border-primary"
      style={{ width: totalWidth }}
    >
      <div
        className="flex items-center justify-center border-r border-border-primary"
        style={{ width: channelColumnWidth }}
      >
        <Body weight="bold" size="sm" className="text-text-secondary">
          &nbsp;
        </Body>
      </div>

      <div className="relative flex-1">
        {visibleHours.map((hour, index) => (
          <EpgTimeHeaderIndicator
            key={index}
            time={hour.time}
            left={hour.left}
            width={hourWidth}
          />
        ))}

        <CurrentTimeIndicator
          globalEarliestStart={globalEarliestStart}
          hourWidth={hourWidth}
        />
      </div>
    </div>
  );
};

export default memo(EpgTimeHeader);
