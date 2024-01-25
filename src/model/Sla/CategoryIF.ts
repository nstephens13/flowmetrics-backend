import type { ProjectIF } from '@/model/ProjectIF';
import type { RuleIF } from '@/model/Sla/RuleIF';

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
