import { create } from "zustand";

import { layoutConfig } from "@/constants/layout";
import now from "@/utils/time/now/now";

export interface TimeStoreState {
  currentTime: Date;
}

/**
 * Global time store using Zustand with date-fns
 * Updates current time every 30 seconds
 */
export const useTimeStore = create<TimeStoreState>(() => ({
  currentTime: now(),
}));

setInterval(() => {
  useTimeStore.setState({ currentTime: now() });
}, layoutConfig.updateInterval);
