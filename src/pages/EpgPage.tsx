import { useSuspenseQuery } from "@tanstack/react-query";

import EpgViewer from "@/components/epg/EpgViewer";

import { epgQueries } from "@/api/epg-service/epg-queries";
import { prepareChannelSchedules } from "@/utils/prepareChannelSchedules/prepareChannelSchedules";

const EpgPage = () => {
  const { data } = useSuspenseQuery(epgQueries.getEpgData());
  const channels = prepareChannelSchedules(data);

  return <EpgViewer channels={channels} />;
};

export default EpgPage;
