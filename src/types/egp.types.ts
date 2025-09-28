// EPG (Electronic Program Guide) TypeScript Interfaces
// Generated from Norigin Media Mock API

import type { BaseEntity } from "./common.types";

/**
 * EPG Channel Response
 * Represents a channel with its program schedule
 */
export interface EpgChannel extends BaseEntity {
  /** Channel name (e.g., "Das Erste", "ZDF") */
  title: string;
  /** Channel logo and branding images */
  images: ChannelImages;
  /** Array of scheduled programs for this channel */
  schedules: ProgramSchedule[];
}

/**
 * Channel Images
 * Contains URLs for channel branding assets
 */
export interface ChannelImages {
  /** Channel logo URL */
  LOGO: string;
}

/**
 * Program Schedule Item
 * Represents a single program in the EPG schedule
 */
export interface ProgramSchedule {
  /** Program title */
  title: string;
  /** Program start time (Unix timestamp in milliseconds) */
  start: number;
  /** Program end time (Unix timestamp in milliseconds) */
  end: number;
}

/**
 * EPG API Response Type
 * The complete EPG response is an array of channels
 */
export type EpgResponse = EpgChannel[];

/**
 * Program Details Response
 * Extended program information when user selects a program
 */
export interface ProgramDetails {
  /** Program title */
  title: string;
  /** Program description */
  description: string;
  /** Program images (poster, thumbnail, etc.) */
  images: ProgramImages;
  /** Program start time (Unix timestamp in milliseconds) */
  start: number;
  /** Program end time (Unix timestamp in milliseconds) */
  end: number;
  /** Channel information */
  channelInfo: ChannelInfo;
  /** Unique program identifier */
  id: string;
}

/**
 * Program Images
 * Contains URLs for program visual assets
 */
export interface ProgramImages {
  /** Landscape header image for program */
  CarouselLandscapeHeader: string;
}

/**
 * Channel Information
 * Extended channel details for program context
 */
export interface ChannelInfo {
  /** Channel images */
  images: ChannelImages;
  /** Channel name */
  title: string;
  /** Channel identifier */
  channelId: string;
  /** Available terminals/devices for this channel */
  terminals: string[];
}

/**
 * Utility Types for EPG Components
 */

/**
 * Time slot for EPG grid display
 */
export interface TimeSlot {
  /** Start time */
  start: number;
  /** End time */
  end: number;
  /** Duration in minutes */
  duration: number;
}

/**
 * EPG Grid Cell
 * Represents a program cell in the EPG grid
 */
export interface EpgGridCell {
  /** Program information */
  program: ProgramSchedule;
  /** Channel information */
  channel: EpgChannel;
  /** Grid position */
  position: {
    row: number;
    column: number;
  };
  /** Cell dimensions */
  dimensions: {
    width: number;
    height: number;
  };
}

/**
 * EPG Filter Options
 * For filtering EPG content
 */
export interface EpgFilters {
  /** Filter by channel IDs */
  channelIds?: string[];
  /** Filter by time range */
  timeRange?: {
    start: number;
    end: number;
  };
  /** Filter by program title */
  title?: string;
  /** Filter by program type */
  type?: string;
}
