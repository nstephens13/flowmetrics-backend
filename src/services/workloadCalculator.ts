import type { ProjectIF } from '@/model/ProjectIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/Issue/IssueIF';
import type { IssueDataIF } from '@/model/Issue/IssueDataIF';

// just temporary import
import {
  devStatusList,
  nonDisplayedStatusList,
  planningStatusList,
  testingStatusList,
} from '@/services/Issue';

const UnassignedEmployee: EmployeeIF = {
  id: 0,
  firstName: 'Unassigned',
  lastName: 'Employee',
  emailAddress: '',
  status: 'inactive',
  avatarUrl: 'none',
  key: 'unassigned',
};

/**
 * Extracts the employee from an issue, updates the employee map, and returns the updated issue set and map.
 *
 * @param issue - The issue to extract the employee from.
 * @param issueSet - The set of issues encountered so far.
 * @param mapToReturn - The map of employees and their workload data.
 * @returns An object containing the updated issue set and map.
 */
function extractEmployeeAndUpdateEmployeeMap(
  issue: IssueIF,
  issueSet: Set<IssueIF>,
  mapToReturn: Map<
    EmployeeIF,
    {
      planning: number;
      development: number;
      testing: number;
    }
  >
) {
  let numberPlannedTickets: number;
  let numberInDevTickets: number;
  let numberInTestingTickets: number;
  const insertEmployee: EmployeeIF = issue.assignedTo ? issue.assignedTo : UnassignedEmployee;

  const tuple:
    | {
        planning: number;
        development: number;
        testing: number;
      }
    | undefined = mapToReturn.get(insertEmployee);

  if (!issueSet.has(issue)) {
    // setting the values to zero if the employee isn't in the map already
    if (tuple !== undefined) {
      numberPlannedTickets = tuple.planning;
      numberInDevTickets = tuple.development;
      numberInTestingTickets = tuple.testing;
    } else {
      numberPlannedTickets = 0;
      numberInDevTickets = 0;
      numberInTestingTickets = 0;
    }
    if (issue.status != null) {
      if (planningStatusList.includes(issue.status)) {
        mapToReturn.set(insertEmployee, {
          planning: numberPlannedTickets + 1,
          development: numberInDevTickets,
          testing: numberInTestingTickets,
        });
      } else if (devStatusList.includes(issue.status)) {
        mapToReturn.set(insertEmployee, {
          planning: numberPlannedTickets,
          development: numberInDevTickets + 1,
          testing: numberInTestingTickets,
        });
      } else if (
        testingStatusList.includes(issue.status) ||
        nonDisplayedStatusList.includes(issue.status)
      ) {
        mapToReturn.set(insertEmployee, {
          planning: numberPlannedTickets,
          development: numberInDevTickets,
          testing: numberInTestingTickets + 1,
        });
      }
    }
  }

  issueSet.add(issue);

  return { issueSet, mapToReturn };
}

/**
 * Calculates the workload from a project team and returns the result as a map.
 *
 * @param projects - Array of projects to calculate the workload from.
 * @returns A map with employee as the key and their workload data as the value.
 */
export function calculateWorkload(projects: ProjectIF[]): Map<EmployeeIF, IssueDataIF> {
  let mapToReturn: Map<EmployeeIF, { planning: number; development: number; testing: number }> =
    new Map([]);
  let issueSet: Set<IssueIF> = new Set<IssueIF>();

  projects.forEach((project) => {
    project.issues.forEach((issue) => {
      const result = extractEmployeeAndUpdateEmployeeMap(issue, issueSet, mapToReturn);
      issueSet = result.issueSet;
      mapToReturn = result.mapToReturn;
    });
  });
  return mapToReturn;
}

/**
 * Merges employees with the same ID in the workload map and returns an array of merged employee data.
 *
 * @param workloadMap - The map of employee workload data.
 * @returns An array of objects containing merged employee and their workload data.
 */
export function mergeEmployees(
  workloadMap: Map<EmployeeIF, IssueDataIF>
): { employee: EmployeeIF; issues: IssueDataIF }[] {
  const employeeList: { employee: EmployeeIF; issues: IssueDataIF }[] = [];
  // merge employees with same id in the workloadMap
  workloadMap.forEach((issues, employee) => {
    const employeeInList = employeeList.find(
      (employeeElement) => employeeElement.employee.id === employee.id
    );
    if (employeeInList) {
      employeeInList.issues = {
        development: employeeInList.issues.development + issues.development,
        planning: employeeInList.issues.planning + issues.planning,
        testing: employeeInList.issues.testing + issues.testing,
      };
    } else {
      employeeList.push({ employee, issues });
    }
  });

  return employeeList;
}
