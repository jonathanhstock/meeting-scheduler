import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";

test("renders time slots", () => {
  const timeSlots = [
    { id: 1, start: "9:00", end: "10:00" },
    { id: 2, start: "10:00", end: "11:00" },
    // ...
  ];

  const { getByText } = render(<Dashboard timeSlots={timeSlots} />);

  // The time slots should be rendered
  timeSlots.forEach((slot) => {
    expect(getByText(`${slot.start} - ${slot.end}`)).toBeInTheDocument();
  });
});
