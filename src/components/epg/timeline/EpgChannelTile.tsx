import React, { type FC, memo } from "react";

import Card from "../../card/Card";

import type { EpgGridCell } from "@/types/egp.types";

interface EpgChannelTileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<EpgGridCell, "channel"> {}

const EpgChannelTile: FC<EpgChannelTileProps> = ({ channel, ...props }) => {
  return (
    <Card
      className="sticky left-0 z-20 flex items-center justify-center"
      {...props}
    >
      <span className="font-bold text-sm sm:text-base truncate">
        {channel.title}
      </span>
    </Card>
  );
};

export default memo(EpgChannelTile);
