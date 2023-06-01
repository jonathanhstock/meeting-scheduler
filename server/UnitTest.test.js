/**
 * UnitTest.test.js
 *  provides testing framwork for the weeklySchedule class,
 *    calculate schedule algorithm, and the express backend
 *    API in index.js
 * 
 *    Files tested:
 *      ./server/index.js
 *      ./server/WeeklySchedule.js
 *      ./server/CalculateSchedule.js
 *      
 */



const WeeklySchedule = require("./WeeklySchedule.js");
const calculateSchedule = require("./CalculateSchedule.js");
const { convertScheduleToObject, convertToScheduleArray, app } = require("./index.js");
const request = require('supertest');

//testing various methods of the weekly schedule class
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


// testing calculate shcedule algorithm
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

  const expectedMon = [{ startTime: '12:30', endTime: '14:00' }];
  const expectedTue = [{ startTime: '10:00', endTime: '11:00' }];

  expect(mutualSchedule.getTimeSlots('Mon')).toEqual(expectedMon);
  expect(mutualSchedule.getTimeSlots('Tue')).toEqual(expectedTue);
  mutualSchedule.displaySchedule();
});

// testing backend express server


describe('API Tests', () => {
  describe('POST /register', () => {
    it('should create a new account', async () => {
      const response = await request(app)
        .post('/register')
        .send({ username: 'testuser', email: 'test@example.com', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Account created successfully!');
    });

    it('should return error if user already exists', async () => {
      const response = await request(app)
        .post('/register')
        .send({ username: 'testuser', email: 'test@example.com', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body.error_message).toBe('User already exists!');
    });
  });

  describe('POST /login', () => {
    it('should login with correct credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login successfully');
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toHaveProperty('_email');
    });

    it('should return error for incorrect credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'wrongpassword' });

      expect(response.status).toBe(200);
      expect(response.body.error_message).toBe('Incorrect credentials');
    });
  });

  describe('POST /schedule/create', () => {
    it('should create a new schedule', async () => {
      const response = await request(app)
        .post('/schedule/create')
        .send({ userId: 'user1', timezone: 'GMT', schedule: [] });

      //expect(response.status).toBe(200);
      expect(response.body.message).toBe('OK');
    });
  });

  describe('GET /schedules/:id', () => {
    it('should retrieve schedules for a valid user', async () => {
      const response = await request(app)
        .get('/schedules/user1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Schedules successfully retrieved!');
      expect(response.body.schedules).toBeInstanceOf(Array);
      expect(response.body.username).toBe('testuser');
      expect(response.body.timezone).toBe('GMT');
    });

    it('should return error for an invalid user', async () => {
      const response = await request(app)
        .get('/schedules/nonexistentuser');

      expect(response.status).toBe(200);
      expect(response.body.error_message).toBe("User doesn't exist");
    });
  });
});
