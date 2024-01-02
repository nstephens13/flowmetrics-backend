import { Duration, DurationLikeObject } from 'luxon';
import { ChangeLogIF } from '@/model/Issue/ChangeLogIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/Issue/IssueIF';
import { getTimeDifference } from './timeCalculator';
import { ChangeIF, ChangeType } from '../model/Issue/ChangeIF';

/**
 * @description function to extract the first and last name from the display name
 *
 * @param displayName display name of the employee
 * @returns first and last name as an object
 */
function extractNames(displayName: string): {
  firstName: string;
  lastName: string;
} {
  const commaIndex = displayName.indexOf(',');

  if (commaIndex === -1) {
    throw new Error('Invalid display name format. Expected format: "LastName, FirstName".');
  }

  const lastName = displayName.slice(0, commaIndex).trim();
  const firstName = displayName.slice(commaIndex + 1).trim();

  return { firstName, lastName };
}

/**
 * @description function to parse the employee to a EmployeeIF
 *
 * @param employeeJSON parsed response from jira
 * @returns employee as a EmployeeIF or null if response is null
 */
export function parseEmployee(employeeJSON: any): EmployeeIF | null {
  if (employeeJSON == null) {
    return null;
  }
  const { firstName, lastName } = extractNames(employeeJSON.displayName);
  return {
    id: employeeJSON.key,
    firstName,
    lastName,
    emailAddress: 'none',
    avatarUrl: 'none',
    status: 'inactive',
    key: 'none',
  };
}

/**
 * @description function to parse the date to a Date
 *
 * @param response parsed response from jira
 * @returns date as a Date or null if response is null
 */
export function parseDate(response: any): Date | null {
  if (response != null) {
    return new Date(response);
  }
  return null;
}

/**
 * @description function to parse the issues to a IssueIF
 *
 * @param response parsed response from jira
 * @returns issue as a IssueIF or null if response is null
 */
export function parseIssue(response: any): IssueIF | null {
  if (response == null) {
    return null;
  }

  const assignedTo: EmployeeIF | null = parseEmployee(response.fields.assignee);
  const createdBy: EmployeeIF | null = parseEmployee(response.fields.creator);
  const createdAt: Date | null = parseDate(response.fields.created);
  const dueTo: Date | null = parseDate(response.fields.duedate);
  const changelog: ChangeLogIF[] | null = parseChangeLog(response.changelog);
  const statusChanges: ChangeLogIF[] | null = parseChangeType(changelog, ChangeType.statusChange);
  const assigneeChanges: ChangeLogIF[] | null = parseChangeType(
    changelog,
    ChangeType.assigneeChange
  );
  const assigneeRestingTime: DurationLikeObject | null = getTimeDifference(
    assigneeChanges?.[assigneeChanges?.length - 1] as ChangeLogIF
  );
  const statusRestingTime: DurationLikeObject | null = getTimeDifference(
    statusChanges?.[statusChanges?.length - 1] as ChangeLogIF
  );

  const issue: IssueIF = {
    id: response?.id,
    name: response.fields?.summary,
    description: response.fields?.description,
    assignedTo,
    assigneeRestingTime,
    createdBy,
    createdAt,
    closedAt: null,
    dueTo,
    status: null,
    statusRestingTime,
    statusChanges,
    assigneeChanges,
    assignedSlaRule: null,
    state: null,
  };
  return issue;
}

/**
 * @description function to parse the changelog to a ChangeLogIF[]
 *
 * @param response parsed response from jira
 * @returns changelog as a ChangeLogIF[] or null if response is null
 */
export function parseChangeLog(response: any): ChangeLogIF[] | null {
  if (response == null) {
    return null;
  }
  const changeLogs: ChangeLogIF[] = response?.histories
    ?.map((history: any) => {
      if (history === null) {
        return null;
      }
      const changes = parseChangeHistory(history.items);
      if (changes?.length === 0) {
        return null;
      }
      const change: ChangeLogIF = {
        id: history.id,
        created: parseDate(history.created),
        author: parseEmployee(history.author),
        changes,
      };
      return change;
    })
    .filter((changeLog: ChangeLogIF | null) => changeLog !== null);
  return changeLogs;
}

/**
 * @description function to parse each item from history to a ChangeIF
 *
 * @param items parsed items from history
 * @returns items as a ChangeIF[] or null if response is null
 */
function parseChangeHistory(items: any): ChangeIF[] | null {
  if (items === null) {
    return null;
  }
  const changeHistories: ChangeIF[] = items
    ?.map((itemJSON: any) => {
      let changeType: ChangeType | null = null;
      switch (itemJSON.field) {
        case ChangeType.assigneeChange:
          changeType = ChangeType.assigneeChange;
          break;
        case ChangeType.statusChange:
          changeType = ChangeType.statusChange;
          break;
        default:
          break;
      }
      if (changeType === null) {
        return null;
      }
      const changeHistory: ChangeIF = {
        changeType,
        from: itemJSON.fromString,
        to: itemJSON.toString,
      };
      return changeHistory;
    })
    .filter((changeHistory: ChangeIF | null) => changeHistory !== null);
  return changeHistories;
}

/**
 * @description function to parse the changes of specific changeType to a ChangeLogIF[]
 *
 * @param changeLog parsed changelog
 * @param changeType the type of change
 * @returns changelog as a ChangelogIF[] or null if response is null
 */
function parseChangeType(
  changeLog: ChangeLogIF[] | null,
  changeType: ChangeType
): ChangeLogIF[] | null {
  if (changeLog === null) {
    return null;
  }
  const changeLogs: ChangeLogIF[] = (
    changeLog?.map((history: ChangeLogIF) => {
      const changes =
        history.changes?.filter((change: ChangeIF) => change.changeType === changeType) || [];
      if (changes.length === 0) {
        return null;
      }
      const change: ChangeLogIF = {
        id: history.id,
        created: history.created,
        author: history.author,
        changes,
      };
      return change;
    }) || []
  ).filter((changeLog: ChangeLogIF | null): changeLog is ChangeLogIF => changeLog !== null);
  return changeLogs;
}
