import type { ProjectIF } from '@/model/ProjectIF';
import type { IssueIF } from '@/model/Issue/IssueIF';

/**
 * @brief calculates the amount of fulfilled sla rules of one issue
 *
 * @param issue issue to analyze
 * @var compareTime if  a ticket is already closed use that time to compare, otherwise use current time
 *
 * @returns number of complied sla rules of one issue
 */
function numberOfFulfilledSlaRules(issue: IssueIF): number {
  if (!issue.assignedSlaRule) return 0;
  let count = 0;
  for (let i = 0; i < issue.assignedSlaRule.length; ++i) {
    let compareTime;
    if (issue.closedAt == null) compareTime = new Date();
    else compareTime = issue.closedAt;
    if (
      (issue.assignedSlaRule[i].expirationDate ?? new Date(0)).valueOf() > compareTime.valueOf()
    ) {
      count += 1;
    }
  }
  return count;
}

/**
 * @brief returns the amount of times sla rules are found in issues
 *
 * @param project project to analyze
 * @returns number of sla rules
 */
function getNumberOfSlaRulesOfProject(project: ProjectIF): number {
  let count = 0;
  for (let i = 0; i < project.issues.length; ++i) {
    count += project.issues[i]?.assignedSlaRule?.length ?? 0;
  }
  return count;
}

/**
 * @brief The Function calculates the amount of sla rules complied in a project
 *
 * @param project analyzed project
 * @returns percentile of complied Sla rules, without digits after the comma
 */
export default function getPercentageSlaRulesComplied(project: ProjectIF | undefined): string {
  if (!project || getNumberOfSlaRulesOfProject(project) === 0) return '-';
  let count = 0;
  for (let i = 0; i < project.issues.length; ++i) {
    count += numberOfFulfilledSlaRules(project.issues[i]);
  }
  return `${Math.trunc((count / getNumberOfSlaRulesOfProject(project)) * 100)}%`;
}
