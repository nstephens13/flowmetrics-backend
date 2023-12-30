import type { EmployeeIF } from '@/model/EmployeeIF';
import type { ChangeIF } from '@/model/Issue/ChangeIF';
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
  created: Date | null;
  author: EmployeeIF | null;
  changes: ChangeIF[] | null;
}
