import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Button from "./Button";

describe("Button", () => {
  it("renders with children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    render(<Button variant="yellow">Test</Button>);
    const button = screen.getByText("Test");
    expect(button).toHaveClass("btn-yellow");
  });

  it("applies size classes", () => {
    render(<Button size="lg">Test</Button>);
    const button = screen.getByText("Test");
    expect(button).toHaveClass("btn-lg");
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Test</Button>);
    const button = screen.getByText("Test");
    expect(button).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Button ref={ref}>Test</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
