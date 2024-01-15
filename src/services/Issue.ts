import type { DurationLikeObject } from 'luxon';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/Issue/IssueIF';
import type { SlaRule } from '@/model/Sla/SlaRule';
import type { ChangeLogIF } from '@/model/Issue/ChangeLogIF';

// Issue Class implements IssueIF
class Issue implements IssueIF {
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

  static planningStatusList: string[];

  constructor(
    id: number,
    name: string,
    description: string | null,
    assignedTo: EmployeeIF | null,
    createdBy: EmployeeIF,
    createdAt: Date,
    closedAt: Date | null,
    dueTo: Date | null,
    status: string | null,
    assigneeRestingTime: DurationLikeObject | null,
    statusRestingTime: DurationLikeObject | null,
    statusChanges: ChangeLogIF[],
    assigneeChanges: ChangeLogIF[],
    assignedSlaRule: SlaRule[],
    state: string | null
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.assignedTo = assignedTo;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.closedAt = closedAt;
    this.dueTo = dueTo;
    this.status = status;
    this.assigneeRestingTime = assigneeRestingTime;
    this.statusRestingTime = statusRestingTime;
    this.statusChanges = statusChanges;
    this.assigneeChanges = assigneeChanges;
    this.assignedSlaRule = assignedSlaRule;
    this.state = state;
  }
}

// Define lists of different category with statuses
const planningStatusList: string[] = ['planned', 'design', 'open'];
const devStatusList: string[] = ['in work', 'review', 'in progress'];
const testingStatusList: string[] = ['unit test', 'e2e'];
const nonDisplayedStatusList: string[] = ['closed'];
const nonDisplayedStateList: string[] = [''];

// Function sets State using Issue-Status
function assignStateToIssue(issue: Issue): string | null {
  const status = issue.status || '';

  if (planningStatusList.includes(status)) {
    return 'planning';
  }
  if (devStatusList.includes(status)) {
    return 'development';
  }
  if (testingStatusList.includes(status)) {
    return 'testing';
  }
  if (nonDisplayedStatusList.includes(status)) {
    return null;
  }
  return 'undefined';
}
/**
 * Returns the name of the employee assigned to the issue.
 * @param issue - The Issue object.
 * @returns The assigned employee's name.
 */

function getAssignedToName(issue: Issue): string {
  if (issue.assignedTo) {
    return `${issue.assignedTo.firstName} ${issue.assignedTo.lastName}`;
  }
  return '';
}

/**
 * Returns the formatted due date of the issue.
 * @param issue - The Issue object.
 * @returns The formatted due date string.
 */
function getFormattedDate(issue: Issue): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return issue.dueTo ? issue.dueTo.toLocaleDateString('en-US', options) : '';
}

/**
 * Returns the number of days left until the due date of the issue.
 * @param issue - The Issue object.
 * @returns The number of days left, or null if no due date is set.
 */
function getTimeLeft(issue: Issue): number | null {
  if (issue.dueTo) {
    const currentTime = new Date().getTime();
    const dueTime = issue.dueTo.getTime();
    const timeLeft = Math.max(0, dueTime - currentTime);
    return Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
  }
  return null;
}

/**
 * Counts the number of issues in the given issue list with the specified status.
 * If the status is null, counts all the issues in the list.
 * @param issueList - The list of issues.
 * @param status - The status of the issues to count.
 * @returns The count of issues.
 */
function countIssuesByStatus(issueList: Issue[], status: string | null): number {
  return (status ? issueList.filter((issue) => issue.status === status) : issueList).length;
}

/**
 * Returns SLA-Rules assigned to an Issue
 * @returns The Array of SLARules assigned to an Issue, can be null
 */
function getSlaRules(issue: Issue) {
  return issue.assignedSlaRule ?? [];
}

// export of data array and remain time for ticket calculation
export {
  Issue,
  getTimeLeft,
  getFormattedDate,
  getAssignedToName,
  countIssuesByStatus,
  getSlaRules,
  assignStateToIssue,
  planningStatusList,
  devStatusList,
  testingStatusList,
  nonDisplayedStatusList,
  nonDisplayedStateList,
};
