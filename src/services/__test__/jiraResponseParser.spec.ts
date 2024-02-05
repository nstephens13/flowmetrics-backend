import { describe, it, expect } from '@jest/globals';
import { parseEmployee, parseDate, parseIssue } from '../jiraResponseParser';
import { IssueIF, IssueJiraDTO } from '../../model/Issue/IssueIF';

describe('jiraResponseParser', () => {
  it('parseEmployee correctly parses employee', () => {
    const mockEmployeeJiraDTO = {
      key: 5,
      displayName: 'Doe, John',
    };

    const expectedEmployee = {
      id: 5,
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'none',
      avatarUrl: 'none',
      status: 'inactive',
      key: '5',
    };

    const parsedEmployee = parseEmployee(mockEmployeeJiraDTO);

    expect(parsedEmployee).toEqual(expectedEmployee);
  });

  it('parseDate correctly parses date', () => {
    const mockDate = '2023-05-17T10:00:00Z';
    const expectedDate = new Date(mockDate);

    const parsedDate = parseDate(mockDate);

    expect(parsedDate).toEqual(expectedDate);
  });

  it('parseIssue correctly parses issue', () => {
    const mockIssueJiraDTO: IssueJiraDTO = {
      id: 1,
      fields: {
        summary: 'Test Issue',
        description: 'Test Description',
        assignee: null,
        creator: null,
        created: new Date('2023-05-17T10:00:00Z'),
        duedate: null,
        priority: null,
        issuetype: null,
      },
      changelog: {
        histories: [],
      },
    };

    const expectedIssue: IssueIF = {
      id: 1,
      name: 'Test Issue',
      description: 'Test Description',
      priority: null,
      issueType: null,
      assignedTo: null,
      createdBy: null,
      createdAt: new Date('2023-05-17T10:00:00Z'),
      closedAt: null,
      dueTo: null,
      status: null,
      assigneeRestingTime: null,
      statusRestingTime: null,
      statusChanges: [],
      assigneeChanges: [],
      state: null,
    };

    const parsedIssue = parseIssue(mockIssueJiraDTO);

    expect(parsedIssue).toEqual(expectedIssue);
  });
});
