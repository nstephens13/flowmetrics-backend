import { describe, expect, it } from '@jest/globals';
import { IssueIF } from '../IssueIF';
import { EmployeeIF } from '../EmployeeIF';

describe('IssueIF', () => {
  it('should have correct properties', () => {
    const issue: IssueIF = {
      id: 1,
      name: 'Issue 1',
      description: 'This is issue 1',
      assignedTo: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john.doe@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
        status: 'active',
      },
      assigneeRestingTime: null,
      createdBy: null,
      createdAt: new Date(),
      closedAt: null,
      dueTo: new Date(),
      status: 'open',
      statusRestingTime: null,
      statusChanges: [],
      assigneeChanges: [],
      assignedSLARule: [],
    };

    expect(issue).toHaveProperty('id');
    expect(typeof issue.id).toBe('number');

    expect(issue).toHaveProperty('name');
    expect(typeof issue.name).toBe('string');

    expect(issue).toHaveProperty('description');
    expect(typeof issue.description).toBe('string');

    expect(issue).toHaveProperty('assignedTo');
    expect(typeof issue.assignedTo).toBe('object');

    expect(issue).toHaveProperty('assigneeRestingTime');
    expect(typeof issue.assigneeRestingTime).toBe('object');

    expect(issue).toHaveProperty('createdBy');
    expect(typeof issue.createdBy).toBe('object');

    expect(issue).toHaveProperty('createdAt');
    expect(typeof issue.createdAt).toBe('object');

    expect(issue).toHaveProperty('closedAt');
    expect(typeof issue.closedAt).toBe('object');

    expect(issue).toHaveProperty('dueTo');
    expect(typeof issue.dueTo).toBe('object');

    expect(issue).toHaveProperty('status');
    expect(typeof issue.status).toBe('string');

    expect(issue).toHaveProperty('statusRestingTime');
    expect(typeof issue.statusRestingTime).toBe('object');

    expect(issue).toHaveProperty('statusChanges');
    expect(typeof issue.statusChanges).toBe('object');

    expect(issue).toHaveProperty('assigneeChanges');
    expect(typeof issue.assigneeChanges).toBe('object');

    expect(issue).toHaveProperty('assignedSLARule');
    expect(typeof issue.assignedSLARule).toBe('object');
  });
});
