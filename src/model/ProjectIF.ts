
import type { IssueIF } from './IssueIF';
import type {SLASubscriber} from "./SLASubscriber";

/**
 * 
 * @prop {number} id the id of the project
 * @prop {string} name the name of the project
 * @prop {string} description the description of the project
 * @prop {IssueIF[]} issues the issues of the project
 * @prop {SLASubscriber} slaSubscriber the sla subscriber of the project
 */
export interface ProjectIF {
  id: number;
  name: string;
  description: string;
  issues: IssueIF[];
  slaSubscriber: SLASubscriber | null;
}