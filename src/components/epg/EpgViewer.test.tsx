import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { createMockChannel, createMockSchedules } from "@/test/mocks/epg.mocks";

import EpgViewer from "./EpgViewer";

describe("EpgViewer", () => {
  const mockChannels = [
    createMockChannel({
      id: "channel-1",
      title: "Channel 1",
      schedules: createMockSchedules(2),
    }),
    createMockChannel({
      id: "channel-2",
      title: "Channel 2",
      schedules: createMockSchedules(2),
    }),
  ];

  it("renders EPG container with aria-label", () => {
    render(<EpgViewer channels={mockChannels} />);
    const epg = screen.getByLabelText("Electronic Program Guide");
    expect(epg).toBeInTheDocument();
  });

  it("renders scrollable container", () => {
    const { container } = render(<EpgViewer channels={mockChannels} />);
    const scrollContainer = container.querySelector(".overflow-auto");
    expect(scrollContainer).toBeInTheDocument();
  });

  it("has border and rounded styling", () => {
    const { container } = render(<EpgViewer channels={mockChannels} />);
    const epg = container.querySelector(".border-border-primary");
    expect(epg).toHaveClass("rounded-lg");
  });

  it("renders with empty channels array", () => {
    render(<EpgViewer channels={[]} />);
    const epg = screen.getByLabelText("Electronic Program Guide");
    expect(epg).toBeInTheDocument();
  });
});
