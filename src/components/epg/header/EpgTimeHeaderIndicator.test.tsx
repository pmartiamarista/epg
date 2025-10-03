import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import EpgTimeHeaderIndicator from "./EpgTimeHeaderIndicator";

describe("EpgTimeHeaderIndicator", () => {
  it("renders formatted time", () => {
    render(
      <EpgTimeHeaderIndicator
        time={new Date(1609459200000)}
        left={0}
        width={100}
      />
    );
    expect(screen.getByText(/\d{2}:\d{2}/)).toBeInTheDocument();
  });

  it("applies correct positioning styles", () => {
    const { container } = render(
      <EpgTimeHeaderIndicator
        time={new Date(1609459200000)}
        left={50}
        width={150}
      />
    );
    const element = container.firstChild as HTMLElement;
    expect(element.style.left).toBe("50px");
    expect(element.style.width).toBe("150px");
  });

  it("has absolute positioning class", () => {
    const { container } = render(
      <EpgTimeHeaderIndicator
        time={new Date(1609459200000)}
        left={0}
        width={100}
      />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("absolute");
  });
});
