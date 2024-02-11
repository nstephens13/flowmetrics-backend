import type { IssueIF } from './Issue/IssueIF';
/**
 *
 * @prop {number} id project id
 * @prop {string} name the name of the project
 * @prop {string} description the description of the project
 * @prop {Issue[]} issues a array of Issues - objects that are assigned to the project
 * but not to a milestone
 */
export interface ProjectIF {
  id: number;
  name: string;
  description: string;
  issues: IssueIF[];
}
