import type { ChangeLogIF } from '@/model/Issue/ChangeLogIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { ChangeIF } from '@/model/Issue/ChangeIF';
import { ChangeType } from '@/model/Issue/ChangeIF';
import {
  getRandomEmployee,
  getDatesBetween,
  getWorkflow,
  getRandomInt,
  getDateAndTimeInPast,
} from './HelperFunctions';
import IssueTypes from '@/__mockdata__/IssueProps/issueTypes';

/**
 * Function to generate an array of status changes for a given issue
 * @param issueType issue type of the issue
 * @param issueNumber issue number
 * @param currentStatus current status of the issue
 * @param createdDate date the issue was created
 * @returns an array of change logs
 * @author Nived Stephen
 */
export function generateStatusChanges(
  issueType: string,
  issueNumber: number,
  currentStatus: string,
  createdDate: Date
): ChangeLogIF[] | null {
  const changeLogs: ChangeLogIF[] = [];
  const workflow = getWorkflow(issueType);
  // get the index of the current status in the workflow
  const currentStatusIndex = workflow.statuses.findIndex(
    (status: { status: string }) => status.status === currentStatus
  );
  const changesDates = getDatesBetween(createdDate, new Date(), currentStatusIndex);
  if (currentStatusIndex === 0) {
    changeLogs.push({
      id: issueNumber * 100 + 1,
      created: changesDates[0],
      author: getRandomEmployee(),
      changes: [
        {
          changeType: ChangeType.statusChange,
          from: null,
          to: workflow.statuses[0].status,
        } as ChangeIF,
      ],
    });
    return changeLogs;
  }
  changeLogs.push({
    id: issueNumber * 100 + 1,
    created: changesDates[0],
    author: getRandomEmployee(),
    changes: [
      {
        changeType: ChangeType.statusChange,
        from: null,
        to: workflow.statuses[0].status,
      } as ChangeIF,
    ],
  });
  for (let i = 1; i < currentStatusIndex; i++) {
    const changeLog: ChangeLogIF = {
      id: issueNumber * 100 + i,
      created: changesDates[i],
      author: getRandomEmployee(),
      changes: [
        {
          changeType: ChangeType.statusChange,
          from: workflow.statuses[i].status,
          to: workflow.statuses[i + 1].status,
        } as ChangeIF,
      ],
    };
    changeLogs.push(changeLog);
  }
  return changeLogs;
}

/**
 * Function to generate an array of assignee changes for a given issue
 * @param issueType issue type of the issue
 * @param issueNumber issue number
 * @param currentPriority current priority of the issue
 * @param createdDate date the issue was created
 * @returns an array of change logs
 * @author Nived Stephen
 */
export function generateAssigneeChanges(
  issueType: string,
  issueNumber: number,
  currentAssignee: EmployeeIF,
  createdDate: Date
): ChangeLogIF[] | null {
  const changeLogs: ChangeLogIF[] = [];
  const numberofAssigneeChanges = getRandomInt(10);
  const assigneeChangesDates =
    issueType === IssueTypes.zombie
      ? getDatesBetween(createdDate, getDateAndTimeInPast(7), numberofAssigneeChanges)
      : getDatesBetween(createdDate, new Date(), numberofAssigneeChanges);
  let bufferEmployee1: EmployeeIF = getRandomEmployee(currentAssignee);
  let bufferEmployee2: EmployeeIF = getRandomEmployee(bufferEmployee1);
  for (let i = 0; i < numberofAssigneeChanges; i++) {
    const changeLog: ChangeLogIF = {
      id: issueNumber * 100 + i,
      created: assigneeChangesDates[i],
      author: getRandomEmployee(),
      changes: [
        {
          changeType: ChangeType.assigneeChange,
          from: bufferEmployee1,
          to: i === numberofAssigneeChanges - 1 ? currentAssignee : bufferEmployee2,
        } as ChangeIF,
      ],
    };
    changeLogs.push(changeLog);
    bufferEmployee1 = bufferEmployee2;
    bufferEmployee2 = getRandomEmployee(bufferEmployee1);
  }
  return changeLogs;
}
