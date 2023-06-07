/**
 * Calculate react page
 *      takes user to page where calculated mutually schedule will show
 *      uses route /schedule/calculate from server/index.js
 */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Calculate = () => {

  //load in user details
  const { id } = useParams();
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [timezone, setTimezone] = useState("");

  //function for calculating the user schedule
  useEffect (() => {
    function calculateUserSched() {
      if (id) {
        fetch(`http://localhost:4000/calculate/${id}`) 
        .then((res) => res.json())
        .then((data) => {
          setUsername(data.username);
          setSchedules(data.schedules);
          setTimezone(data.timezone.label);
          setLoading(false);
          // console.log(JSON.stringify(schedules, null, 2))
        })
        .catch((err) => console.error(err));
      }
    }
    calculateUserSched();
  }, [id]);

  // just figured out for above. schedules must match what the
  // res.json returns for variable name.. dont know if it fixed
  // or not

  
  useEffect(() => {
    console.log("Schedules: ")
    console.log(JSON.stringify(schedules, null, 2))
    if (!localStorage.getItem("_id")) {
      navigate("/");
    }
  }, [navigate, schedules]);

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
            <button onClick={() => navigate(`/book/${username}`)} className="button">
              Email Schedule
            </button>
          </div>

          <p> Here is your calculated mutual schedule: - {timezone}</p>
          <table className="table">
            <tbody>
              {schedules.map((daySlot) => (
                <tr key={daySlot.day}>
                  <td>{daySlot.day}</td>
                  <td>
                    {daySlot.slots.map((timeSlot, index) => (
                      <div key={index}>
                        Start: {timeSlot.startTime}, End: {timeSlot.endTime}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default Calculate;


