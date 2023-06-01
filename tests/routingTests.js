const request = require("supertest");
const express = require("express");
const app = express();

// Import your app and routes here
const {
  app,
  handleRegister,
  handleLogin,
  handleCreateSchedule,
  handleGetSchedules,
  handleGetUserSchedules,
} = require("./app");

// Test for register endpoint
test("Register endpoint", async () => {
  const response = await request(app)
    .post("/register")
    .send({
      username: "testuser",
      email: "test@example.com",
      password: "123456",
    });

  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Account created successfully!");
});

// Test for login endpoint
test("Login endpoint", async () => {
  const response = await request(app)
    .post("/login")
    .send({ username: "testuser", password: "123456" });

  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Login successfully");
  expect(response.body.data._id).toBeDefined();
  expect(response.body.data._email).toBeDefined();
});

// Test for create schedule endpoint
test("Create schedule endpoint", async () => {
  const response = await request(app)
    .post("/schedule/create")
    .send({ userId: "123456", timezone: "America/New_York", schedule: [] });

  expect(response.status).toBe(200);
  expect(response.body.message).toBe("OK");
});

// Test for get schedules endpoint
test("Get schedules endpoint", async () => {
  const response = await request(app).get("/schedules/123456");

  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Schedules successfully retrieved!");
  expect(response.body.schedules).toBeDefined();
  expect(response.body.username).toBeDefined();
  expect(response.body.timezone).toBeDefined();
});

// Test for get user schedules endpoint
test("Get user schedules endpoint", async () => {
  const response = await request(app)
    .post("/schedules/testuser")
    .send({ username: "testuser" });

  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Schedules successfully retrieved!");
  expect(response.body.schedules).toBeDefined();
  expect(response.body.timezone).toBeDefined();
  expect(response.body.receiverEmail).toBeDefined();
});
