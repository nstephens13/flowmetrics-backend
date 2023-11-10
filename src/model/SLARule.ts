export interface SLARule {
  id: number | null;
  name: string | null;
  durationInDays: number | null;
  expirationDate: Date | null;
  maxAssignedEmployees: number | null;
  occurredIn: string | null;
}
