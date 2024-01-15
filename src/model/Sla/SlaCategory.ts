import type { SlaCustomerProject } from '@/model/Sla/SlaCustomerProject';
import type { SlaRule } from '@/model/Sla/SlaRule';

export interface SlaCategory {
  id: number | null;
  name: string | null;
  customerProject: SlaCustomerProject;
  rule: SlaRule | null;
}
