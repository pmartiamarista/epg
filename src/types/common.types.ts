import type React from "react";

/**
 * Represents a base entity with an ID
 * @property id - Unique identifier for the entity
 */
export interface BaseEntity {
  id: string;
}

/**
 * Represents the status of a program being now playing
 * @property isNowPlaying - Boolean indicating if the program is now playing
 */
export type IsNowPlaying = {
  isNowPlaying: boolean;
};

/**
 * Represents the width of an hour in the EPG timeline
 * @property hourWidth - Width in pixels
 */
export type HourWidth = {
  hourWidth: number;
};

/**
 * Represents the width of the channel column in the EPG timeline
 * @property channelColumnWidth - Width in pixels
 */
export type ChannelColumnWidth = {
  channelColumnWidth: number;
};

/**
 * Represents the height of a row in the EPG timeline
 * @property rowHeight - Height in pixels
 */
export type RowHeight = {
  rowHeight: number;
};

/**
 * Represents the total width of the EPG timeline
 * @property totalWidth - Width in pixels
 */
export type TotalWidth = {
  totalWidth: number;
};

/**
 * Represents the earliest start time across all programs in the EPG
 * @property globalEarliestStart - Unix timestamp of the earliest program start time
 */
export type GlobalEarliestStart = {
  globalEarliestStart: number;
};

/**
 * Represents the latest end time across all programs in the EPG
 * @property globalLatestEnd - Unix timestamp of the latest program end time
 */
export type GlobalLatestEnd = {
  globalLatestEnd: number;
};

/**
 * Represents a time interval with its corresponding left position
 * @property time - Date object representing the time
 * @property left - Left position in pixels
 */
export interface TimeIntervalConfig {
  time: Date;
  left: number;
}

/**
 * Represents the scroll position of the EPG timeline
 * @property scrollLeft - Left scroll position in pixels
 * @property containerWidth - Width of the container in pixels
 */
export interface ScrollPosition {
  scrollLeft: number;
  containerWidth: number;
}

/**
 * Represents the reference to the scroll container of the EPG timeline
 * @property scrollContainerRef - Reference to the scroll container
 */
export interface ScrollContainerRef {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}
