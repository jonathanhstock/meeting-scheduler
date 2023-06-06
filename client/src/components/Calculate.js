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
  const [tiemzone, setTimezone] = useState("");

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
        })
        .catch((err) => console.error(err));
      }
    }
    calculateUserSched();
  }, [id]);

  return (
    <main className="contatiner">
        <div className="block">
          <h2>Hey, {username}</h2>
            <h1>
              Hello World
            </h1>
        </div>
        <div className="block">
          <p>Here is your schedule: - </p>
        </div>
    </main>
  );
}

export default Calculate;


