import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "./Signup";
import assert from "assert";

// 3 unit tests for user signup
describe("Signup component", () => {
  test("should handle email submission", () => {
    render(<Signup />);

    const emailInput = screen.getByLabelText("Email Address");
    const form = screen.getByRole("form");

    // Test valid email submission
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.submit(form);
    expect(screen.queryByText("Invalid email")).toBeNull();

    // Test empty email submission
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.submit(form);
    expect(screen.getByText("Email is required")).toBeInTheDocument();

    // Test invalid email submission
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.submit(form);
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });
});
