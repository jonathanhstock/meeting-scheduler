import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { handleCreateSchedule } from "../utils/resource";

jest.mock("../utils/resource", () => ({
  handleCreateSchedule: jest.fn(),
}));

describe("Dashboard component", () => {
  test("should save the schedule when save button is clicked", () => {
    render(<Dashboard />);

    const saveButton = screen.getByText("SAVE SCHEDULES");

    fireEvent.click(saveButton);

    expect(handleCreateSchedule).toHaveBeenCalled();
    // Add additional assertions here to check if the schedule was saved
  });
});
