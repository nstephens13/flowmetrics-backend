import type { DurationLikeObject } from 'luxon';

/**
 * Rule Interface
 * @prop {number} id rule id
 * @prop {string} name the name of the rule
 * @prop {DurationLikeObject} reactionTime the reaction time of the rule
 * @prop {Date} expirationDate the expiration date of the rule
 * @prop {string} occurredIn the occurred in of the rule
 * @prop {string} priority the priority of the rule
 * @prop {string[]} issueType the issue types of the rule
 */
export interface RuleIF {
  id: number;
  name: string | null;
  reactionTime: DurationLikeObject | null;
  expirationDate: Date | null;
  occurredIn: string | null;
  priority: string[] | null;
  issueType: string;
}
