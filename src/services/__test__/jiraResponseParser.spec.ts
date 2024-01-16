import { describe, it, expect } from '@jest/globals';
import { parseEmployee, parseDate } from '../jiraResponseParser';

describe('jiraResponseParser', () => {
  it('parseEmployee correctly parses employee', () => {
    const mockEmployeeJSON = {
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

    const parsedEmployee = parseEmployee(mockEmployeeJSON);

    expect(parsedEmployee).toEqual(expectedEmployee);
  });

  it('parseDate correctly parses date', () => {
    const mockDate = '2023-05-17T10:00:00Z';
    const expectedDate = new Date(mockDate);

    const parsedDate = parseDate(mockDate);

    expect(parsedDate).toEqual(expectedDate);
  });
});
