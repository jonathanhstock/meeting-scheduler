const express = require("express");
const app = express();
const cors = require("cors");
const WeeklySchedule = require("./WeeklySchedule.js");
const calculateSchedule = require("./CalculateSchedule.js")
const PORT = 4000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// need to find a way to do remote database so that information saves offline when server is not running
const database = [];
const createID = () => Math.random().toString(36).substring(2, 10);
let userCount = 0;

/**
 * 
 * @param scheduleData
 * @returns converted schedule array to an object of class WeeklySchedule
 */
function convertScheduleToObject(scheduleData) {
  const convertedSchedule = new WeeklySchedule();

  for(const daySlot of scheduleData) {
    const { day, slots } = daySlot;
    for(const timeSlot of slots) {
      const { startTime, endTime } = timeSlot;
      convertedSchedule.addTimeSlot(day, startTime, endTime);
    }
  }

  return convertedSchedule;
}

/**
 * 
 * @param weeklyScheduleObj
 * @returns a converted array from given WeeklySchedule object
 */
function convertToScheduleArray(weeklyScheduleObj) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const scheduleArray = [];

  for (const day of days) {
    const timeSlots = weeklyScheduleObj.getTimeSlots(day);
    const daySlot = {
      day,
      slots: timeSlots.length > 0 ? timeSlots.map((timeSlot) => ({
        startTime: timeSlot.startTime, 
        endTime: timeSlot.endTime,
      })) : [{startTime: "", endTime: ""}],
    };
    scheduleArray.push(daySlot);
  }

  return scheduleArray;
}




app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  let result = database.filter(
    (user) => user.email === email || user.username === username
  );
  if (result.length === 0) {
    database.push({
      id: createID(),
      username,
      password,
      email,
      timezone: {},
      schedule: [], // hold multiple schedules
      schedules: [], // temp separate array to hold objects
      currentSchedule: 0,
      scheduleCount: 0,
    });
    return res.json({ message: "Account created successfully!" });
  }
  res.json({ error_message: "User already exists!" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  let result = database.filter(
    (user) => user.username === username && user.password === password
  );
  if (result.length !== 1) {
    return res.json({
      error_message: "Incorrect credentials",
    });
  }
  res.json({
    message: "Login successfully",
    data: {
      _id: result[0].id,
      _email: result[0].email,
    },
  });
});

app.post("/schedule/create", (req, res) => {
  const { userId, timezone, schedule } = req.body;
  let result = database.filter((db) => db.id === userId);
  result[0].timezone = timezone;
  result[0].schedule = schedule;
  result[0].schedules.push(convertScheduleToObject(schedule));
  console.log(result[0].schedules[result[0].currentSchedule].displaySchedule());
  result[0].currentSchedule++;
  result[0].scheduleCount++;
  res.json({ message: "OK" });
});

app.get("/calculate/:id", (req, res) => {
  console.log("GET successful");

  const { id } = req.params;
  let result = database.filter((db) => db.id === id);
  if (result.length === 1) {
    console.log("User Found");

    let mutualSchedule = new WeeklySchedule();
    const schedules = result[0].schedules;
    mutualSchedule = calculateSchedule(...schedules);
    const mutualScheduleArr = convertToScheduleArray(mutualSchedule);
    
    // debugging purposes
    console.log("Mutual array calculated: ")
    console.log(JSON.stringify(mutualScheduleArr, null, 2));

    return res.json({
      message: 'Mutual schedule calculated successfully',
      schedules: mutualScheduleArr,
      username: result[0].username,
      timezone: result[0].timezone,
    });
  }
});

/*
 * route for viewing latest schedule from user 
 *    and navigation from here for user
*/
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


/*
 * route for viewing all schedules for the user
*/
app.get("/viewAllSchedules/:id", (req, res) => {
  const { id } = req.params;
  let result = database.filter((db) => db.id === id);
  let schedArrays = [];
  if(result[0].schedules.length > 0) {
    for(sched of result[0].schedules) {
      schedArrays.push(convertToScheduleArray(sched));
    }
  }
  else {
    emptySched = new WeeklySchedule();
    schedArrays.push(emptySched);
  }
  if(result.length === 1) {
    return res.json({
      message: "Schedules successfully retrieved!",
      schedules: schedArrays,
      username: result[0].username,
      timezone: result[0].timezone,
    });
  }
  return res.json({error_message: "Error returning schedules"});
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



module.exports = { 
  convertScheduleToObject, 
  convertToScheduleArray, 
  app 
};