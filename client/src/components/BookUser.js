import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { sendEmail } from "../utils/resource";
import { fetchBookingDetails } from "../utils/resource";

const BookUser = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [timezone, setTimezone] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(false);
  const [receiverEmail, setReceiverEmail] = useState("");

  const { user } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail(receiverEmail, email, fullName, message, duration);
    setFullName("");
    setMessage("");
  };

  useEffect(() => {
    fetchBookingDetails(
      user,
      setError,
      setTimezone,
      setSchedules,
      setReceiverEmail
    );
  }, [user]);

  // const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("_id")) {
      navigate("/");
    }
  }, [navigate]);

  if (error) {
    return <ErrorPage error="User doesn't exist" />;
  }
  return (
    <div className="container">
    <nav>
      <h2>Book a session with {user}</h2>
      <button onClick={() => navigate("/dashboard/")} className="button">
        Go to Dashboard
      </button>
      <button
        onClick={() => navigate(`/profile/${localStorage.getItem("_id")}`)}
        className="button"
      >
        Go to Schedule
      </button>
    </nav>
  
    <form onSubmit={handleSubmit} className="block">
      <label htmlFor="fullName">Full Name</label>
      <input
        id="fullName"
        name="fullName"
        type="text"
        required
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="input"
      />
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
  
      <label htmlFor="message">Any important note? (optional)</label>
      <textarea
        rows={5}
        name="message"
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="input"
      />
  
      <label htmlFor="session">Select your preferred session - {timezone}</label>
      <select
        name="duration"
        onChange={(e) => setDuration(e.target.value)}
        className="input"
      >
        {schedules.map((schedule) => (
          <option
            value={`${schedule.day} - ${schedule.startTime} : ${schedule.endTime}`}
            key={schedule.day}
          >
            {`${schedule.day} - ${schedule.startTime} : ${schedule.endTime}`}
          </option>
        ))}
      </select>
      <button className="button">SEND</button>
    </form>
  </div>
  
  );
};

export default BookUser;
