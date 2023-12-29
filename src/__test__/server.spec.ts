import request from 'supertest';
import express from 'express';
import apiRouter from '../router';

const app = express();

app.use('/api', apiRouter);

describe('Server Test', () => {
  it('should respond with a welcome message', async () => {
    const response = await request(app).get('/api/myself');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      assignedIssues: [],
      emailAddress: 'john.doe@email.com',
      firstName: 'John',
      id: 1,
      lastName: 'Doe',
      status: 'active',
    });
  });

  it('should respond with 404 for non-existing route', async () => {
    const response = await request(app).get('/non-existing-route');

    expect(response.status).toBe(404);
  });
});
