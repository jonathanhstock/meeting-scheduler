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
    <div className="container">
      <nav>
        <h2>Jegg-Meet</h2>
        <button
          onClick={() => navigate(`/profile/${localStorage.getItem("_id")}`)}
          className="button"
        >
          Saved Schedule
        </button>

        <button onClick={handleLogout} className="button">
          Logout
        </button>
      </nav>
      <main>
        <h2>Select your availability</h2>

        <div className="block">
          <p>Select a timezone</p>
          <TimezoneSelect
            value={selectedTimezone}
            onChange={setSelectedTimezone}
          />

          {schedule.map((sch, id) => (
            <div className="day-row" key={id}>
              <p>{sch.day}</p>
              <div className="time-slots">
                {sch.slots.map((slot, slotId) => (
                  <div className="time-slot" key={slotId}>
                    <div>
                      <label htmlFor={`startTime-${id}-${slotId}`}>
                        Start Time
                      </label>
                      <select
                        name="startTime"
                        id={`startTime-${id}-${slotId}`}
                        onChange={(e) => handleTimeChange(e, id, slotId)}
                        className="input"
                      >
                        {time.map((t) => (
                          <option key={t.id} value={t.t} id={t.id}>
                            {t.t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor={`endTime-${id}-${slotId}`}>
                        End Time
                      </label>
                      <select
                        name="endTime"
                        id={`endTime-${id}-${slotId}`}
                        onChange={(e) => handleTimeChange(e, id, slotId)}
                        className="input"
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
                <button
                  onClick={() => handleAddTimeSlot(id)}
                  className="button add-time-slot"
                >
                  Add More Time Slot
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <button onClick={handleSaveSchedules} className="button save-button">
            ADD SCHEDULE
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
