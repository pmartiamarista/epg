import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Heading from "./Heading";

describe("Heading Component", () => {
  it("renders with default props", () => {
    render(<Heading>Default heading</Heading>);

    const headingElement = screen.getByText("Default heading");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe("H1");
    expect(headingElement).toHaveClass("font-normal");
  });

  it("renders with different heading levels", () => {
    const { rerender } = render(<Heading as="h1">H1 Heading</Heading>);
    expect(screen.getByText("H1 Heading").tagName).toBe("H1");

    rerender(<Heading as="h2">H2 Heading</Heading>);
    expect(screen.getByText("H2 Heading").tagName).toBe("H2");

    rerender(<Heading as="h3">H3 Heading</Heading>);
    expect(screen.getByText("H3 Heading").tagName).toBe("H3");

    rerender(<Heading as="h4">H4 Heading</Heading>);
    expect(screen.getByText("H4 Heading").tagName).toBe("H4");

    rerender(<Heading as="h5">H5 Heading</Heading>);
    expect(screen.getByText("H5 Heading").tagName).toBe("H5");

    rerender(<Heading as="h6">H6 Heading</Heading>);
    expect(screen.getByText("H6 Heading").tagName).toBe("H6");
  });

  it("renders with different weight variants", () => {
    const { rerender } = render(
      <Heading weight="light">Light heading</Heading>
    );
    expect(screen.getByText("Light heading")).toHaveClass("font-light");

    rerender(<Heading weight="normal">Normal heading</Heading>);
    expect(screen.getByText("Normal heading")).toHaveClass("font-normal");

    rerender(<Heading weight="medium">Medium heading</Heading>);
    expect(screen.getByText("Medium heading")).toHaveClass("font-medium");

    rerender(<Heading weight="semibold">Semibold heading</Heading>);
    expect(screen.getByText("Semibold heading")).toHaveClass("font-semibold");

    rerender(<Heading weight="bold">Bold heading</Heading>);
    expect(screen.getByText("Bold heading")).toHaveClass("font-bold");
  });

  it("applies custom className", () => {
    render(
      <Heading className="text-center text-blue-500">
        Custom styled heading
      </Heading>
    );

    const headingElement = screen.getByText("Custom styled heading");
    expect(headingElement).toHaveClass("font-normal");
    expect(headingElement).toHaveClass("text-center");
    expect(headingElement).toHaveClass("text-blue-500");
  });

  it("combines as, weight, and custom className", () => {
    render(
      <Heading as="h2" weight="bold" className="text-center text-accent-blue">
        Combined styling heading
      </Heading>
    );

    const headingElement = screen.getByText("Combined styling heading");
    expect(headingElement.tagName).toBe("H2");
    expect(headingElement).toHaveClass("font-bold");
    expect(headingElement).toHaveClass("text-center");
    expect(headingElement).toHaveClass("text-accent-blue");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Heading ref={ref}>Ref test heading</Heading>);

    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    expect(ref.current).toHaveTextContent("Ref test heading");
  });

  it("passes through additional HTML attributes", () => {
    render(
      <Heading
        as="h3"
        data-testid="heading-element"
        id="test-heading"
        role="heading"
        aria-level={3}
      >
        Heading with attributes
      </Heading>
    );

    const headingElement = screen.getByTestId("heading-element");
    expect(headingElement).toHaveAttribute("id", "test-heading");
    expect(headingElement).toHaveAttribute("role", "heading");
    expect(headingElement).toHaveAttribute("aria-level", "3");
  });

  it("renders with complex children", () => {
    render(
      <Heading>
        Heading with <strong>bold</strong> and <em>italic</em> content
      </Heading>
    );

    const headingElement = screen.getByRole("heading", { level: 1 });

    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent(
      "Heading with bold and italic content"
    );
    expect(headingElement.querySelector("strong")).toHaveTextContent("bold");
    expect(headingElement.querySelector("em")).toHaveTextContent("italic");
  });

  it("handles empty children", () => {
    render(<Heading></Heading>);

    const headingElement = screen.getByRole("heading", { level: 1 });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("");
  });

  it("merges classes correctly with twMerge", () => {
    render(
      <Heading className="font-bold text-center" weight="light">
        Class merging test
      </Heading>
    );

    const headingElement = screen.getByText("Class merging test");
    // twMerge should resolve conflicts - weight="light" should override font-bold
    expect(headingElement).toHaveClass("font-light");
    expect(headingElement).toHaveClass("text-center");
    expect(headingElement).not.toHaveClass("font-bold");
  });

  it("maintains semantic heading structure", () => {
    render(
      <div>
        <Heading as="h1">Main Title</Heading>
        <Heading as="h2">Section Title</Heading>
        <Heading as="h3">Subsection Title</Heading>
      </div>
    );

    const h1 = screen.getByRole("heading", { level: 1 });
    const h2 = screen.getByRole("heading", { level: 2 });
    const h3 = screen.getByRole("heading", { level: 3 });

    expect(h1).toHaveTextContent("Main Title");
    expect(h2).toHaveTextContent("Section Title");
    expect(h3).toHaveTextContent("Subsection Title");
  });

  it("works with different heading levels and weights", () => {
    const { rerender } = render(
      <Heading as="h1" weight="bold">
        Bold H1
      </Heading>
    );
    let heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("font-bold");

    rerender(
      <Heading as="h4" weight="light">
        Light H4
      </Heading>
    );
    heading = screen.getByRole("heading", { level: 4 });
    expect(heading).toHaveClass("font-light");

    rerender(
      <Heading as="h6" weight="semibold">
        Semibold H6
      </Heading>
    );
    heading = screen.getByRole("heading", { level: 6 });
    expect(heading).toHaveClass("font-semibold");
  });
});
