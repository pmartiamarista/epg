import React, { type FC, memo } from "react";
import { twMerge } from "tailwind-merge";

import Image from "@/components/Image";
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
    "w-full h-full bg-bg-secondary flex items-center justify-center p-1 border border-border-primary",
    "shrink-0 grow-0",
    className
  );

  return (
    <Card className={styles} {...props}>
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={channel.images.LOGO}
          fallbackSrc="/tv-icon.svg"
          alt={channel.title}
          className="max-w-full max-h-full w-auto h-auto object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end pointer-events-none">
          <div className="w-full p-1">
            <Body
              size="xs"
              weight="semibold"
              className="text-white truncate leading-tight"
              aria-label={channel.title}
            >
              {channel.title}
            </Body>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default memo(EpgChannelTile);
