import { DurationLikeObject } from 'luxon';
import { ChangeIF, ChangeType } from '../model/ChangeIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import getTimeDifference from './timeCalculator';
import { EmployeeJiraDTO } from '@/model/EmployeeIF';
import { ChangeLogIF } from '@/model/Issue/ChangeLogIF';
import type { IssueIF, IssueJiraDTO } from '@/model/Issue/IssueIF';

/**
 * @description function to parse the changes of specific changeType to a ChangeLogIF[]
 *
 * @param changeLog parsed changelog
 * @param changeType the type of change
 * @returns changelog as a ChangelogIF[] or null if response is null
 */
function parseChangeType(changeLog: ChangeLogIF[] | null, changeType: ChangeType): ChangeLogIF[] {
  if (changeLog === null) {
    return [];
  }
  return (
    changeLog?.map((history: ChangeLogIF) => {
      const changes = history.changes ?? [];
      const filteredChanges = changes.filter((change) => change.changeType === changeType) || [];
      if (filteredChanges.length === 0) {
        return null;
      }
      const change: ChangeLogIF = {
        id: history.id,
        created: history.created,
        author: history.author,
        changes: filteredChanges,
      };
      return change;
    }) || []
  ).filter(
    (internalChangeLog: ChangeLogIF | null): internalChangeLog is ChangeLogIF => changeLog !== null
  );
}

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
export function parseEmployee(employeeJSON: EmployeeJiraDTO): EmployeeIF | null {
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
    key: employeeJSON.key.toString(),
  };
}

/**
 * @description function to parse the date to a Date
 *
 * @param response parsed response from jira
 * @returns date as a Date or null if response is null
 */
export function parseDate(response: string): Date | null {
  if (response != null) {
    return new Date(response);
  }
  return null;
}

interface changeHistory {
  field: string;
  fromString: string;
  toString: string;
}

/**
 * @description function to parse each item from history to a ChangeIF
 *
 * @param items parsed items from history
 * @returns items as a ChangeIF[] or null if response is null
 */
function parseChangeHistory(items: changeHistory[]): ChangeIF[] {
  if (items === null) {
    return [];
  }
  const changes = items?.map((itemJSON: changeHistory) => {
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
  });

  return changes.filter((change: ChangeIF | null) => change !== null) as ChangeIF[];
}

interface history {
  items: changeHistory[];
  id: number;
  created: string;
  author: EmployeeJiraDTO;
}

interface ResponseChangelog {
  histories: history[];
}

/**
 * @description function to parse the changelog to a ChangeLogIF[]
 *
 * @param response parsed response from jira
 * @returns changelog as a ChangeLogIF[] or null if response is null
 */
export function parseChangeLog(response: ResponseChangelog): ChangeLogIF[] {
  if (response == null) {
    return [];
  }
  const changeLog = response?.histories?.map((history: history) => {
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
  });

  return changeLog?.filter((change: ChangeLogIF | null) => change !== null) as ChangeLogIF[];
}

/**
 * @description function to parse the issues to a IssueIF
 *
 * @param response parsed response from jira
 * @returns issue as a IssueIF or null if response is null
 */
export function parseIssue(response: IssueJiraDTO): IssueIF | null {
  if (response == null) {
    return null;
  }

  const assignedTo: EmployeeIF | null = parseEmployee(response.fields.assignee);
  const createdBy: EmployeeIF | null = parseEmployee(response.fields.creator);
  const createdAt: Date | null = parseDate(response.fields.created);
  const dueTo: Date | null = parseDate(response.fields.duedate);
  const changelog: ChangeLogIF[] | null = parseChangeLog(response.changelog);
  const statusChanges: ChangeLogIF[] = parseChangeType(changelog, ChangeType.statusChange);
  const assigneeChanges: ChangeLogIF[] = parseChangeType(changelog, ChangeType.assigneeChange);

  const assigneeRestingTime: DurationLikeObject | null = assigneeChanges
    ? getTimeDifference(assigneeChanges?.[assigneeChanges.length - 1] as ChangeLogIF)
    : null;

  const statusRestingTime: DurationLikeObject | null = assigneeChanges
    ? getTimeDifference(statusChanges?.[statusChanges.length - 1] as ChangeLogIF)
    : null;

  return {
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
}
