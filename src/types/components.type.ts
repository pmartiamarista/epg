import type {
  ChannelColumnWidth,
  ContainerRef,
  GlobalEarliestStart,
  HourWidth,
  RowHeight,
} from "./common.types";

export type LayoutConfig = HourWidth &
  RowHeight &
  ChannelColumnWidth & {
    overscan: number;
    updateInterval: number;
  };

export type LayoutConfigByDevice = {
  mobile: LayoutConfig;
  tablet: LayoutConfig;
  desktop: LayoutConfig;
};

export type EpgDateTimeHeaderBaseProps = HourWidth &
  ChannelColumnWidth &
  GlobalEarliestStart &
  ContainerRef;
