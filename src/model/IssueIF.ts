import { ChangeLogIF } from './ChangeLogIF';
import type { EmployeeIF } from './EmployeeIF';
import type { SLARule } from './SLARule';
import { DurationLikeObject } from "luxon";

/**
 * 
 * @prop {number} id the id of the issue
 * @prop {string} name the name of the issue
 * @prop {string} description the description of the issue
 * @prop {EmployeeIF} assignedTo the employee the issue is assigned to
 * @prop {EmployeeIF} createdBy the employee who created the issue
 * @prop {Date} createdAt the date and time when the issue was created
 * @prop {Date} closedAt the date and time when the issue was closed
 * @prop {Date} dueTo the date and time when the issue is due
 * @prop {string} status the status of the issue
 * @prop {ChangeLogIF[]} statusChanges the status changes of the issue
 * @prop {ChangeLogIF[]} assigneeChanges the assignee changes of the issue
 * @prop {SLARule[]} assignedSLARule the SLA rule assigned to the issue
 * @prop {ChangeLogIF} changelog the changelog of the issue
 */
export interface IssueIF {
  id: number;
  name: string;
  description: string | null; 
  assignedTo: EmployeeIF | null;
  assigneeRestingTime: DurationLikeObject | null;
  createdBy: EmployeeIF | null; 
  createdAt: Date | null; 
  closedAt: Date | null; 
  dueTo: Date | null;
  status: string | null;
  statusRestingTime: DurationLikeObject | null;
  statusChanges: ChangeLogIF[] | null;
  assigneeChanges: ChangeLogIF[] | null;
  assignedSLARule: SLARule[] | null;
}
