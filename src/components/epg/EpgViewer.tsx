import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useEffect, useMemo, useRef, useState } from "react";

import NowIndicatorLine from "./NowIndicatorLine";
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

const isToday = (date: Date | null): boolean => {
  if (!date) return false;
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

type EPGProps = { channels: EpgChannel[] };

const EpgViewer: React.FC<EPGProps> = ({ channels }) => {
  const [days, setDays] = useState<Date[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [now, setNow] = useState(new Date());
  const [layout, setLayout] = useState(LAYOUT_CONFIG.mobile);

  const [visibleTimeRange, setVisibleTimeRange] = useState<{
    start: number;
    end: number;
  }>({ start: 0, end: 24 });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const uniqueDays = new Set<string>();
    channels.forEach(ch =>
      ch.schedules?.forEach(p =>
        uniqueDays.add(new Date(p.start).toDateString())
      )
    );
    const generatedDays = Array.from(uniqueDays)
      .map(d => new Date(d))
      .sort((a, b) => a.getTime() - b.getTime());
    setDays(generatedDays);

    const todayInList = generatedDays.find(
      d => d.toDateString() === new Date().toDateString()
    );
    setSelectedDay(
      todayInList || (generatedDays.length > 0 ? generatedDays[0] : null)
    );

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
  }, [channels]);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredChannels = useMemo(() => {
    if (!selectedDay || !channels) return [];
    const selectedDateStr = selectedDay.toDateString();
    return channels
      .map(c => ({
        ...c,
        schedules: c.schedules.filter(
          p => new Date(p.start).toDateString() === selectedDateStr
        ),
      }))
      .filter(c => c.schedules.length > 0);
  }, [selectedDay, channels]);

  const rowVirtualizer = useVirtualizer({
    count: filteredChannels.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => layout.rowHeight,
    overscan: 4,
  });

  // Update visible time range based on scroll position
  useEffect(() => {
    const mainContent = containerRef.current;
    if (!mainContent) return;

    const updateVisibleTimeRange = () => {
      const scrollLeft = mainContent.scrollLeft;
      const containerWidth = mainContent.clientWidth;
      const channelColumnWidth = layout.channelColumnWidth;

      // Calculate which time slots are visible based on scroll position
      const visibleStart = Math.floor(
        (scrollLeft / (layout.hourWidth / 2)) * 0.5
      ); // 0.5 because 30min intervals
      const visibleEnd = Math.ceil(
        ((scrollLeft + containerWidth - channelColumnWidth) /
          (layout.hourWidth / 2)) *
          0.5
      );

      // Limit to the configured number of visible hours
      const maxVisibleHours = layout.visibleHours;
      const centerHour = Math.floor((visibleStart + visibleEnd) / 2);
      const startHour = Math.max(
        0,
        centerHour - Math.floor(maxVisibleHours / 2)
      );
      const endHour = Math.min(24, startHour + maxVisibleHours);

      setVisibleTimeRange({
        start: startHour,
        end: endHour,
      });
    };

    updateVisibleTimeRange(); // Initial calculation
    mainContent.addEventListener("scroll", updateVisibleTimeRange);

    return () => {
      mainContent.removeEventListener("scroll", updateVisibleTimeRange);
    };
  }, [layout.hourWidth, layout.channelColumnWidth, layout.visibleHours]);

  if (!selectedDay) {
    return (
      <div className="h-screen w-screen bg-gray-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const dayStartTimestamp = new Date(selectedDay).setHours(0, 0, 0, 0);
  const nowLineOffset = isToday(selectedDay)
    ? ((now.getTime() - dayStartTimestamp) / 3600000) * layout.hourWidth
    : -1;

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-gray-200 font-sans select-none">
      <header className="flex-shrink-0 bg-gray-800 shadow-md">
        <div className="flex overflow-x-auto scrollbar-hide p-2 space-x-2">
          {days.map(day => (
            <button
              key={day.toISOString()}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${selectedDay.toDateString() === day.toDateString() ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-600 text-gray-300"}`}
            >
              {isToday(day)
                ? "Today"
                : day.toLocaleDateString("en-US", { weekday: "short" })}
              <span className="ml-1.5 font-normal">
                {day.toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                })}
              </span>
            </button>
          ))}
        </div>
      </header>

      {/* Hour Header Row - 30 minute intervals */}
      <div className="flex-shrink-0 bg-gray-800">
        <div className="flex w-full">
          {/* Left padding to align with channel column */}
          <div
            className="bg-gray-800 flex-shrink-0"
            style={{ width: `${layout.channelColumnWidth}px` }}
          />
          {/* Hour markers - only visible time range, full width */}
          <div className="flex flex-1">
            {Array.from(
              { length: visibleTimeRange.end - visibleTimeRange.start },
              (_, i) => {
                const hour = visibleTimeRange.start + i;

                return (
                  <div
                    key={hour}
                    className="flex items-center justify-center text-xs sm:text-sm bg-gray-800/80 backdrop-blur-sm"
                    style={{
                      width: `${100 / (visibleTimeRange.end - visibleTimeRange.start)}%`,
                    }}
                  >
                    {`${hour.toString().padStart(2, "0")}:00`}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      <main ref={containerRef} className="flex-1 overflow-auto relative">
        {/* Main content area for programs. Width is set for horizontal scrolling. */}
        <div
          className="relative"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: `${layout.hourWidth * 48 + layout.channelColumnWidth}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const channel = filteredChannels[virtualRow.index];
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
                    dayStartTimestamp={dayStartTimestamp}
                    hourWidth={layout.hourWidth}
                    now={now}
                    onClick={() => {}}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* "Now" Indicator Line */}
        {nowLineOffset > -1 && (
          <NowIndicatorLine
            style={{ left: `${nowLineOffset + layout.channelColumnWidth}px` }}
          />
        )}
      </main>
    </div>
  );
};

export default EpgViewer;
