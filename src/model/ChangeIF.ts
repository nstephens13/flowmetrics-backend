import { EmployeeIF } from "./EmployeeIF";
// Types of changes in the changelog
type changeTypes = "status" | "assignee";
/**
 * 
 * @prop {string} changeType the type of the change (status or assignee)
 * @prop {Date} created the date and time when the change was made
 * @prop {EmployeeIF} author the employee who made the change
 * @prop {string} from the previous value before the change
 * @prop {string} to the new value after the change
 */
export interface ChangeIF {
    changeType: changeTypes | null;
    created: Date;
    author: EmployeeIF;
    from: string | null;
    to: string | null;
}