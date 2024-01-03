import type { ChangeLogIF } from '@/model/Issue/ChangeLogIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { ChangeIF } from '@/model/Issue/ChangeIF';
import { ChangeType } from '../../model/Issue/ChangeIF';
import {
  getRandomEmployee,
  getDatesBetween,
  getWorkflow,
  getRandomInt,
  getDateAndTimeInPast,
} from './HelperFunctions';

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
  if (currentStatusIndex === 0) {
    return null;
  }
  const changesDates = getDatesBetween(createdDate, new Date(), currentStatusIndex);
  for (let i = 0; i < currentStatusIndex; i++) {
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

export function generateAssigneeChanges(
  issueType: string,
  issueNumber: number,
  currentAssignee: EmployeeIF,
  createdDate: Date
): ChangeLogIF[] | null {
  const changeLogs: ChangeLogIF[] = [];
  const numberofAssigneeChanges = getRandomInt(10);
  const assigneeChangesDates =
    issueType === 'zombie'
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
