import React, { type FC, memo } from "react";

import Body from "@/components/typography/body/Body";

import Card from "../../card/Card";

import type { EpgGridCell } from "@/types/egp.types";

interface EpgChannelTileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<EpgGridCell, "channel"> {}

const EpgChannelTile: FC<EpgChannelTileProps> = ({ channel, ...props }) => {
  return (
    <Card
      className="bg-bg-secondary sticky left-0 z-20 flex items-center justify-center p-1 shrink-0 grow-0 border border-border-primary"
      {...props}
    >
      <Body className="truncate" weight="bold" size="sm">
        {channel.title}
      </Body>
    </Card>
  );
};

export default memo(EpgChannelTile);
