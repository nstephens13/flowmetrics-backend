import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './router';
// import initDatabase from './database/initdb';

dotenv.config();

// setting up the server
const server: express.Application = express();

// getting the Port from the Environment or fallback to port 3000
const port = process.env.PORT || 3000;

// setting up Cors, allow all origins as first solution
server.use(cors());

// Call the initializeDatabase method when the server starts
// initDatabase();

// ToDo: set up security and logging here

// connection of the server to the port
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${port}`);
});

// setting up routes
server.use('/api', apiRouter);
