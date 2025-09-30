import type React from "react";

export interface BaseEntity {
  id: string;
}

export type IsSelected = {
  isSelected: boolean;
};

export type IsNowPlaying = {
  isNowPlaying: boolean;
};

export type HourWidth = {
  hourWidth: number;
};

export type ChannelColumnWidth = {
  channelColumnWidth: number;
};

export type RowHeight = {
  rowHeight: number;
};

export type TotalWidth = {
  totalWidth: number;
};

export type GlobalEarliestStart = {
  globalEarliestStart: number;
};

export type GlobalLatestEnd = {
  globalLatestEnd: number;
};

export interface TimeIntervalConfig {
  time: Date;
  left: number;
}

export interface StartEndConfig {
  start: number;
  end: number;
}

export interface ScrollPosition {
  scrollLeft: number;
  containerWidth: number;
}

export interface ScrollContainerRef {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}
