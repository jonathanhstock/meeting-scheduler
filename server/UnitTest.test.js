const WeeklySchedule = require("./WeeklySchedule.js");
const calculateSchedule = require("./CalculateSchedule.js")
const { convertScheduleToObject, convertToScheduleArray } = require("./index.js")

describe('WeeklySchedule', () => {
    let schedule;

    beforeEach(() => {
        schedule = new WeeklySchedule();
    });

    // test valid time slot input
    test('addTimeSlot should add a valid time slot to the schedule', () => {
        schedule.addTimeSlot('Mon', '9:00', '10:00');
        expect(schedule.getTimeSlots('Mon')).toEqual([{ startTime: '9:00', endTime: '10:00'}]);
    });

    // test invalid input for day
    test('addTimeSlot should show invalid time day', () => {
        schedule.addTimeSlot('garbage', '9:00', '10:00');
        expect(schedule.getTimeSlots('InvalidDay')).toEqual([]);
    });

    // test for removing a time slot form the schedule
    test('removeTimeSlot should remove a valid time slot from the schedule', () => {
        schedule.addTimeSlot('Tue', '8:00', '9:00');
        schedule.removeTimeSlot('Tue', '8:00', '9:00');
        expect(schedule.getTimeSlots('Tue')).toEqual([]);
    })

    // handle invalid input for removing a time slot from the schedule
    test('removeTimeSlot should show invalid day', () => {
        schedule.removeTimeSlot('InvalidDay', '8:00', '9:00');
        expect(schedule.getTimeSlots('InvalidDay')).toEqual([]);
    })

    // test clear day
    test('clearDay should completely clear a day of all time slots', () => {
        schedule.addTimeSlot('Tue', '9:00', '11:00');
        schedule.addTimeSlot('Tue', '14:00', '16:00');
        schedule.clearDay('Tue');
        expect(schedule.getTimeSlots('Tue')).toEqual([]);
    })

    // test clear day with invalid input
    test('clearDay should show invalid day', () => {
        schedule.clearDay('InvalidDay');
        expect(schedule.getTimeSlots('InvalidDay')).toEqual([]);
    })
});


describe('calculateSchedule', () => {
    // initialize two weekly schedule objects for testing mutual schedules
    const schedule1 = new WeeklySchedule();
    const schedule2 = new WeeklySchedule();

    // load schedule 1 with a schedule
    schedule1.addTimeSlot('Mon', '09:00', '14:00');
    schedule1.addTimeSlot('Tue', '10:00', '13:00');

    // load schedule 2 with a schedule
    schedule2.addTimeSlot('Mon', '12:30', '16:00');
    schedule2.addTimeSlot('Tue', '08:00', '11:00');

    const mutualSchedule = calculateSchedule(schedule1, schedule2);
    expect(mutualSchedule.getTimeSlots('Mon')).toEqual([{ startTime: '12:30', endTime: '14:00'}]);
    expect(mutualSchedule.getTimeSlots('Tue')).toEqual([{ startTime: '10:00', endTime: '11:00'}]);
    expect(mutualSchedule.getTimeSlots('Wed')).toEqual([]);
    mutualSchedule.displaySchedule();
});