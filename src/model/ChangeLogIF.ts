import { EmployeeIF } from "./EmployeeIF";

enum ChangeType {
    statusChange = "status",
    assigneeChange = "assignee",
}

/**
 * 
 * @prop {number} id the id of the change
 * @prop {string} changeType the type of change	
 * @prop {Date} created the date and time when the change was made
 * @prop {EmployeeIF} author the employee who made the change
 * @prop {string | EmployeeIF} from the old value before the change
 * @prop {string | EmployeeIF} to the new value after the change
 */
export interface ChangeLogIF {
    id: number;
    changeType: ChangeType | null;
    created: Date | null;
    author: EmployeeIF | null;
    from: ChangeType extends ChangeType.assigneeChange ? EmployeeIF : string | null;
    to: ChangeType extends ChangeType.assigneeChange ? EmployeeIF : string | null;
}