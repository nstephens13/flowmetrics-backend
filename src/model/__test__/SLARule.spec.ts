import { describe, it, expect } from '@jest/globals';
import { SLARule } from '../SLARule';

describe('SLARule', () => {
  it('should have correct properties', () => {
    const SLARule: SLARule = {
      id: 1,
      name: 'SLA Rule 1',
      durationInDays: 1,
      expirationDate: new Date(),
      maxAssignedEmployees: 5,
      occurredIn: 'open',
    };

    expect(SLARule).toHaveProperty('id');
    expect(typeof SLARule.id).toBe('number');
    expect(SLARule.id).toBe(1);

    expect(SLARule).toHaveProperty('name');
    expect(typeof SLARule.name).toBe('string');
    expect(SLARule.name).toBe('SLA Rule 1');

    expect(SLARule).toHaveProperty('durationInDays');
    expect(typeof SLARule.durationInDays).toBe('number');
    expect(SLARule.durationInDays).toBe(1);

    expect(SLARule).toHaveProperty('expirationDate');
    expect(typeof SLARule.expirationDate).toBe('object');

    expect(SLARule).toHaveProperty('maxAssignedEmployees');
    expect(typeof SLARule.maxAssignedEmployees).toBe('number');
    expect(SLARule.maxAssignedEmployees).toBe(5);

    expect(SLARule).toHaveProperty('occurredIn');
    expect(typeof SLARule.occurredIn).toBe('string');
    expect(SLARule.occurredIn).toBe('open');
  });
});
