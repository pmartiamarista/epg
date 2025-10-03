import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import EpgTimeHeader from "./EpgTimeHeader";

describe("EpgTimeHeader", () => {
  const mockRef = { current: document.createElement("div") };

  it("renders with sticky positioning", () => {
    const { container } = render(
      <EpgTimeHeader
        globalEarliestStart={1609459200000}
        globalLatestEnd={1609545600000}
        hourWidth={100}
        channelColumnWidth={120}
        totalWidth={1000}
        scrollContainerRef={mockRef}
      />
    );
    const header = container.querySelector(".sticky");
    expect(header).toBeInTheDocument();
  });

  it("applies total width style", () => {
    const { container } = render(
      <EpgTimeHeader
        globalEarliestStart={1609459200000}
        globalLatestEnd={1609545600000}
        hourWidth={100}
        channelColumnWidth={120}
        totalWidth={1200}
        scrollContainerRef={mockRef}
      />
    );
    const header = container.firstChild as HTMLElement;
    expect(header.style.width).toBe("1200px");
  });
});
