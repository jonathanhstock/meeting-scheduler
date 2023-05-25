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
    { day: "Sun", slots: [{ startTime: "", endTime: "" }] },
    { day: "Mon", slots: [{ startTime: "", endTime: "" }] },
    { day: "Tue", slots: [{ startTime: "", endTime: "" }] },
    { day: "Wed", slots: [{ startTime: "", endTime: "" }] },
    { day: "Thu", slots: [{ startTime: "", endTime: "" }] },
    { day: "Fri", slots: [{ startTime: "", endTime: "" }] },
    { day: "Sat", slots: [{ startTime: "", endTime: "" }] },
  ]);

  useEffect(() => {
    if (!localStorage.getItem("_id")) {
      navigate("/");
    }
  }, [navigate]);

  const handleTimeChange = (e, id, slotId) => {
    const { name, value } = e.target;
    if (value === "Select") return;
    const list = [...schedule];
    list[id].slots[slotId][name] = value;
    setSchedule(list);
  };

  const handleAddTimeSlot = (id) => {
    const list = [...schedule];
    list[id].slots = [...list[id].slots, { startTime: "", endTime: "" }];
    setSchedule(list);
  };

  const handleSaveSchedules = () => {
    if (JSON.stringify(selectedTimezone) !== "{}") {
      const transformedSchedule = schedule.map((day) => ({
        ...day,
        startTime: day.slots.map((slot) => slot.startTime),
        endTime: day.slots.map((slot) => slot.endTime),
      }));
      handleCreateSchedule(selectedTimezone, transformedSchedule, navigate);
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
        <h2>Jegg-Meet</h2>

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

          {schedule.map((sch, id) => (
            <div className="form" key={id}>
              <p>{sch.day}</p>
              {sch.slots.map((slot, slotId) => (
                <div className="time-slot" key={slotId}>
                  <div className="select__wrapper">
                    <label htmlFor={`startTime-${id}-${slotId}`}>
                      Start Time
                    </label>
                    <select
                      name="startTime"
                      id={`startTime-${id}-${slotId}`}
                      onChange={(e) => handleTimeChange(e, id, slotId)}
                    >
                      {time.map((t) => (
                        <option key={t.id} value={t.t} id={t.id}>
                          {t.t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="select__wrapper">
                    <label htmlFor={`endTime-${id}-${slotId}`}>End Time</label>
                    <select
                      name="endTime"
                      id={`endTime-${id}-${slotId}`}
                      onChange={(e) => handleTimeChange(e, id, slotId)}
                    >
                      {time.map((t) => (
                        <option key={t.id} value={t.t} id={t.id}>
                          {t.t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
              <button onClick={() => handleAddTimeSlot(id)}>
                Add More Time Slot
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
