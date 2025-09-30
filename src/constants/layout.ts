import type { LayoutConfigByDevice } from "@/types/components.type";

export const layoutConfigByDevice: LayoutConfigByDevice = {
  mobile: {
    hourWidth: 120,
    rowHeight: 64,
    channelColumnWidth: 96,
  },
  tablet: {
    hourWidth: 160,
    rowHeight: 68,
    channelColumnWidth: 128,
  },
  desktop: {
    hourWidth: 200,
    rowHeight: 72,
    channelColumnWidth: 160,
  },
};

export const TABLET_BREAKPOINT = 768;
export const DESKTOP_BREAKPOINT = 1024;
