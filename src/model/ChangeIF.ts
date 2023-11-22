import { EmployeeIF } from "./EmployeeIF";

export enum ChangeType {
    statusChange = "status",
    assigneeChange = "assignee",
}

/**
 * @prop {ChangeType} changeType the type of change
 * @prop {string | EmployeeIF} from the old value before the change
 * @prop {string | EmployeeIF} to the new value after the change
 */
export interface ChangeIF {
    changeType: ChangeType | null;
    from: ChangeType extends ChangeType.assigneeChange ? EmployeeIF : string | null;
    to: ChangeType extends ChangeType.assigneeChange ? EmployeeIF : string | null;
}