import type { SlaCustomerProject } from './SlaCustomerProject';
import type { SlaRule } from './SlaRule';

export interface SlaCategory {
  id: number | null;
  name: string | null;
  customerProject: SlaCustomerProject;
  rule: SlaRule | null;
}
