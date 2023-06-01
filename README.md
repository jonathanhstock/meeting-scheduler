## About this project
- We created this application to be a meeting scheduler application to collaborate with friends comparable to other scheduling apps like When2Meet or Google Calendar

- Allows creation, reading, updating and deletion of schedules

- Emails schedule using emailjs API

## How to run this project
- Split a terminal up into two different tabs and type and enter `cd client` and `cd server` into separate terminals.

- Run `npm install` in both terminals (client and server) to install all their dependencies and build the project.

- Start both servers in separate terminals using `npm start`

- The web application should automatically open in your browser at [http://localhost:3000/register]

- Next you can create an account with an email, username, and password which will save to the local database

## Testing

- Unit tests have been created under the tests folder 

- To run the tests navigate in a terminal window to the project directory
  
- Run `npx install jest` and `npx install supertest` inside the server folder from terminal

- Then run the command `npx jest __tests__/test.js` where test.js is replaced by one of the tests you want to run if you only want to try a specific test

- Run the command `npx jest` to test all of the tests at once

## Contact

- Any questions regarding the web application, please contact **jstock@scu.edu** or **mdavenport@scu.edu**
