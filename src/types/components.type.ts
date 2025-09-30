import type React from "react";

import type {
  ChannelColumnWidth,
  GlobalEarliestStart,
  HourWidth,
  RowHeight,
} from "./common.types";

type LayoutConfig = HourWidth & RowHeight & ChannelColumnWidth;

export type LayoutConfigByDevice = {
  mobile: LayoutConfig;
  tablet: LayoutConfig;
  desktop: LayoutConfig;
};

export type EpgDateTimeHeaderBaseProps = HourWidth &
  ChannelColumnWidth &
  GlobalEarliestStart & {
    scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  };
