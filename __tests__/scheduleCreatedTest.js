// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import Dashboard from "./Dashboard";
// import { handleCreateSchedule } from "../utils/resource";
const React = require("react");
const render = require("@testing-library/react");
const screen = require("@testing-library/react");
const fireEvent = require("@testing-library/react");
const Dashboard = require("../client/src/components/Dashboard");
const handleCreateSchedule = require("../client/src/utils/resource");

jest.mock("../client/src/utils/resource", () => ({
  handleCreateSchedule: jest.fn(),
}));

describe("Dashboard component", () => {
  test("should save the schedule when save button is clicked", () => {
    render(<Dashboard />);

    const saveButton = screen.getByText("SAVE SCHEDULES");

    fireEvent.click(saveButton);

    expect(handleCreateSchedule).toHaveBeenCalled();
  });
});
