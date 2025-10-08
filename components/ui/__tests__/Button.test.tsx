import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "@/components/ui/Button";

describe("Button Component", () => {
  it("should render button with text", () => {
    render(<Button data-test="test-button">Click me</Button>);
    const button = screen.getByText("Click me");
    expect(button).toBeInTheDocument();
  });

  it("should handle click events", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Button data-test="test-button" onClick={handleClick}>
        Click me
      </Button>
    );

    const button = screen.getByText("Click me");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render with default variant", () => {
    render(<Button data-test="test-button">Default</Button>);
    const button = screen.getByText("Default");
    expect(button).toHaveClass("bg-primary");
  });

  it("should render with destructive variant", () => {
    render(
      <Button data-test="test-button" variant="destructive">
        Delete
      </Button>
    );
    const button = screen.getByText("Delete");
    expect(button).toHaveClass("bg-destructive");
  });

  it("should render with outline variant", () => {
    render(
      <Button data-test="test-button" variant="outline">
        Outline
      </Button>
    );
    const button = screen.getByText("Outline");
    expect(button).toHaveClass("border");
  });

  it("should render with different sizes", () => {
    const { rerender } = render(
      <Button data-test="test-button" size="sm">
        Small
      </Button>
    );
    let button = screen.getByText("Small");
    expect(button).toHaveClass("h-8");

    rerender(
      <Button data-test="test-button" size="lg">
        Large
      </Button>
    );
    button = screen.getByText("Large");
    expect(button).toHaveClass("h-10");
  });

  it("should be disabled when disabled prop is true", () => {
    render(
      <Button data-test="test-button" disabled>
        Disabled
      </Button>
    );
    const button = screen.getByText("Disabled");
    expect(button).toBeDisabled();
  });

  it("should not trigger click when disabled", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Button data-test="test-button" onClick={handleClick} disabled>
        Disabled
      </Button>
    );

    const button = screen.getByText("Disabled");
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should merge custom className", () => {
    render(
      <Button data-test="test-button" className="custom-class">
        Custom
      </Button>
    );
    const button = screen.getByText("Custom");
    expect(button).toHaveClass("custom-class");
  });

  it("should have data-test attribute", () => {
    render(<Button data-test="my-button">Test</Button>);
    const button = screen.getByText("Test");
    expect(button).toHaveAttribute("data-test", "my-button");
  });

  it("should have data-slot attribute", () => {
    render(<Button data-test="test-button">Test</Button>);
    const button = screen.getByText("Test");
    expect(button).toHaveAttribute("data-slot", "button");
  });
});
