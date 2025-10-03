import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { createMockProgram } from "@/test/mocks/epg.mocks";

import EpgChannelTimelineTileProgressBar from "./EpgChannelTimelineTileProgressBar";

const mockProgram = createMockProgram({
  start: Date.now() - 1800000,
  end: Date.now() + 1800000,
});

describe("EpgChannelTimelineTileProgressBar", () => {
  it("renders progress bar container", () => {
    const { container } = render(
      <EpgChannelTimelineTileProgressBar program={mockProgram} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("has yellow accent color", () => {
    const { container } = render(
      <EpgChannelTimelineTileProgressBar program={mockProgram} />
    );
    const progressBar = container.querySelector(".bg-accent-yellow");
    expect(progressBar).toBeInTheDocument();
  });

  it("has transition animation", () => {
    const { container } = render(
      <EpgChannelTimelineTileProgressBar program={mockProgram} />
    );
    const progressBar = container.querySelector(".transition-all");
    expect(progressBar).toBeInTheDocument();
  });
});
