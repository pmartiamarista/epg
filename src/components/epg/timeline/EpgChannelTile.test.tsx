import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { createMockChannel } from "@/test/mocks/epg.mocks";

import EpgChannelTile from "./EpgChannelTile";

const mockChannel = createMockChannel();

describe("EpgChannelTile", () => {
  it("renders channel title", () => {
    render(<EpgChannelTile channel={mockChannel} />);
    expect(screen.getByText("Test Channel")).toBeInTheDocument();
  });

  it("renders channel logo image", () => {
    render(<EpgChannelTile channel={mockChannel} />);
    const img = screen.getByAltText("Test Channel");
    expect(img).toBeInTheDocument();
  });

  it("has gradient overlay", () => {
    const { container } = render(<EpgChannelTile channel={mockChannel} />);
    const gradient = container.querySelector(".bg-gradient-to-t");
    expect(gradient).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <EpgChannelTile channel={mockChannel} className="custom-tile" />
    );
    const card = container.querySelector(".custom-tile");
    expect(card).toBeInTheDocument();
  });
});
