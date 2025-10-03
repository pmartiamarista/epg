import { createFileRoute } from "@tanstack/react-router";

import EpgPage from "@/pages/EpgPage";

export const Route = createFileRoute("/")({
  component: EpgPage,
  loader: async ({ context: { queryClient } }) => {
    const { epgQueries } = await import("@/api/epg-service/epg-queries");
    return queryClient.ensureQueryData(epgQueries.getEpgData());
  },
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "Browse current and upcoming TV programs with real-time updates and interactive EPG grid",
      },
      {
        name: "keywords",
        content:
          "EPG guide, TV schedule, live TV, program guide, channels, now playing",
      },
    ],
    title: "EPG Guide - Browse TV Channels",
  }),
});
