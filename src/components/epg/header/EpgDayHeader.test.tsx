import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import EpgDayHeader from "./EpgDayHeader";

describe("EpgDayHeader", () => {
  const mockRef = { current: document.createElement("div") };

  it("renders day header indicator", () => {
    render(
      <EpgDayHeader
        globalEarliestStart={1609459200000}
        scrollContainerRef={mockRef}
        channelColumnWidth={120}
        hourWidth={100}
      />
    );
    expect(screen.getByText(/\w{3}, \d{2} \w{3}/)).toBeInTheDocument();
  });

  it("displays formatted day text", () => {
    render(
      <EpgDayHeader
        globalEarliestStart={1609459200000}
        scrollContainerRef={mockRef}
        channelColumnWidth={120}
        hourWidth={100}
      />
    );
    const dayText = screen.getByText(/\w{3}, \d{2} \w{3}/);
    expect(dayText).toBeInTheDocument();
  });
});
