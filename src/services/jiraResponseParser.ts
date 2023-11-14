import type { EmployeeIF } from '../model/EmployeeIF';
import type { IssueIF } from '../model/IssueIF';

function extractNames(displayName: string): { firstName: string, lastName: string } {
  const commaIndex = displayName.indexOf(',');

  if (commaIndex === -1) {
    throw new Error('Invalid display name format. Expected format: "LastName, FirstName".');
  }

  const lastName = displayName.slice(0, commaIndex).trim();
  const firstName = displayName.slice(commaIndex + 1).trim();

  return { firstName, lastName };
}

export function parseEmployee(employeeJSON: any) : EmployeeIF | null {
  if (employeeJSON == null) {
    return null;
  }
  const { firstName, lastName } = extractNames(employeeJSON.displayName);
  const employee: EmployeeIF = {
    id: employeeJSON.key,
    firstName,
    lastName,
    emailAddress: 'none',
    avatarUrl: 'none',
    status: "inactive"
  };
  return employee;
}

export function parseDate(response: any): Date | null {
  if (response != null) {
    return new Date(response);
  }
  return null;
}

export function parseIssue(response: any) : IssueIF | null {
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
    assignedSLARule: null
  };
  return issue;
}
