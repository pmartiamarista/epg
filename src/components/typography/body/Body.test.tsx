import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Body from "./Body";

describe("Body Component", () => {
  it("renders with default props", () => {
    render(<Body>Default body text</Body>);

    const bodyElement = screen.getByText("Default body text");
    expect(bodyElement).toBeInTheDocument();
    expect(bodyElement.tagName).toBe("P");
    expect(bodyElement).toHaveClass("body-md");
    expect(bodyElement).toHaveClass("font-normal");
  });

  it("renders with different size variants", () => {
    const { rerender } = render(<Body size="xs">Extra small text</Body>);
    expect(screen.getByText("Extra small text")).toHaveClass("body-xs");

    rerender(<Body size="sm">Small text</Body>);
    expect(screen.getByText("Small text")).toHaveClass("body-sm");

    rerender(<Body size="md">Medium text</Body>);
    expect(screen.getByText("Medium text")).toHaveClass("body-md");

    rerender(<Body size="lg">Large text</Body>);
    expect(screen.getByText("Large text")).toHaveClass("body-lg");

    rerender(<Body size="xl">Extra large text</Body>);
    expect(screen.getByText("Extra large text")).toHaveClass("body-lg");
  });

  it("renders with different weight variants", () => {
    const { rerender } = render(<Body weight="light">Light text</Body>);
    expect(screen.getByText("Light text")).toHaveClass("font-light");

    rerender(<Body weight="normal">Normal text</Body>);
    expect(screen.getByText("Normal text")).toHaveClass("font-normal");

    rerender(<Body weight="medium">Medium text</Body>);
    expect(screen.getByText("Medium text")).toHaveClass("font-medium");

    rerender(<Body weight="semibold">Semibold text</Body>);
    expect(screen.getByText("Semibold text")).toHaveClass("font-semibold");

    rerender(<Body weight="bold">Bold text</Body>);
    expect(screen.getByText("Bold text")).toHaveClass("font-bold");
  });

  it("applies custom className", () => {
    render(
      <Body className="text-center text-blue-500">Custom styled text</Body>
    );

    const bodyElement = screen.getByText("Custom styled text");
    expect(bodyElement).toHaveClass("body-md");
    expect(bodyElement).toHaveClass("font-normal");
    expect(bodyElement).toHaveClass("text-center");
    expect(bodyElement).toHaveClass("text-blue-500");
  });

  it("combines size, weight, and custom className", () => {
    render(
      <Body size="lg" weight="bold" className="text-center text-accent-blue">
        Combined styling text
      </Body>
    );

    const bodyElement = screen.getByText("Combined styling text");
    expect(bodyElement).toHaveClass("body-lg");
    expect(bodyElement).toHaveClass("font-bold");
    expect(bodyElement).toHaveClass("text-center");
    expect(bodyElement).toHaveClass("text-accent-blue");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Body ref={ref}>Ref test text</Body>);

    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    expect(ref.current).toHaveTextContent("Ref test text");
  });

  it("passes through additional HTML attributes", () => {
    render(
      <Body
        data-testid="body-element"
        id="test-body"
        role="text"
        aria-label="Test body text"
      >
        Text with attributes
      </Body>
    );

    const bodyElement = screen.getByTestId("body-element");
    expect(bodyElement).toHaveAttribute("id", "test-body");
    expect(bodyElement).toHaveAttribute("role", "text");
    expect(bodyElement).toHaveAttribute("aria-label", "Test body text");
  });

  it("renders with complex children", () => {
    render(
      <Body>
        Text with <strong>bold</strong> and <em>italic</em> content
      </Body>
    );

    const bodyElement = screen.getByRole("paragraph");

    expect(bodyElement).toBeInTheDocument();
    expect(bodyElement).toHaveTextContent("Text with bold and italic content");
    expect(bodyElement.querySelector("strong")).toHaveTextContent("bold");
    expect(bodyElement.querySelector("em")).toHaveTextContent("italic");
  });

  it("handles empty children", () => {
    render(<Body></Body>);

    const bodyElement = screen.getByRole("paragraph");
    expect(bodyElement).toBeInTheDocument();
    expect(bodyElement).toHaveTextContent("");
  });

  it("merges classes correctly with twMerge", () => {
    render(
      <Body className="font-bold text-center" weight="light">
        Class merging test
      </Body>
    );

    const bodyElement = screen.getByText("Class merging test");
    // twMerge should resolve conflicts - weight="light" should override font-bold
    expect(bodyElement).toHaveClass("font-light");
    expect(bodyElement).toHaveClass("text-center");
    expect(bodyElement).not.toHaveClass("font-bold");
  });
});
