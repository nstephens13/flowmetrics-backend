import { describe, expect, it } from '@jest/globals';
import type { EmployeeIF } from '../EmployeeIF';

describe('EmployeeIF', () => {
  it('should have correct properties', () => {
    const employee: EmployeeIF = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john.doe@example.com',
      avatarUrl: 'https://example.com/avatar.jpg',
      status: 'active',
    };

    expect(employee).toHaveProperty('id');
    expect(typeof employee.id).toBe('number');
    expect(employee.id).toBe(1);

    expect(employee).toHaveProperty('firstName');
    expect(typeof employee.firstName).toBe('string');
    expect(employee.firstName).toBe('John');

    expect(employee).toHaveProperty('lastName');
    expect(typeof employee.lastName).toBe('string');
    expect(employee.lastName).toBe('Doe');

    expect(employee).toHaveProperty('emailAddress');
    expect(typeof employee.emailAddress).toBe('string');
    expect(employee.emailAddress).toBe('john.doe@example.com');

    expect(employee).toHaveProperty('avatarUrl');
    expect(typeof employee.avatarUrl).toBe('string');
    expect(employee.avatarUrl).toBe('https://example.com/avatar.jpg');

    expect(employee).toHaveProperty('status');
    expect(typeof employee.status).toBe('string');
    expect(employee.status).toBe('active');
  });
});
