import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";

import { now } from "@/utils/time/now/now";

import EpgChannelTile from "./timeline/EpgChannelTile";
import EpgChannelTimeline from "./timeline/EpgChannelTimeline";

import type { EpgChannel } from "@/types/egp.types";

const LAYOUT_CONFIG = {
  mobile: {
    hourWidth: 120,
    rowHeight: 64,
    channelColumnWidth: 96,
  },
  tablet: {
    hourWidth: 160,
    rowHeight: 68,
    channelColumnWidth: 128,
  },
  desktop: {
    hourWidth: 200,
    rowHeight: 72,
    channelColumnWidth: 160,
  },
};

const TABLET_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;

type EPGProps = { channels: EpgChannel[] };

const EpgViewer: React.FC<EPGProps> = ({ channels }) => {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef(LAYOUT_CONFIG.mobile);

  // Calculate global earliest start time across all channels
  const globalEarliestStart = useMemo(() => {
    let earliestStart = Infinity;
    channels.forEach(channel => {
      channel.schedules?.forEach(program => {
        const start = new Date(program.start).getTime();
        earliestStart = Math.min(earliestStart, start);
      });
    });
    return earliestStart === Infinity
      ? now().startOf("day").valueOf()
      : earliestStart;
  }, [channels]);

  const calculateTimelineWidth = () => {
    let latestEnd = -Infinity;

    channels.forEach(channel => {
      channel.schedules?.forEach(program => {
        const end = new Date(program.end).getTime();
        latestEnd = Math.max(latestEnd, end);
      });
    });

    if (latestEnd === -Infinity) {
      return 400;
    }

    const totalMinutes = (latestEnd - globalEarliestStart) / 60000;
    return Math.max(
      (totalMinutes / 60) * layoutRef.current.hourWidth +
        layoutRef.current.channelColumnWidth,
      400
    );
  };

  const handleProgramSelect = (programId: string) => {
    setSelectedProgram(programId);

    const programElement = document.querySelector(
      `[data-program-id="${programId}"]`
    );
    if (programElement && containerRef.current) {
      const rect = programElement.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const scrollLeft =
        containerRef.current.scrollLeft +
        rect.left -
        containerRect.left -
        layoutRef.current.channelColumnWidth;

      const scrollTop =
        containerRef.current.scrollTop + rect.top - containerRect.top;

      containerRef.current.scrollTo({
        left: Math.max(0, scrollLeft),
        top: Math.max(0, scrollTop),
        behavior: "smooth",
      });
    }
  };

  const rowVirtualizer = useVirtualizer({
    count: channels.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => layoutRef.current.rowHeight,
    overscan: 4,
  });

  useLayoutEffect(() => {
    const checkSize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        layoutRef.current = LAYOUT_CONFIG.desktop;
      } else if (window.innerWidth >= TABLET_BREAKPOINT) {
        layoutRef.current = LAYOUT_CONFIG.tablet;
      } else {
        layoutRef.current = LAYOUT_CONFIG.mobile;
      }
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col  text-text-primary font-sans select-none">
      <div
        ref={containerRef}
        className="flex-1 overflow-auto relative scrollbar-hide "
      >
        <div
          className="relative"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: `${calculateTimelineWidth()}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const channel = channels[virtualRow.index];
            if (!channel) return null;
            return (
              <div
                key={virtualRow.key}
                className="flex absolute top-0 left-0 gap-2 bg-bg-primary"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  width: "100%",
                }}
              >
                <EpgChannelTile
                  channel={channel}
                  style={{ width: `${layoutRef.current.channelColumnWidth}px` }}
                />
                <div className="w-full">
                  <EpgChannelTimeline
                    schedules={channel.schedules}
                    hourWidth={layoutRef.current.hourWidth}
                    selectedProgram={selectedProgram}
                    globalEarliestStart={globalEarliestStart}
                    onClick={handleProgramSelect}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EpgViewer;
