import type { ProjectIF } from '../ProjectIF';
import type { RuleIF } from './RuleIF';

/**
 * Category Interface
 * @prop {number} id category id
 * @prop {string} name the name of the category
 * @prop {ProjectIF} project the project of the category
 * @prop {RuleIF[]} rules the rules of the category
 */
export interface CategoryIF {
  id: number;
  name: string | null;
  project: ProjectIF;
  rules: RuleIF[];
}
