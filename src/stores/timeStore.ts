import type { Dayjs } from "dayjs";
import { create } from "zustand";

import { now } from "@/utils/time/now/now";

export interface TimeStoreState {
  currentTime: Dayjs;
}

export const useTimeStore = create<TimeStoreState>(() => ({
  currentTime: now(),
}));

setInterval(() => {
  useTimeStore.setState({ currentTime: now() });
}, 60000);
