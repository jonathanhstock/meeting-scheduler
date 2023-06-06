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
        <h1>
          Hello World
        </h1>
    </main>
  );
}

export default Calculate;

// const Calculate = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [schedules, setSchedules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [username, setUsername] = useState("");
//   const [timezone, setTimezone] = useState("");

//   useEffect(() => {
  //   function getUserDetails() {
  //     if (id) {
  //       fetch(`http://localhost:4000/schedules/calculate/${id}`)
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setUsername(data.username);
  //           setSchedules(data.schedules);
  //           setTimezone(data.timezone.label);
  //           setLoading(false);
  //         })
  //         .catch((err) => console.error(err));
  //     }
  //   }
  //   getUserDetails();
  // }, [id]);

//   useEffect(() => {
//     if (!localStorage.getItem("_id")) {
//       navigate("/");
//     }
//   }, [navigate]);

//   return (
//     <main className="container">
//   {loading ? (
//     <p>Loading...</p>
//   ) : (
//     <div className="block">
//       <h2>Hey, {username}</h2>
//       <div className="button-container">
//         <button onClick={() => navigate("/dashboard")} className="button">
//           Dashboard
//         </button>
//         <button onClick={() => navigate(`/book/${username}`)} className="button">
//           Email Schedule
//         </button>
//         <button onClick={() => navigate(`/schedule/calculate`)} className="button">
//           Calculate Your Mutual Schedule
//         </button>
//       </div>
//       <p>Here is your schedule: - {timezone}</p>
//       <table className="table">
//         <tbody>
//           {schedules.map((sch) => (
//             <tr key={sch.day}>
//               <td style={{ fontWeight: "bold" }}>{sch.day.toUpperCase()}</td>
//               <td>
//                 {sch.startTime.length ? (
//                   sch.startTime.map((time, i) => <div key={i}>{time}</div>)
//                 ) : (
//                   <div>Unavailable</div>
//                 )}
//               </td>
//               <td>
//                 {sch.endTime.length ? (
//                   sch.endTime.map((time, i) => <div key={i}>{time}</div>)
//                 ) : (
//                   <div>Unavailable</div>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )}
// </main>



//   );
// };

// export default Calculate;
