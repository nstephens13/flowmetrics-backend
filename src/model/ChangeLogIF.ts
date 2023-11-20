import { EmployeeIF } from "./EmployeeIF";
import { ChangeIF } from "./ChangeIF";


export interface ChangeLogIF {
    id: number;
    totalchanges: number;
    changes: ChangeIF[] | null;
}