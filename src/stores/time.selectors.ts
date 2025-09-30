import type { TimeStoreState } from "./timeStore";

// Selector for current time
export const currentTimeSelector = (state: TimeStoreState) => state.currentTime;
