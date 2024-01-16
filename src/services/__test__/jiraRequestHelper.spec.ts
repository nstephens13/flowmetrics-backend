import { describe, it, expect } from '@jest/globals';
import axios from 'axios';
import { fetchUserInfo } from '../jiraRequestHelper';

jest.mock('axios');

describe('jiraRequestHelper fetchUserInfo', () => {
    it('fetchUserInfo makes request and returns myself user info', async () => {
        // Mock axios.get function 
        (axios.get as jest.Mock).mockResolvedValue({
            data: {
                id: 48,
                firstName: 'Henry', 
                lastName: 'Lopez',
                status: 'active',
                assignedIssues: [],
                emailAdress: 'henry.lopez@email.com',
                avatarURL: 'none',
                key: 'hlopez', 
            }
        });

        const userInfo = await fetchUserInfo();

        expect(userInfo).toEqual({
            id: 48,
            firstName: 'Henry', 
            lastName: 'Lopez',
            status: 'active',
            assignedIssues: [],
            emailAdress: 'henry.lopez@email.com',
            avatarURL: 'none',
            key: 'hlopez',
        });
    });
});