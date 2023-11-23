import { ChangeIF, ChangeType } from "../model/ChangeIF";
import { ChangeLogIF } from "../model/ChangeLogIF";
import type { EmployeeIF } from "../model/EmployeeIF";
import type { IssueIF } from "../model/IssueIF";

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
  const commaIndex = displayName.indexOf(",");

  if (commaIndex === -1) {
    throw new Error(
      'Invalid display name format. Expected format: "LastName, FirstName".'
    );
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
  const employee: EmployeeIF = {
    id: employeeJSON.key,
    firstName,
    lastName,
    emailAddress: "none",
    avatarUrl: "none",
    status: "inactive",
  };
  return employee;
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
  const issue: IssueIF = {
    id: response?.id,
    name: response.fields?.summary,
    description: response.fields?.description,
    assignedTo: parseEmployee(response.fields.assignee),
    createdBy: parseEmployee(response.fields.creator),
    createdAt: parseDate(response.fields.created),
    closedAt: null,
    dueTo: parseDate(response.fields.duedate),
    status: null,
    statusChanges: null,
    lastStatusChange: parseDate(null),
    assignedSLARule: null,
    changelog: parseChangeLog(response.changelog),
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
  const changeLogs: ChangeLogIF[] = response?.histories?.map((history: any) =>
    {
      if (history === null) {
        return null;
      }
      let changes = parseChangeHistory(history.items);
      if (changes?.length === 0) {
        return null;
      } else {
        const change: ChangeLogIF = {
          id: history.id,
          created: parseDate(history.created),
          author: parseEmployee(history.author),
          changes: changes,
        };
        return change;
      }
    }
  ).filter((changeLog: ChangeLogIF | null) => changeLog !== null);
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
  const changeHistories: ChangeIF[] = items?.map((itemJSON: any) => {
      let changeType: ChangeType | null = null;
      if (itemJSON.field === ChangeType.assigneeChange) {
        changeType = ChangeType.assigneeChange;
      } else if (itemJSON.field === ChangeType.statusChange) {
        changeType = ChangeType.statusChange;
      }
      if (changeType === null) {
        return null;
      } else {
        const changeHistory: ChangeIF = {
          changeType,
          from: itemJSON.fromString,
          to: itemJSON.toString,
        };
        return changeHistory;
      }
    })
    .filter((changeHistory: ChangeIF | null) => changeHistory !== null);
  return changeHistories;
}
