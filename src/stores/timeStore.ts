import type { Dayjs } from "dayjs";
import { create } from "zustand";

import { layoutConfig } from "@/constants/layout";
import now from "@/utils/time/now/now";

export interface TimeStoreState {
  currentTime: Dayjs;
}

/**
 * Global time store using Zustand
 * Updates current time every 30 seconds
 */
export const useTimeStore = create<TimeStoreState>(() => ({
  currentTime: now(),
}));

setInterval(() => {
  useTimeStore.setState({ currentTime: now() });
}, layoutConfig.updateInterval);
