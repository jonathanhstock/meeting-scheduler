import React, { useState, useEffect } from "react";
import TimezoneSelect from "react-timezone-select";
import { time } from "../utils/resource";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleCreateSchedule } from "../utils/resource";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedTimezone, setSelectedTimezone] = useState({});

  const [schedule, setSchedule] = useState([
    { day: "Sun", timeSlots: [{ startTime: "", endTime: "" }] },
    { day: "Mon", timeSlots: [{ startTime: "", endTime: "" }] },
    { day: "Tue", timeSlots: [{ startTime: "", endTime: "" }] },
    { day: "Wed", timeSlots: [{ startTime: "", endTime: "" }] },
    { day: "Thu", timeSlots: [{ startTime: "", endTime: "" }] },
    { day: "Fri", timeSlots: [{ startTime: "", endTime: "" }] },
    { day: "Sat", timeSlots: [{ startTime: "", endTime: "" }] },
  ]);

  useEffect(() => {
    if (!localStorage.getItem("_id")) {
      navigate("/");
    }
  }, [navigate]);

  const handleTimeChange = (e, dayIndex, slotIndex) => {
    const { name, value } = e.target;
    if (value === "Select") return;
    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex].timeSlots[slotIndex][name] = value;
    setSchedule(updatedSchedule);
  };

  const handleAddTimeSlot = (dayIndex) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex].timeSlots.push({ startTime: "", endTime: "" });
    setSchedule(updatedSchedule);
  };

  const handleSaveSchedules = () => {
    if (JSON.stringify(selectedTimezone) !== "{}") {
      handleCreateSchedule(selectedTimezone, schedule, navigate);
    } else {
      toast.error("Select your timezone");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("_id");
    localStorage.removeItem("_myEmail");
    navigate("/");
  };

  return (
    <div>
      <nav className="dashboard__nav">
        <h2>COEN-Meet</h2>

        <button
          onClick={() => navigate(`/profile/${localStorage.getItem("_id")}`)}
          className="schedule__btn"
        >
          Saved Schedule
        </button>

        <button onClick={handleLogout} className="logout__btn">
          Logout
        </button>
      </nav>
      <main className="dashboard__main">
        <h2 className="dashboard__heading">Select your availability</h2>

        <div className="timezone__wrapper">
          <p>Select a timezone</p>
          <TimezoneSelect
            value={selectedTimezone}
            onChange={setSelectedTimezone}
          />

          {schedule.map((day, dayIndex) => (
            <div className="form" key={day.day}>
              <p>{day.day}</p>
              {day.timeSlots.map((timeSlot, slotIndex) => (
                <div className="select__wrapper" key={slotIndex}>
                  <label htmlFor={`startTime-${dayIndex}-${slotIndex}`}>
                    Start Time
                  </label>
                  <select
                    name="startTime"
                    id={`startTime-${dayIndex}-${slotIndex}`}
                    onChange={(e) => handleTimeChange(e, dayIndex, slotIndex)}
                  >
                    {time.map((t) => (
                      <option key={t.id} value={t.t} id={t.id}>
                        {t.t}
                      </option>
                    ))}
                  </select>
                  <label htmlFor={`endTime-${dayIndex}-${slotIndex}`}>
                    End Time
                  </label>
                  <select
                    name="endTime"
                    id={`endTime-${dayIndex}-${slotIndex}`}
                    onChange={(e) => handleTimeChange(e, dayIndex, slotIndex)}
                  >
                    {time.map((t) => (
                      <option key={t.id} value={t.t} id={t.id}>
                        {t.t}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <button
                onClick={() => handleAddTimeSlot(dayIndex)}
                className="add-timeslot__btn"
              >
                Add Time Slot
              </button>
            </div>
          ))}
        </div>

        <div className="saveBtn__container">
          <button onClick={handleSaveSchedules}>SAVE SCHEDULES</button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;