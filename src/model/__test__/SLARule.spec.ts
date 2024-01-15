import { describe, it, expect } from '@jest/globals';
import { SLARule } from '../SLARule';

describe('SLARule', () => {
  it('should have correct properties', () => {
    const slaRule: SLARule = {
      id: 1,
      name: 'SLA Rule 1',
      durationInDays: 1,
      expirationDate: new Date(),
      maxAssignedEmployees: 5,
      occurredIn: 'open',
    };

    expect(slaRule).toHaveProperty('id');
    expect(typeof slaRule.id).toBe('number');
    expect(slaRule.id).toBe(1);

    expect(slaRule).toHaveProperty('name');
    expect(typeof slaRule.name).toBe('string');
    expect(slaRule.name).toBe('SLA Rule 1');

    expect(slaRule).toHaveProperty('durationInDays');
    expect(typeof slaRule.durationInDays).toBe('number');
    expect(slaRule.durationInDays).toBe(1);

    expect(slaRule).toHaveProperty('expirationDate');
    expect(typeof slaRule.expirationDate).toBe('object');

    expect(slaRule).toHaveProperty('maxAssignedEmployees');
    expect(typeof slaRule.maxAssignedEmployees).toBe('number');
    expect(slaRule.maxAssignedEmployees).toBe(5);

    expect(slaRule).toHaveProperty('occurredIn');
    expect(typeof slaRule.occurredIn).toBe('string');
    expect(slaRule.occurredIn).toBe('open');
  });
});
