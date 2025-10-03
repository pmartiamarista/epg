import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { createMockSchedules } from "@/test/mocks/epg.mocks";

import EpgChannelTimeline from "./EpgChannelTimeline";

const mockSchedules = createMockSchedules(2);

describe("EpgChannelTimeline", () => {
  it("renders timeline container", () => {
    const { container } = render(
      <EpgChannelTimeline
        schedules={mockSchedules}
        hourWidth={100}
        globalEarliestStart={1609459200000}
        totalWidth={1000}
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("has relative positioning", () => {
    const { container } = render(
      <EpgChannelTimeline
        schedules={mockSchedules}
        hourWidth={100}
        globalEarliestStart={1609459200000}
        totalWidth={1000}
      />
    );
    const timeline = container.firstChild as HTMLElement;
    expect(timeline).toHaveClass("relative");
  });

  it("applies correct width", () => {
    const { container } = render(
      <EpgChannelTimeline
        schedules={mockSchedules}
        hourWidth={100}
        globalEarliestStart={1609459200000}
        totalWidth={1200}
      />
    );
    const timeline = container.firstChild as HTMLElement;
    expect(timeline.style.width).toBe("1200px");
  });
});
