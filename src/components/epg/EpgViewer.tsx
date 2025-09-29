import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { now } from "@/utils/time/now/now";

import EpgChannelTile from "./timeline/EpgChannelTile";
import EpgChannelTimeline from "./timeline/EpgChannelTimeline";

import type { EpgChannel } from "@/types/egp.types";

const LAYOUT_CONFIG = {
  mobile: {
    hourWidth: 120, // Width for a full hour, each 30-min block is half
    rowHeight: 64, // Increased vertical space for "pill" style
    channelColumnWidth: 96,
    visibleHours: 2, // Show 2 hours on mobile
  },
  tablet: {
    hourWidth: 160,
    rowHeight: 68,
    channelColumnWidth: 128,
    visibleHours: 1, // Show 1 hour on tablet
  },
  desktop: {
    hourWidth: 200,
    rowHeight: 72,
    channelColumnWidth: 160,
    visibleHours: 3, // Show 3 hours on desktop
  },
};
const TABLET_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;

type EPGProps = { channels: EpgChannel[] };

const EpgViewer: React.FC<EPGProps> = ({ channels }) => {
  const [layout, setLayout] = useState(LAYOUT_CONFIG.mobile);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        setLayout(LAYOUT_CONFIG.desktop);
      } else if (window.innerWidth >= TABLET_BREAKPOINT) {
        setLayout(LAYOUT_CONFIG.tablet);
      } else {
        setLayout(LAYOUT_CONFIG.mobile);
      }
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

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
      (totalMinutes / 60) * layout.hourWidth + layout.channelColumnWidth,
      400
    );
  };

  const handleProgramSelect = (programId: string) => {
    setSelectedProgram(programId);

    // Auto-scroll to the beginning of the selected program
    const programElement = document.querySelector(
      `[data-program-id="${programId}"]`
    );
    if (programElement && containerRef.current) {
      const rect = programElement.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      // Calculate scroll position accounting for channel tile width
      // Program should align with the start of the timeline area (after channel column)
      const scrollLeft =
        containerRef.current.scrollLeft +
        rect.left -
        containerRect.left -
        layout.channelColumnWidth;

      containerRef.current.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: "smooth",
      });
    }
  };

  const rowVirtualizer = useVirtualizer({
    count: channels.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => layout.rowHeight,
    overscan: 4,
  });

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-gray-200 font-sans select-none">
      <div
        ref={containerRef}
        className="flex-1 overflow-auto relative scrollbar-hide"
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
                className="flex absolute top-0 left-0 gap-2 py-1"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  width: "100%",
                }}
              >
                <EpgChannelTile
                  channel={channel}
                  style={{ width: `${layout.channelColumnWidth}px` }}
                />
                <div className="w-full">
                  <EpgChannelTimeline
                    schedules={channel.schedules}
                    hourWidth={layout.hourWidth}
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
