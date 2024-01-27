import { describe, expect, it } from '@jest/globals';
import { IssueIF } from '../IssueIF';

describe('IssueIF', () => {
  it('should have correct properties', () => {
    const issue: IssueIF = {
      id: 1,
      name: 'Issue 1',
      description: 'This is issue 1',
      priority: 'high',
      issueType: 'bug',
      assignedTo: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john.doe@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
        status: 'active',
        key: 'john.doe',
      },
      createdBy: null,
      createdAt: new Date(),
      closedAt: null,
      dueTo: new Date(),
      status: 'open',
      assigneeRestingTime: null,
      statusRestingTime: null,
      statusChanges: [],
      assigneeChanges: [],
      state: 'open',
    };

    expect(issue).toHaveProperty('id');
    expect(typeof issue.id).toBe('number');
    expect(issue.id).toBe(1);

    expect(issue).toHaveProperty('name');
    expect(typeof issue.name).toBe('string');
    expect(issue.name).toBe('Issue 1');

    expect(issue).toHaveProperty('description');
    expect(typeof issue.description).toBe('string');
    expect(issue.description).toBe('This is issue 1');

    expect(issue).toHaveProperty('priority');
    expect(typeof issue.priority).toBe('string');
    expect(issue.priority).toBe('high');

    expect(issue).toHaveProperty('issueType');
    expect(typeof issue.issueType).toBe('string');
    expect(issue.issueType).toBe('bug');

    expect(issue).toHaveProperty('assignedTo');
    expect(typeof issue.assignedTo).toBe('object');

    expect(issue).toHaveProperty('assigneeRestingTime');
    expect(typeof issue.assigneeRestingTime).toBe('object');
    expect(issue.assigneeRestingTime).toBe(null);

    expect(issue).toHaveProperty('createdBy');
    expect(typeof issue.createdBy).toBe('object');
    expect(issue.createdBy).toBe(null);

    expect(issue).toHaveProperty('createdAt');
    expect(typeof issue.createdAt).toBe('object');

    expect(issue).toHaveProperty('closedAt');
    expect(typeof issue.closedAt).toBe('object');
    expect(issue.closedAt).toBe(null);

    expect(issue).toHaveProperty('dueTo');
    expect(typeof issue.dueTo).toBe('object');

    expect(issue).toHaveProperty('status');
    expect(typeof issue.status).toBe('string');
    expect(issue.status).toBe('open');

    expect(issue).toHaveProperty('statusRestingTime');
    expect(typeof issue.statusRestingTime).toBe('object');
    expect(issue.statusRestingTime).toBe(null);

    expect(issue).toHaveProperty('statusChanges');
    expect(typeof issue.statusChanges).toBe('object');

    expect(issue).toHaveProperty('assigneeChanges');
    expect(typeof issue.assigneeChanges).toBe('object');
  });
});
