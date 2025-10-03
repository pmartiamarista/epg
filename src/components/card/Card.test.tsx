import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Card from "./Card";

describe("Card", () => {
  it("renders with children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies default classes", () => {
    render(<Card>Test</Card>);
    const card = screen.getByText("Test");
    expect(card).toHaveClass("bg-bg-secondary", "p-4");
  });

  it("applies custom className", () => {
    render(<Card className="custom-card">Test</Card>);
    const card = screen.getByText("Test");
    expect(card).toHaveClass("custom-card");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Card ref={ref}>Test</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
