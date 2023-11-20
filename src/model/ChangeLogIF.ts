import { ChangeIF } from "./ChangeIF";

/**
 * 
 * @prop {number} id the id of the changelog
 * @prop {number} totalchanges the total number of changes
 * @prop {ChangeIF[]} changes the list of changes
 */
export interface ChangeLogIF {
    id: number;
    totalchanges: number;
    changes: ChangeIF[] | null;
}