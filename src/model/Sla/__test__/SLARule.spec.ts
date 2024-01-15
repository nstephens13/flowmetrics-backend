import { describe, it, expect } from '@jest/globals';
import { SlaRule } from '../SlaRule';

describe('SLARule', () => {
  it('should have correct properties', () => {
    const slaRule: SlaRule = {
      id: 1,
      name: 'SLA Rule 1',
      reactionTimeInDays: 1,
      expirationDate: new Date(),
      occurredIn: 'open',
      priority: 'high',
      issueType: ['bug'],
    };

    expect(slaRule).toHaveProperty('id');
    expect(typeof slaRule.id).toBe('number');
    expect(slaRule.id).toBe(1);

    expect(slaRule).toHaveProperty('name');
    expect(typeof slaRule.name).toBe('string');
    expect(slaRule.name).toBe('SLA Rule 1');

    expect(slaRule).toHaveProperty('reactionTimeInDays');
    expect(typeof slaRule.reactionTimeInDays).toBe('number');
    expect(slaRule.reactionTimeInDays).toBe(1);

    expect(slaRule).toHaveProperty('expirationDate');
    expect(typeof slaRule.expirationDate).toBe('object');

    expect(slaRule).toHaveProperty('occurredIn');
    expect(typeof slaRule.occurredIn).toBe('string');
    expect(slaRule.occurredIn).toBe('open');

    expect(slaRule).toHaveProperty('priority');
    expect(typeof slaRule.priority).toBe('string');
    expect(slaRule.priority).toBe('high');

    expect(slaRule).toHaveProperty('issueType');
    expect(typeof slaRule.issueType).toBe('object');
  });
});
