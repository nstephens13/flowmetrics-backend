export interface SlaRule {
  id: number | null;
  name: string | null;
  reactionTimeInDays: number | null;
  expirationDate: Date | null;
  occurredIn: string | null;
  priority: string | null;
  issueType: string[] | null;
}
