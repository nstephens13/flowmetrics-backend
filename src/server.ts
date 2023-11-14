import express from 'express';
import cors from 'cors';
import apiRouter from "./router";
import dotenv from 'dotenv';

dotenv.config();

// setting up the server
const server: express.Application = express();

//getting the Port from the Environment or fallback to port 3000
const port = process.env.PORT || 3000;

//setting up Cors, allow all origins as first solution
server.use(cors());

//ToDo: set up security and logging here

// connection of the server to the port
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//setting up routes
server.use('/api', apiRouter);