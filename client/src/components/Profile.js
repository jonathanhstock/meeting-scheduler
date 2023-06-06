import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    function getUserDetails() {
      if (id) {
        fetch(`http://localhost:4000/schedules/${id}`)
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
    getUserDetails();
  }, [id]);

  useEffect(() => {
    if (!localStorage.getItem("_id")) {
      navigate("/");
    }
  }, [navigate]);

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
        <button onClick={() => navigate(`/calculate/${id}`)} className="button">
          Calculate Your Mutual Schedule
        </button>
        <button onClick={() => navigate(`/viewall/${id}`)} className="button">
          View All Schedules
        </button>
      </div>
      <p>Here is your schedule: - {timezone}</p>
      <table className="table">
        <tbody>
          {schedules.map((sch) => (
            <tr key={sch.day}>
              <td style={{ fontWeight: "bold" }}>{sch.day.toUpperCase()}</td>
              <td>
                {sch.startTime.length ? (
                  sch.startTime.map((time, i) => <div key={i}>{time}</div>)
                ) : (
                  <div>Unavailable</div>
                )}
              </td>
              <td>
                {sch.endTime.length ? (
                  sch.endTime.map((time, i) => <div key={i}>{time}</div>)
                ) : (
                  <div>Unavailable</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</main>



  );
};

export default Profile;
