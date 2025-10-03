import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import EpgDayHeaderIndicator from "./EpgDayHeaderIndicator";

describe("EpgDayHeaderIndicator", () => {
  it("renders formatted day", () => {
    const timestamp = 1609459200000;
    render(<EpgDayHeaderIndicator currentDay={timestamp} />);
    expect(screen.getByText(/\w{3}, \d{2} \w{3}/)).toBeInTheDocument();
  });

  it("has background and border classes", () => {
    const { container } = render(
      <EpgDayHeaderIndicator currentDay={1609459200000} />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("bg-bg-secondary", "border-b");
  });
});
