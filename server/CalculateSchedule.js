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
    const availableSchedule = new WeeklySchedule();
  
    //check for empty list of schedules
    if (schedules.length === 0) return availableSchedule;
  
    const firstSched = schedules[0];
  
    // iterate through each day in each schedule
    for (const day in schedules.schedule) {
      const tempTimes = firstSched.getTimeSlots(day);
  
      // iterate through each timeSlot of each days times and
      // compare times to see where mutually avaialbel times are
      for (const timeSlot of tempTimes) {
        let isAvail = true;
  
        for (let i = 1; i < schedules.length; i++) {
          const sched = schedules[i];
          const otherTimes = sched.getTimeSlots(day);
          const overlap = otherTimes.some(
            (otherSlot) =>
              (otherSlot.startTime >= timeSlot.startTime &&
                otherSlot.startTime < timeSlot.endTime) ||
              (otherSlot.endTime > timeSlot.startTime &&
                otherSlot.endTime <= timeSlot.endTime)
          );
  
          // if no overlap detected in current times iteration break
          if (!overlap) {
            isAvail = false;
            break;
          }
        }
  
        // open time found
        if (isAvail) {
          availableSchedule.addTimeSlot(
            day,
            timeSlot.startTime,
            timeSlot.endTime
          );
        }
      }
    }
  
    return availableSchedule;
  }


module.exports = calculateSchedule;