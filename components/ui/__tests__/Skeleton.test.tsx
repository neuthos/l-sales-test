import { render, screen } from "@testing-library/react";

import { Skeleton } from "@/components/ui/Skeleton";

describe("Skeleton Component", () => {
  it("should render skeleton element", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toBeInTheDocument();
  });

  it("should have correct default classes", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("bg-accent");
    expect(skeleton).toHaveClass("animate-pulse");
    expect(skeleton).toHaveClass("rounded-md");
  });

  it("should merge custom className", () => {
    render(<Skeleton className="h-12 w-full" data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("bg-accent");
    expect(skeleton).toHaveClass("h-12");
    expect(skeleton).toHaveClass("w-full");
  });

  it("should accept additional HTML attributes", () => {
    render(
      <Skeleton data-testid="skeleton" role="status" aria-label="Loading" />
    );
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveAttribute("role", "status");
    expect(skeleton).toHaveAttribute("aria-label", "Loading");
  });

  it("should have data-slot attribute", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveAttribute("data-slot", "skeleton");
  });
});
