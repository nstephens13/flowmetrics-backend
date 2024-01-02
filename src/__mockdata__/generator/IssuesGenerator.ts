import { faker } from '@faker-js/faker';
import type { IssueIF } from '@/model/Issue/IssueIF';
import {
  getWorkflow,
  getRandomEmployee,
  getRandomInt,
  issueTypes,
  getDateAndTimeInPast,
  getRandomIntBetween,
} from '@/__mockdata__/generator/HelperFunctions';
import { generateAssigneeChanges, generateStatusChanges } from './ChangeLogGenerator';
import type { EmployeeIF } from '@/model/EmployeeIF';

function getIssue(issueNumber: number, issueTypeNumber: number): IssueIF {
  const issueType = issueTypes[issueTypeNumber];
  const workflow = getWorkflow(issueType);
  const issueStatus: string =
    issueType === 'zombie'
      ? workflow.statuses[getRandomIntBetween(9, 14)].status
      : workflow.statuses[getRandomInt(workflow.statuses.length)].status;
  const createdDate: Date =
    issueType === 'zombie'
      ? faker.date.past({ refDate: getDateAndTimeInPast(30) })
      : faker.date.past({ refDate: getDateAndTimeInPast(4) });
  const assigneedEmployee: EmployeeIF = getRandomEmployee();
  const generatedStatusChanges = generateStatusChanges(
    issueType,
    issueNumber,
    issueStatus,
    createdDate
  );
  const generatedAssigneeChanges = generateAssigneeChanges(
    issueType,
    issueNumber,
    assigneedEmployee,
    createdDate
  );
  const closedDate: Date | null =
    issueStatus === 'closed'
      ? generatedStatusChanges && generatedStatusChanges[generatedStatusChanges.length - 1]?.created
      : null;
  return {
    id: issueNumber,
    name: `${issueTypes[issueTypeNumber]} : ${faker.hacker.adjective()}`,
    description: `${faker.hacker.phrase()}`,
    assignedTo: assigneedEmployee,
    createdBy: getRandomEmployee(),
    createdAt: createdDate,
    closedAt: closedDate,
    dueTo: faker.date.future(),
    status: issueStatus,
    statusChanges: generatedStatusChanges,
    assigneeChanges: generatedAssigneeChanges,
    assigneeRestingTime: null, // function already in backend
    statusRestingTime: null, // function already in backend
    assignedSlaRule: null,
  } as IssueIF;
}

export default function generateIssues(projectId: number, numberOfIssues: number): IssueIF[] {
  const issues: IssueIF[] = [];
  for (let i = 1; i <= numberOfIssues; i++) {
    const issueId = projectId * 100 + i;
    issues.push(getIssue(issueId, getRandomInt(issueTypes.length)));
  }
  return issues;
}
