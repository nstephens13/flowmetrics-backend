/**
 * @prop {number} id the id of the SLA rule
 * @prop {string} name the name of the SLA rule
 * @prop {number} durationInDays the duration in days of the SLA rule
 * @prop {Date} expirationDate the expiration date of the SLA rule
 * @prop {number} maxAssignedEmployees the maximum number of employees that can be assigned to the SLA rule
 * @prop {string} occurredIn the status in which the SLA rule is active
 */
export interface SLARule {
  id: number | null;
  name: string | null;
  durationInDays: number | null;
  expirationDate: Date | null;
  maxAssignedEmployees: number | null;
  occurredIn: string | null;
}
