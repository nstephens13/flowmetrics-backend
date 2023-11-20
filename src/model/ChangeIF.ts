import { EmployeeIF } from "./EmployeeIF";

/**
 * 
 * @prop {string} type the type of change either 'status' or 'Assignee'
 * @prop {Date} created the date and time when the change was made
 * @prop {EmployeeIF} author the employee who made the change
 * @prop {string} from the previous value before the change
 * @prop {string} to the new value after the change
 */
export interface ChangeIF {
    type: string;
    created: Date;
    author: EmployeeIF;
    from: string | null;
    to: string | null;
}