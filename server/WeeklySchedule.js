
/**
 * Weekly schedule class
 *    schedule dictionary with lists of time slots
 *
 */
class WeeklySchedule {
    // schedule data structure
    //    holds time slots in list of duples
    constructor() {
      this.schedule = {
        Sun: [],
        Mon: [],
        Tue: [],
        Wed: [],
        Thu: [],
        Fri: [],
        Sat: [],
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
          (slot) => slot.startTime === startTime && slot.endTime === endTime
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
    displaySchedule() {}
  }


  module.exports = WeeklySchedule;