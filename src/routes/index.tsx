import { createFileRoute } from "@tanstack/react-router";

import DesignSystemExample from "@/components/examples/DesignSystemExample";

import { epgQueries } from "@/api/epg-service/epg-queries";

const EPGPage = () => {
  return <DesignSystemExample />;
};

export const Route = createFileRoute("/")({
  component: EPGPage,
  loader: ({ context }) => {
    void context.queryClient.ensureQueryData(epgQueries.getEpgData());
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
