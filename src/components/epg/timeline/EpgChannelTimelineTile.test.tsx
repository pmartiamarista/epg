import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { createMockProgram } from "@/test/mocks/epg.mocks";

import EpgChannelTimelineTile from "./EpgChannelTimelineTile";

const mockProgram = createMockProgram();

describe("EpgChannelTimelineTile", () => {
  it("renders program title", () => {
    render(<EpgChannelTimelineTile program={mockProgram} />);
    expect(screen.getByText("Test Program")).toBeInTheDocument();
  });

  it("renders time range", () => {
    render(<EpgChannelTimelineTile program={mockProgram} />);
    expect(screen.getByText(/\d{2}:\d{2} - \d{2}:\d{2}/)).toBeInTheDocument();
  });

  it("has button role for accessibility", () => {
    render(<EpgChannelTimelineTile program={mockProgram} role="button" />);
    const tile = screen.getByRole("button");
    expect(tile).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <EpgChannelTimelineTile program={mockProgram} className="custom-tile" />
    );
    expect(container.firstChild).toHaveClass("custom-tile");
  });
});
