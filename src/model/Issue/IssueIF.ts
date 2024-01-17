import type { DurationLikeObject } from 'luxon';
import type { EmployeeIF } from '../EmployeeIF';
import type { SlaRule } from '@/model/Sla/SlaRule';
import type { ChangeLogIF } from '@/model/Issue/ChangeLogIF';
import type { EmployeeJiraDTO } from '@/model/EmployeeIF';
import type { ResponseChangelog } from '@/services/jiraResponseParser';

/**
 *
 * @prop {number} id issue id
 * @prop {string} name the name of the issue
 * @prop {string| null} description the description of the issue
 * @prop {EmployeeIF| null} assignedTo the employee that is assigned to the issue
 * @prop {EmployeeIF} createdBy the employee that created the issue
 * @prop {Date} createdAt the Date when the issue was created
 * @prop {Date| null} closedAt the Date when the issue was closed
 * @prop {Date| null} dueTo Due date for the Issue
 * @prop {string} status the Status of issue-progress
 * @prop {DurationLikeObject} assigneeRestingTime the resting time for current assignee
 * @prop {DurationLikeObject} statusRestingTime the resting time for current status
 * @prop {ChangeLogIF[]} statusChanges All status changes on the issue
 * @prop {ChangeLogIF[]} assigneeChanges All assignee changes on the issue
 * @prop {SlaRule[]} assignedSlaRule assigned Sla Rule to the issue
 * @prop {Status} status the Status of issue-progress
 * @prop {Date} lastStatusChange the last status change of the issue
 * @prop {StatusChangesIF[]} statusChanges the status changes of the issue
 * @prop {SlaRule} assignedSlaRule the assigned SLA rule of the issue
 * @prop {ChangeEventIF[]} changelog the changelog of the issue
 * @prop {State} state the State of the status of issue-progress

 */

// Enum to set status of Issue
export interface IssueIF {
  id: number;
  name: string;
  description: string | null;
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
  assignedSlaRule: SlaRule[] | null;
  state: string | null;
}

// function to check if issue has an assigned SLA rule
export function hasSlaRule(issue: IssueIF): boolean {
  return issue.assignedSlaRule !== null;
}

// print assigned SLA rule names of issue
export function printSlaRuleNames(issue: IssueIF): string {
  if (issue.assignedSlaRule === null) {
    return '';
  }
  return issue.assignedSlaRule.map((rule) => rule.name).join(', ');
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
  };
  changelog: ResponseChangelog;
}
