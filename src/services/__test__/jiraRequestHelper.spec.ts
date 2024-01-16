import { describe, it, expect } from '@jest/globals';
import axios from 'axios';
import { fetchUserInfo } from '../jiraRequestHelper';

jest.mock('axios');

describe('jiraRequestHelper fetchUserInfo', () => {
  it('fetchUserInfo makes request and returns correct properties', async () => {
    // Mock axios.get function
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        id: expect(Number),
        firstName: expect(String),
        lastName: expect(String),
        status: expect(String),
        assignedIssues: expect(Array),
        emailAddress: expect(String),
        avatarUrl: expect(String),
        key: expect(String),
      },
    });

    const userInfo = await fetchUserInfo();

    expect(userInfo).toHaveProperty('id');
    expect(userInfo).toHaveProperty('firstName');
    expect(userInfo).toHaveProperty('lastName');
    expect(userInfo).toHaveProperty('status');
    expect(userInfo).toHaveProperty('assignedIssues');
    expect(userInfo).toHaveProperty('emailAddress');
    expect(userInfo).toHaveProperty('key');
  });
});
