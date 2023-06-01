const WeeklySchedule = require("./WeeklySchedule.js")
/**
 * function calculate schedule
 *    takes in a list of schedules
 *    will output avaialbel times by all schedules in one schedule
 *    uses schedule class
 * @param  {...any} schedules
 * @returns mutually available schedule
 */
function calculateSchedule(...schedules) {
  //check for no schedules passed, return empty schedule
  if (schedules.length === 0) {
    return new WeeklySchedule();
  }

  const mutuallyFreeSchedule = new WeeklySchedule();
  // take days from the schedule
  const days = Object.keys(mutuallyFreeSchedule.schedule);
  console.log(JSON.stringify(schedules, null, 2));

  // flatten times into an array to easily handle per day
  for (const day of days) {
    const timeSlots = schedules.map((schedule) => schedule.getTimeSlots(day)).flat();
    
    console.log(JSON.stringify(timeSlots, null, 2));

    //sort an compare
    const sortedTimeSlots = timeSlots.sort((a, b) => {
      return a.startTime.localeCompare(b.startTime);
    });

    let currentStartTime = "";
    let currentEndTime = "";

    for (const timeSlot of sortedTimeSlots) {
      // assign new end time if current end time is not in the next time slot
      if(currentEndTime !== "") {
        if(currentEndTime > timeSlot.endTime) {
          currentEndTime = timeSlot.endTime;
        }
      }
      // assign new start time if current start time is not in the next time slot
      if(currentStartTime !== "") {
        if(currentStartTime < timeSlot.startTime) {
          currentStartTime = timeSlot.startTime;
        }
      }
      // assign times if no currentStartTime/ end time is set yet
      if(currentEndTime === "") currentEndTime = timeSlot.endTime;
      if(currentStartTime === "") currentStartTime = timeSlot.startTime;

      // if (currentEndTime === "" || timeSlot.startTime > currentEndTime) {
      //   if (currentStartTime !== "" && currentEndTime !== "") {
      //     mutuallyFreeSchedule.addTimeSlot(day, currentStartTime, currentEndTime);
      //   }
      //   currentStartTime = timeSlot.startTime;
      //   currentEndTime = timeSlot.endTime;
      // } else if (timeSlot.endTime > currentEndTime) {
      //   currentEndTime = timeSlot.endTime;
      // }
      console.log('current start time: ' + currentStartTime + ' current end time: ' + currentEndTime);
    }
    
    if (currentStartTime !== "" && currentEndTime !== "") {
      mutuallyFreeSchedule.addTimeSlot(day, currentStartTime, currentEndTime);
    }
    console.log(mutuallyFreeSchedule.getTimeSlots(day));
  }

  return mutuallyFreeSchedule;
}



module.exports = calculateSchedule;