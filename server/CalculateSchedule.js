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
    // boolean to handle finding an empty timeslot,
    // this flag will ensure that the slots are not added if 
    //    a schedule has no available times for a specified day
    let foundEmpty = false;
    const timeSlots = schedules
      .map((schedule) => schedule.getTimeSlots(day))
      .flat()
      .map((timeSlot) => ({
        startTime: timeSlot.startTime.padStart(7, '0'),
        endTime: timeSlot.endTime.padStart(7, '0'),
      }));
    
    //console.log(JSON.stringify(timeSlots, null, 2));

    //sort an compare
    const sortedTimeSlots = timeSlots.sort((a, b) => {
      return a.startTime.localeCompare(b.startTime);
    });

    // let currentStartTime = sortedTimeSlots[0].startTime;
    // let currentEndTime = sortedTimeSlots[0].endTime;
    let currentStartTime = null;
    let currentEndTime = null;

    // if(currentStartTime === "" || currentEndTime === "") continue;

    for (const timeSlot of sortedTimeSlots) {
      if(timeSlot.startTime === "" || timeSlot.endTime === "") {
        foundEmpty = true;
        break;
      }
      // assign new end time if current end time is not in the next time slot
      if (currentStartTime === null) currentStartTime = timeSlot.startTime;
      if (currentEndTime === null) currentEndTime = timeSlot.endTime;
      // assign new start time if current start time is not in the next time slot
      console.log("current: " + currentStartTime + "timeSlot: " + timeSlot.startTime);
      if(currentStartTime <= timeSlot.startTime) {
        currentStartTime = timeSlot.startTime;
      }
      if(currentEndTime >= timeSlot.endTime) {
        currentEndTime = timeSlot.endTime;
      }
      // assign times if no currentStartTime/ end time is set yet
      //PROBLEM HERE
      // if(currentEndTime === "" ) currentEndTime = timeSlot.endTime;
      // if(currentStartTime === "") currentStartTime = timeSlot.startTime;

      console.log('current start time: ' + currentStartTime + ' current end time: ' + currentEndTime);
    }
    
    if (currentStartTime !== null && currentEndTime !== null && !foundEmpty && currentStartTime !== "0000000" && currentEndTime !== "0000000") {
      mutuallyFreeSchedule.addTimeSlot(day, currentStartTime, currentEndTime);
    }
    //console.log(mutuallyFreeSchedule.getTimeSlots(day));
  }

  return mutuallyFreeSchedule;
}



module.exports = calculateSchedule;

