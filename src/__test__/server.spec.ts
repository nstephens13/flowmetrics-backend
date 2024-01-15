import request from 'supertest';
import express from 'express';
import apiRouter from '../router';

const app = express();

app.use('/api', apiRouter);

// mock the fetchUserInfo function
jest.mock('../services/jiraRequestHelper', () => ({
  fetchUserInfo: jest.fn(() => ({
    assignedIssues: [],
    emailAddress: 'morgan.williams@email.com',
    firstName: 'Morgan',
    avatarUrl: 'none',
    lastName: 'Williams',
    id: 22,
    key: 'mwilliams',
    status: 'active',
  })),
}));

describe('Server Test', () => {
  it('test /api/myself', async () => {
    const response = await request(app).get('/api/myself');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      assignedIssues: [],
      emailAddress: 'morgan.williams@email.com',
      firstName: 'Morgan',
      avatarUrl: 'none',
      lastName: 'Williams',
      id: 22,
      key: 'mwilliams',
      status: 'active',
    });
  });

  it('should respond with 404 for non-existing route', async () => {
    const response = await request(app).get('/non-existing-route');

    expect(response.status).toBe(404);
  });
});
