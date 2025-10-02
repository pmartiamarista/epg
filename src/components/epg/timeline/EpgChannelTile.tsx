import React, { type FC, memo } from "react";
import { twMerge } from "tailwind-merge";

import Body from "@/components/typography/body/Body";

import Card from "../../card/Card";

import type { EpgGridCell } from "@/types/egp.types";

interface EpgChannelTileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<EpgGridCell, "channel"> {}

const EpgChannelTile: FC<EpgChannelTileProps> = ({
  channel,
  className,
  ...props
}) => {
  const styles = twMerge(
    "w-3 h-full bg-bg-secondary flex items-center justify-center p-1 border border-border-primary",
    "shrink-0 grow-0",
    className
  );

  return (
    <Card className={styles} {...props}>
      <Body className="truncate" weight="bold" size="sm">
        {channel.title}
      </Body>
    </Card>
  );
};

export default memo(EpgChannelTile);
