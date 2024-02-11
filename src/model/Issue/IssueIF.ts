import type { DurationLikeObject } from 'luxon';
import type { EmployeeIF, EmployeeJiraDTO } from '../EmployeeIF';
import type { ChangeLogIF } from './ChangeLogIF';
import type { ResponseChangelog } from '../../services/jiraResponseParser';
import type { Category } from '../../__mockdata__/IssueProps/statusLists';

/**
 *
 * @prop {number} id issue id
 * @prop {string} name the name of the issue
 * @prop {string| null} description the description of the issue
 * @prop {string| null} priority the priority of the issue
 * @prop {string| null} issueType the type of the issue
 * @prop {EmployeeIF | null} assignedTo the employee the issue is assigned to
 * @prop {EmployeeIF | null} createdBy the employee who created the issue
 * @prop {Date | null} createdAt the date the issue was created
 * @prop {Date | null} closedAt the date the issue was closed
 * @prop {Date | null} dueTo the date the issue is due to
 * @prop {string | null} status the status of the issue
 * @prop {DurationLikeObject | null} assigneeRestingTime the resting time of the assignee
 * @prop {DurationLikeObject | null} statusRestingTime the resting time of the status
 * @prop {ChangeLogIF[] | null} statusChanges the changes of the status
 * @prop {ChangeLogIF[] | null} assigneeChanges the changes of the assignee
 * @prop {string | null} state the state of the issue
 */

// Enum to set status of Issue
export interface IssueIF {
  id: number;
  name: string;
  description: string | null;
  priority: string | null;
  issueType: string | null;
  assignedTo: EmployeeIF | null;
  createdBy: EmployeeIF | null;
  createdAt: Date | null;
  closedAt: Date | null;
  dueTo: Date | null;
  status: string | null;
  assigneeRestingTime: DurationLikeObject | null;
  statusRestingTime: DurationLikeObject | null;
  statusChanges: ChangeLogIF[] | null;
  assigneeChanges: ChangeLogIF[] | null;
  state: string | Category | null;
}

// define the shape of the response from jira
export interface IssueJiraDTO {
  id: number;
  fields: {
    summary: string;
    description: string;
    assignee: EmployeeJiraDTO | null;
    creator: EmployeeJiraDTO | null;
    created: Date | null;
    duedate: Date | null;
    priority: string | null;
    issuetype: string | null;
  };
  changelog: ResponseChangelog;
}
