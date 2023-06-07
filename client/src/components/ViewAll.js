/**
 * ViewAll react page
 *      takes user to page where all schedules will show
 *      uses route /viewAllSchedules/:id from server/index.js
 */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewAll = () => {
      //load in user details
  const { id } = useParams();
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [timezone, setTimezone] = useState("");

  //function for calculating the user schedule
  useEffect (() => {
    function displayUserScheds() {
      if (id) {
        fetch(`http://localhost:4000/viewAllSchedules/${id}`) 
        .then((res) => res.json())
        .then((data) => {
          setUsername(data.username);
          setSchedules(data.schedules);
          setTimezone(data.timezone.label);
          setLoading(false);
        })
        .catch((err) => console.error(err));
      }
    }
    displayUserScheds();
  }, [id]);

  useEffect(() => {
    if(!localStorage.getItem("_id")) {
      navigate("/");
    }
  }, [navigate]);

  // debugging using console --> view all schedules returned
  useEffect(() => {
    if(schedules.length > 0) {
      for(const sched of schedules) {
        console.log(JSON.stringify(sched, null, 2));
      }
    }
    else console.log("Error: length of schedules is 0");
  }, [schedules]);

  return (
    <main className="container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="block">
          <h2>Hey, {username}</h2>

          <div className="button-container">
            <button onClick={() => navigate("/dashboard")} className="button">
              Dashboard
            </button>
            <button
              onClick={() => navigate(`/book/${username}`)}
              className="button"
            >
              Email Schedule
            </button>
          </div>

          <p>Here are all your schedules: - {timezone}</p>

          {schedules && schedules.map((schedule, index) => (
            <div key={index}>
              <h3>Schedule {index + 1}</h3>
              <table className="table">
                <tbody>
                  <tr>
                    <th>Day</th>
                    <th>Time Slots</th>
                  </tr>
                  {schedule.map((daySlot, dayIndex) => (
                    <tr key={dayIndex}>
                      <td>{daySlot.day}</td>
                      <td>
                        {daySlot.slots.map((timeSlot, slotIndex) => (
                          <div key={slotIndex}>
                            Start: {timeSlot.startTime}, End: {timeSlot.endTime}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default ViewAll;




// correct formatting that works on Calculate.js

// {schedules.map((daySlot) => (
//   <tr key={daySlot.day}>
//     <td style={{ fontWeight: "bold" }}>{daySlot.day.toUpperCase()}</td>
//     <td>
//       {daySlot.slots.startTime !== "" ? (
//         daySlot.slots.map((timeSlot, index) => <div key={index}> {timeSlot.startTime}</div>) 
//       ) : (
//         <div>Unavailable</div>
//       )}
//     </td>
//     <td>
//       {daySlot.slots.endTime !== "" ? (
//         daySlot.slots.map((timeSlot, index) => <div key={index}>{timeSlot.endTime}</div>)
//       ) : (
//         <div>Unavailable</div>
//       )}
//     </td>
//   </tr>
// ))}