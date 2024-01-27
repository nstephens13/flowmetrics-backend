import type { DurationLikeObject } from 'luxon';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/Issue/IssueIF';
import type { ChangeLogIF } from '@/model/Issue/ChangeLogIF';

// Issue Class implements IssueIF
class Issue implements IssueIF {
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

  state: string | null;

  static planningStatusList: any;

  constructor(
    id: number,
    name: string,
    description: string | null,
    priority: string | null,
    issueType: string | null,
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
    state: string | null
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.issueType = issueType;
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
    this.state = state;
  }
}

// export of data array and remain time for ticket calculation
export default { Issue };
