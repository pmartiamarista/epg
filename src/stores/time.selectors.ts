import type { TimeStoreState } from "./timeStore";

/**
 * Selector for current time from time store
 */
export const currentTimeSelector = (state: TimeStoreState) => state.currentTime;
