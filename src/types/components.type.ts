import type {
  ChannelColumnWidth,
  GlobalEarliestStart,
  HourWidth,
  RowHeight,
  ScrollContainerRef,
} from "./common.types";

export type LayoutConfig = HourWidth & RowHeight & ChannelColumnWidth;

export type LayoutConfigByDevice = {
  mobile: LayoutConfig;
  tablet: LayoutConfig;
  desktop: LayoutConfig;
};

export type EpgDateTimeHeaderBaseProps = HourWidth &
  ChannelColumnWidth &
  GlobalEarliestStart &
  ScrollContainerRef;
