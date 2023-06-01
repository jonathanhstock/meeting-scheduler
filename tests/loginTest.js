import { render, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";

test("renders login form and allows form submission", () => {
  const handleSubmit = jest.fn(); // Mock function to act as submit handler

  const { getByLabelText, getByText } = render(
    <LoginForm onSubmit={handleSubmit} />
  );

  const emailInput = getByLabelText("Email");
  const passwordInput = getByLabelText("Password");
  const submitButton = getByText("Submit");

  // Simulate user input
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  // Simulate form submission
  fireEvent.click(submitButton);

  // The submit handler should have been called once
  expect(handleSubmit).toHaveBeenCalledTimes(1);

  // The submit handler should have been called with the form data
  expect(handleSubmit).toHaveBeenCalledWith({
    email: "test@example.com",
    password: "password123",
  });
});
