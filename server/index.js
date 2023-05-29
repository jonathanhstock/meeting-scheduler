const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const fs = require("fs");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const database = [];
const createID = () => Math.random().toString(36).substring(2, 10);
scheduleCount = 0;


class weeklySchedule {

  // schedule data structure 
  //    holds time slots in list of duples
  constructor() {
    this.schedule = {
      Monday: [],
      Tuesday:[],
      Wednesday:[],
      Thursday:[],
      Friday:[]
    };
  }

  // adds a time slot
  // time slot formatted as a duple
  addTimeSlot(day, startTime, endTime) {
    if (this.schedule.hasOwnProperty(day)) {
      const timeSlot = { startTime, endTime };
      this.schedule[day].push(timeSlot);
    } else {
      console.log(`Invalid day: ${day}`);
    }
  }

  // remove a time slot based on start and endtime
  removeTimeSlot(day, startTime, endTime) {
    if (this.schedule.hasOwnProperty(day)) {
      const timeSlots = this.schedule[day];
      const index = timeSlots.findIndex(
        slot => slot.startTime === startTime && slot.endTime === endTime
      );
      if (index !== -1) {
        timeSlots.splice(index, 1);
      } else {
        console.log(`Time slot not found: ${startTime} - ${endTime}`);
      }
    } else {
      console.log(`Invalid day: ${day}`);
    }
  }

  // return all timeslots for a specified day of the schedule
  getTimeSlots(day) {
    if (this.schedule.hasOwnProperty(day)) {
      return this.schedule[day];
    } else {
      console.log(`Invalid day: ${day}`);
      return [];
    }
  }

  // clear specified day of schedule
  clearDay(day) {
    if (this.schedule.hasOwnProperty(day)) {
      this.schedule[day] = [];
    } else {
      console.log(`Invalid day: ${day}`);
    }
  }

  // display schedule to console for debugging purposes
  displaySchedule() {

  }
}


/**
 * function calculate schedule
 *    takes in a list of schedules
 *    will output avaialbel times by all schedules in one schedule
 *    uses schedule class
 * @param  {...any} schedules 
 * @returns mutually available schedule
 */
function calculateSchedule(...schedules) {
  const availableSchedule = new weeklySchedule();

  //check for empty list of schedules
  if(schedules.length === 0) return availableSchedule;

  const firstSched = schedules[0];

  // iterate through each day in each schedule
  for(const day in schedules.schedule) {
    const tempTimes = firstSched.getTimeSlots(day);

    // iterate through each timeSlot of each days times and
    // compare times to see where mutually avaialbel times are
    for(const timeSlot of tempTimes) {
      let isAvail = true;

      for(let i = 1; i < schedules.length; i++ ) {
        const sched = schedules[i];
        const otherTimes = sched.getTimeSlots(day);
        const overlap = otherTimes.some(
          otherSlot => 
            (otherSlot.startTime >= timeSlot.startTime && otherSlot.startTime < timeSlot.endTime) ||
            (otherSlot.endTime > timeSlot.startTime && otherSlot.endTime <= timeSlot.endTime)
        );

        // if no overlap detected in current times iteration break   
        if(!overlap) {
          isAvail = false;
          break;
        }
      }

      // open time found
      if(isAvail) {
        availableSchedule.addTimeSlot(day, timeSlot.startTime, timeSlot.endTime);
      }


    }
  }

  return availableSchedule;
}



app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  let result = database.filter(
    (user) => user.email === email || user.username === username
  );
  if (result.length === 0) {
    const newUser = {
      id: createID(),
      username,
      password,
      email,
      timezone: {},
      schedule: [],
    };
    database.push(newUser);

    // adds new user into json file
    fs.readFile("users.json", (err, data) => {
      if (err) {
        // return error message
        console.log(err);
        return res.json({ error_message: "Failed to register user" });
      }
      let users = [];
      if (data.length > 0) {
        users = JSON.parse(data);
        // if users are not created then create a new array
        if (!Array.isArray(users)) {
          users = [];
        }
      }
      users.push(newUser);

      fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if (err) {
          // return error message
          return res.json({ error_message: "Failed to register user" });
        }
        return res.json({ message: "Account created successfully! " });
      });
    });
  } else {
    res.json({ error_message: "User already exists!" });
  }
});

// logs user in from JSON file
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  fs.readFile("users.json", (err, data) => {
    if (err) {
      // return error message
      return res.json({ error_message: "Failed to login" });
    }
    const users = JSON.parse(data);
    const result = users.find(
      (user) => user.username === username && user.password === password
    );

    if (result) {
      return res.json({
        message: "Login successfully",
        data: {
          _id: result.id,
          _email: result.email,
        },
      });
    }
    return res.json({
      error_message: "Failed to login. Incorrect credentials",
    });
  });
});

app.post("/schedule/create", (req, res) => {
  const { userId, timezone, schedule } = req.body;
  let result = database.filter((db) => db.id === userId);
  result[0].timezone = timezone;
  result[0].schedule = schedule;
  res.json({ message: "OK" });
});

app.get("/schedules/:id", (req, res) => {
  const { id } = req.params;
  let result = database.filter((db) => db.id === id);
  if (result.length === 1) {
    return res.json({
      message: "Schedules successfully retrieved!",
      schedules: result[0].schedule,
      username: result[0].username,
      timezone: result[0].timezone,
    });
  }
  return res.json({ error_message: "Sign in again, an error occured..." });
});

app.post("/schedules/:username", (req, res) => {
  const { username } = req.body;
  let result = database.filter((db) => db.username === username);
  if (result.length === 1) {
    const scheduleArray = result[0].schedule;
    const filteredArray = scheduleArray.filter((sch) => sch.startTime !== "");
    return res.json({
      message: "Schedules successfully retrieved!",
      schedules: filteredArray,
      timezone: result[0].timezone,
      receiverEmail: result[0].email,
    });
  }
  return res.json({ error_message: "User doesn't exist" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
