import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import EpgViewer from "@/components/epg/EpgViewer";

import { epgQueries } from "@/api/epg-service/epg-queries";
import { fixOvernightSchedules } from "@/utils/time/fixOvernightSchedules/fixOvernightSchedules";

const EPGPage = () => {
  const { data } = useSuspenseQuery(epgQueries.getEpgData());

  const channels = fixOvernightSchedules(data);

  return <EpgViewer channels={channels} />;
};

export const Route = createFileRoute("/")({
  component: EPGPage,
  loader: async ({ context: { queryClient } }) => {
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
