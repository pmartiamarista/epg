import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CurrentTimeIndicator from "./CurrentTimeIndicator";

describe("CurrentTimeIndicator", () => {
  it("renders indicator element", () => {
    const { container } = render(
      <CurrentTimeIndicator globalEarliestStart={Date.now()} hourWidth={100} />
    );
    const indicator = container.querySelector(".bg-accent-yellow");
    expect(indicator).toBeInTheDocument();
  });

  it("has absolute positioning", () => {
    const { container } = render(
      <CurrentTimeIndicator globalEarliestStart={Date.now()} hourWidth={100} />
    );
    const indicator = container.firstChild as HTMLElement;
    expect(indicator).toHaveClass("absolute");
  });

  it("has pulse animation", () => {
    const { container } = render(
      <CurrentTimeIndicator globalEarliestStart={Date.now()} hourWidth={100} />
    );
    const indicator = container.firstChild as HTMLElement;
    expect(indicator).toHaveClass("animate-pulse");
  });
});
