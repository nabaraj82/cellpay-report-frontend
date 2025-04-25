import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Button from "../src/components/common/Button";

describe("Button Component", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByText("Click Me");
    expect(button).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Button className="btn-custom">Test</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn-custom");
  });

  it("passes all other props to the button element", () => {
    const onClickMock = vi.fn();
    render(
      <Button data-testid="my-button" aria-label="Submit" onClick={onClickMock}>
        Test
      </Button>
    );

    const button = screen.getByTestId("my-button");
    expect(button).toHaveAttribute("aria-label", "Submit");

    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalled();
  });

  it("has the default btn-custom class when no className is provided", () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn-custom");
  });
    
});
