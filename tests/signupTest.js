import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "./Signup";

describe("Signup component", () => {
  test("should display error for empty email", () => {
    render(<Signup />);

    const emailInput = screen.getByLabelText("Email Address");
    const form = screen.getByRole("form");

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.submit(form);
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    // Add additional assertions here to check if the error for empty email is displayed
  });

  test("should display error for invalid email", () => {
    render(<Signup />);

    const emailInput = screen.getByLabelText("Email Address");
    const form = screen.getByRole("form");

    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.submit(form);
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
    // Add additional assertions here to check if the error for invalid email is displayed
  });

  test("should handle valid email submission", () => {
    render(<Signup />);

    const emailInput = screen.getByLabelText("Email Address");
    const form = screen.getByRole("form");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.submit(form);
    expect(screen.queryByText("Invalid email")).toBeNull();
    // Add additional assertions here to check if the email was successfully submitted
  });
});
