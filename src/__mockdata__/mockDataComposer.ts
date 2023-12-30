import { faker } from '@faker-js/faker';
import type { ProjectIF } from '@/model/ProjectIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import type { IssueIF } from '@/model/Issue/IssueIF';
import employeeJson from '@/assets/__mockdata__/json/Employees.json';
import issueJson2 from '@/assets/__mockdata__/json/Issues_2.json';
import issueJson from '@/assets/__mockdata__/json/Issues.json';
import { Issue } from '@/services/Issue';
import type { SlaRule } from '@/model/Sla/SlaRule';
import { Category, statusLists } from './generator/StatusLists';

// Define lists of different category with statuses
export const planningStatusList: string[] = statusLists[Category.planning];
export const devStatusList: string[] = statusLists[Category.development];
export const testingStatusList: string[] = statusLists[Category.testing];
export const nonDisplayedStatusList: string[] = statusLists[Category.nonDisplayed];

/**
 * Generates a random integer between 0 and the specified maximum value (exclusive).
 * @param max - The maximum value.
 * @returns The random integer.
 */
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

/**
 * Loads issue data from a file and returns an array of Issue objects.
 * @param issues - The issue data from the file.
 * @returns An array of Issue objects.
 */
function loadIssueDataFromFile(issues: any): Issue[] {
  const issueData: Issue[] = [];
  structuredClone(issues).forEach((issue: IssueIF) => {
    issueData.push({
      id: issue.id as number,
      name: issue.name as string,
      description: issue.description as string,
      assignedTo: issue.assignedTo as EmployeeIF,
      createdBy: issue.createdBy as EmployeeIF,
      closedAt: issue.closedAt ? new Date(issue.closedAt) : null,
      createdAt: issue.createdAt ? new Date(issue.createdAt) : null,
      dueTo: issue.dueTo ? new Date(issue.dueTo) : null,
      status: issue.status as string,
      assigneeRestingTime: null,
      statusRestingTime: null,
      assigneeChanges: null,
      assignedSlaRule: issue.assignedSlaRule ? issue.assignedSlaRule : null,
      statusChanges: issue.statusChanges ? issue.statusChanges : [],
      state: issue.state as string,
    });
  });
  return issueData;
}

/**
 * Assigns an issue to an employee.
 * @param issueNumber - The index of the issue.
 * @param employeeNumber - The index of the employee.
 * @param issues - The array of issues.
 * @param employees - The array of employees.
 * @returns The updated arrays of issues and employees.
 */
function assignIssueToEmployee(
  issueNumber: number,
  employeeNumber: number,
  issues: IssueIF[],
  employees: EmployeeIF[]
): [IssueIF[], EmployeeIF[]] {
  const issuesToReturn = issues;
  const employeesToReturn = employees;

  // assign issue to employee if the issue exists and the employee exists
  if (issueNumber < issues.length && employeeNumber < employees.length) {
    issuesToReturn[issueNumber].assignedTo = employees[employeeNumber];
  }

  return [issuesToReturn, employeesToReturn];
}

/**
 * Loads arrays of employees, issues, and milestones from files.
 * @param issueFile - The issue data file.
 * @returns An array containing the loaded arrays of employees, issues, and milestones.
 */
function loadArraysFromFile(
  issueFile:
    | (
        | {
            id: number;
            name: string;
            description: string;
            assignedTo: null;
            createdBy: {
              id: number;
              firstName: string;
              lastName: string;
              emailAddress: string;
              status: string;
              assignedIssues: never[];
              key: string;
            };
            createdAt: string;
            closedAt: null;
            dueTo: string;
            status: string;
            state: string;
          }
        | {
            id: number;
            name: string;
            description: null;
            assignedTo: {
              id: number;
              firstName: string;
              lastName: string;
              emailAddress: string;
              assignedIssues: never[];
              key: string;
            };
            createdBy: {
              id: number;
              firstName: string;
              lastName: string;
              emailAddress: string;
              status: string;
              assignedIssues: never[];
              key: string;
            };
            createdAt: string;
            closedAt: string;
            dueTo: string;
            status: string;
            state: string;
          }
        | {
            id: number;
            name: string;
            description: string;
            assignedTo: {
              id: number;
              firstName: string;
              lastName: string;
              emailAddress: string;
              status: string;
              assignedIssues: never[];
              key: string;
            };
            createdBy: {
              id: number;
              firstName: string;
              lastName: string;
              emailAddress: string;
              assignedIssues: never[];
            };
            createdAt: string;
            closedAt: null;
            dueTo: string;
            status: string;
            state: string;
          }
        | {
            id: number;
            name: string;
            description: null;
            assignedTo: {
              id: number;
              firstName: string;
              lastName: string;
              emailAddress: string;
              status: string;
              assignedIssues: never[];
              key: string;
            };
            createdBy: {
              id: number;
              firstName: string;
              lastName: string;
              emailAddress: string;
              assignedIssues: never[];
            };
            createdAt: string;
            closedAt: null;
            dueTo: string;
            status: string;
            state: string;
          }
      )[]
    | { id: number; name: string; description: string; assignedTo: null }[]
): [EmployeeIF[], IssueIF[]] {
  const employeesArray: EmployeeIF[] = structuredClone(employeeJson) as EmployeeIF[];
  // const issuesArray: IssueIF[] = structuredClone(issueJson) as IssueIF[];
  const issuesArray: IssueIF[] = loadIssueDataFromFile(issueFile) as IssueIF[];
  return [employeesArray, issuesArray];
}

/**
 * This function creates different mock data sets depending on the number passed
 * If no number is passed, data set 3 is returned
 * @param dataset the number of the dataset that should be returned
 * @returns The mock data based on the specified dataset.
 */
function getMockData(dataset: number): ProjectIF {
  let [employeesArrayFromFile, issuesArrayFromFile]: [EmployeeIF[], IssueIF[]] =
    loadArraysFromFile(issueJson);
  let [employeesForProject, issuesForProject]: [EmployeeIF[], IssueIF[]] = [[], []];

  switch (dataset) {
    case 1: {
      [issuesForProject] = assignIssueToEmployee(1, 1, issuesArrayFromFile, employeesArrayFromFile);
      const [planningStatus] = planningStatusList;
      issuesForProject[1].status = planningStatus;
      issuesForProject[1].state = 'planning';

      return {
        id: 1,
        name: faker.science.chemicalElement().name,
        description: faker.company.catchPhrase(),
        issues: issuesForProject,
        slaSubscriber: null,
      };
    }

    case 2: {
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        0,
        0,
        issuesArrayFromFile,
        employeesArrayFromFile
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        1,
        1,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        2,
        1,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        3,
        2,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        4,
        2,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        5,
        2,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        6,
        3,
        issuesForProject,
        employeesForProject
      );

      [
        issuesForProject[0].status,
        issuesForProject[1].status,
        issuesForProject[2].status,
        issuesForProject[3].status,
        issuesForProject[4].status,
        issuesForProject[5].status,
        issuesForProject[6].status,
      ] = [
        planningStatusList[0],
        planningStatusList[0],
        planningStatusList[0],
        planningStatusList[0],
        planningStatusList[0],
        planningStatusList[0],
        planningStatusList[0],
      ];

      [
        issuesForProject[0].state,
        issuesForProject[1].state,
        issuesForProject[2].state,
        issuesForProject[3].state,
        issuesForProject[4].state,
        issuesForProject[5].state,
        issuesForProject[6].state,
      ] = ['planning', 'planning', 'planning', 'planning', 'planning', 'planning', 'planning'];

      return {
        id: 2,
        name: faker.science.chemicalElement().name,
        description: faker.company.catchPhrase(),
        issues: issuesForProject,
        slaSubscriber: null,
      };
    }

    case 3: {
      for (let iterator = 0; iterator < 280; iterator++) {
        let status = 'open';
        let closedAt = null;

        const randomStatus = getRandomInt(3); // 0: open, 1: closed, 2: in progress

        if (randomStatus === 2) {
          status = 'in progress';
        } else if (randomStatus === 1) {
          closedAt = faker.date.recent();
        }

        const slaRule1: SlaRule = {
          id: 1,
          name: 'SLA Rule 1',
          reactionTimeInDays: 3,
          expirationDate: new Date('2023-12-24T00:00:00.000Z'),
          occurredIn: null,
          priority: 'Kosmetik',
          issueType: ['documentation', 'coverage'],
        };

        issuesForProject.push({
          id: iterator + 1,
          name: faker.company.catchPhrase(),
          description: faker.hacker.phrase(),
          closedAt,
          status,
          assignedTo: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          createdAt: faker.date.past(),
          createdBy: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          dueTo: faker.date.future(),
          assignedSlaRule: [slaRule1],
          assigneeRestingTime: null,
          statusRestingTime: null,
          assigneeChanges: null,
          statusChanges: null,
          state: '',
        });
      }

      const numberOfEmployees = employeesArrayFromFile.length;
      employeesForProject = employeesArrayFromFile;

      issuesForProject.forEach((issue: IssueIF) => {
        const randomEmployee = getRandomInt(numberOfEmployees);
        [issuesForProject, employeesForProject] = assignIssueToEmployee(
          issue.id,
          randomEmployee,
          issuesForProject,
          employeesForProject
        );
      });

      return {
        id: 3,
        name: 'Mocking Bird Project',
        description: 'third mock dataset with a big number of random issues',
        issues: issuesForProject,
        slaSubscriber: null,
      };
    }

    case 4: {
      [employeesArrayFromFile, issuesArrayFromFile] = loadArraysFromFile(issueJson2);

      for (let iterator = 0; iterator < 280; iterator++) {
        let status = 'open';
        let closedAt = null;
        let state = 'planning';

        const randomStatus = getRandomInt(3); // 0: open, 1: closed, 2: in progress

        if (randomStatus === 2) {
          status = 'in progress';
          state = 'development';
        } else if (randomStatus === 1) {
          closedAt = faker.date.recent();
        }

        issuesForProject.push({
          id: iterator + 1,
          name: faker.company.catchPhrase(),
          description: faker.hacker.phrase(),
          closedAt,
          status,
          assignedTo: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          createdAt: faker.date.past(),
          createdBy: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          dueTo: faker.date.future(),
          assignedSlaRule: [
            {
              id: 1,
              name: 'SLA Rule 2',
              reactionTimeInDays: 5,
              expirationDate: new Date('2024-01-17T00:00:00.000Z'),
              occurredIn: null,
              priority: 'Kosmetik',
              issueType: ['documentation', 'coverage'],
            },
          ],
          assigneeChanges: null,
          assigneeRestingTime: null,
          statusChanges: null,
          statusRestingTime: null,
          state,
        });
      }

      issuesForProject.forEach((issue: IssueIF) => {
        const randomEmployee = getRandomInt(employeesArrayFromFile.length);
        [issuesForProject, employeesForProject] = assignIssueToEmployee(
          issue.id,
          randomEmployee,
          issuesForProject,
          employeesArrayFromFile
        );
      });

      return {
        id: 3,
        name: 'Mocking Bird Project',
        description: 'third mock dataset with a big number of random issues',
        issues: issuesForProject,
        slaSubscriber: null,
      };
    }

    case 5: {
      [employeesArrayFromFile, issuesArrayFromFile] = loadArraysFromFile(issueJson2);

      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        0,
        0,
        issuesArrayFromFile,
        employeesArrayFromFile
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        1,
        1,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        2,
        1,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        3,
        2,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        4,
        2,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        5,
        2,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        6,
        3,
        issuesForProject,
        employeesForProject
      );

      return {
        id: 2,
        name: 'Mocking Bird 2',
        description: 'second mock dataset',
        issues: issuesForProject,
        slaSubscriber: null,
      };
    }

    case 6: {
      const issues: IssueIF[] = [];
      for (let iterator = 0; iterator < 280; iterator++) {
        issues.push({
          id: iterator + 1,
          name: faker.company.catchPhrase(),
          description: faker.hacker.phrase(),
          closedAt: null,
          assignedTo: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          createdAt: faker.date.past(),
          createdBy: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          dueTo: faker.date.future(),
          status: '',
          assignedSlaRule: [
            {
              id: 1,
              name: 'SLA Rule 1',
              reactionTimeInDays: 3,
              expirationDate: new Date('2024-02-17T00:00:00.000Z'),
              occurredIn: null,
              priority: 'Kosmetik',
              issueType: ['documentation', 'coverage'],
            },
          ],
          statusChanges: [],
          state: '',
          assigneeRestingTime: null,
          statusRestingTime: null,
          assigneeChanges: null,
        });
      }

      // issues = issuesArray;
      const numberOfIssues = issues.length;
      const numberOfEmployees = employeesArrayFromFile.length;

      for (let iterator = 0; iterator < numberOfIssues; iterator++) {
        const randomStatus = getRandomInt(4); // 0: open, 1: closed, 2: in progress

        if (randomStatus === 2) {
          issues[iterator].status = 'in progress';
          const [devStatus] = devStatusList;
          issues[iterator].status = devStatus;
        } else if (randomStatus === 1) {
          const randomDate = new Date(2018, 0o5, 0o5, 17, 23, 42, 11);
          // Assigning a random closedAt date within the last 30 days
          randomDate.setDate(randomDate.getDate() - getRandomInt(30));
          issues[iterator].closedAt = randomDate;
          const [testStatus] = testingStatusList;
          issues[iterator].status = testStatus;
        } else if (randomStatus === 3) {
          issues[iterator].closedAt = faker.date.recent();
          const [nonDisplayedStatus] = nonDisplayedStatusList;
          issues[iterator].status = nonDisplayedStatus;
        } else {
          const [planningStatus] = planningStatusList;
          issues[iterator].status = planningStatus;
        }

        const randomEmployee = getRandomInt(numberOfEmployees);
        [issuesForProject, employeesForProject] = assignIssueToEmployee(
          iterator,
          randomEmployee,
          issues,
          employeesArrayFromFile
        );
      }

      return {
        id: 6,
        name: faker.science.chemicalElement().name,
        description: 'Sixth mock dataset',
        issues: issuesForProject,
        slaSubscriber: null,
      };
    }

    // SLA Rules MockData
    case 7: {
      const issues: IssueIF[] = [];
      // Random Erstellung von 280 Issues
      for (let i = 0; i < 280; i++) {
        issues.push({
          id: i + 1,
          name: faker.company.catchPhrase(),
          description: faker.hacker.phrase(),
          closedAt: null,
          assignedTo: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          createdAt: faker.date.past(),
          createdBy: employeesArrayFromFile[getRandomInt(employeesForProject.length)],
          dueTo: faker.date.future(),
          status: '',
          assignedSlaRule: [],
          assigneeRestingTime: null,
          statusRestingTime: null,
          assigneeChanges: null,
          statusChanges: [],
          state: '',
        });
      }

      // issues = issuesArray;
      const numberOfIssues = issues.length;
      const numberOfEmployees = employeesArrayFromFile.length;

      for (let iterator = 0; iterator < numberOfIssues; iterator++) {
        const randomStatus = getRandomInt(4); // 0: open, 1: closed, 2: in progress

        if (randomStatus === 2) {
          issues[iterator].status = 'in progress';
          const [devStatus] = devStatusList;
          issues[iterator].status = devStatus;
        } else if (randomStatus === 1) {
          const randomDate = new Date(2018, 0o5, 0o5, 17, 23, 42, 11);
          // Assigning a random closedAt date within the last 30 days
          randomDate.setDate(randomDate.getDate() - getRandomInt(30));
          issues[iterator].closedAt = randomDate;
          const [testStatus] = testingStatusList;
          issues[iterator].status = testStatus;
        } else if (randomStatus === 3) {
          issues[iterator].closedAt = faker.date.recent();
          const [nonDisplayedStatus] = nonDisplayedStatusList;
          issues[iterator].status = nonDisplayedStatus;
        } else {
          const [planningStatus] = planningStatusList;
          issues[iterator].status = planningStatus;
        }

        const randomEmployee = getRandomInt(numberOfEmployees);
        [issuesForProject, employeesForProject] = assignIssueToEmployee(
          iterator,
          randomEmployee,
          issues,
          employeesArrayFromFile
        );
      }

      const slaRule1: SlaRule = {
        id: 1,
        name: 'SLA Rule 1',
        reactionTimeInDays: 3,
        expirationDate: new Date('2023-08-17T00:00:00.000Z'),
        occurredIn: null,
        priority: 'Kosmetik',
        issueType: ['documentation', 'coverage'],
      };
      const slaRule2: SlaRule = {
        id: 2,
        name: 'SLA Rule 2',
        reactionTimeInDays: 5,
        expirationDate: new Date('2023-08-20T00:00:00.000Z'),
        occurredIn: null,
        priority: 'leicht umgehbar',
        issueType: ['support'],
      };
      const slaRule3: SlaRule = {
        id: 3,
        name: 'SLA Rule 3',
        reactionTimeInDays: 2,
        expirationDate: new Date('2023-08-16T00:00:00.000Z'),
        occurredIn: null,
        priority: 'behindernd',
        issueType: ['bug', 'test'],
      };

      const slaRuleArray: SlaRule[] = [slaRule1, slaRule2, slaRule3];

      for (let i = 0; i < numberOfIssues; i++) {
        const randomSlaRule = getRandomInt(3); // 0: SLA Rule 1, 1: SLA Rule 2, 2: SLA Rule 3
        issues[i].assignedSlaRule?.push(slaRuleArray[randomSlaRule]);
      }
      return {
        id: 7,
        name: 'Mocking Bird 7',
        description: 'seventh mock dataset',
        issues: issuesForProject,
        slaSubscriber: null,
      };
    }

    // only test cases
    case 53: {
      return {
        id: 53,
        name: faker.science.chemicalElement().name,
        description: faker.company.catchPhrase(),
        issues: [],
        slaSubscriber: null,
      };
    }
    case 54: {
      return {
        id: 54,
        name: faker.science.chemicalElement().name,
        description: faker.company.catchPhrase(),
        issues: [],
        slaSubscriber: null,
      };
    }

    case 55: {
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        0,
        0,
        issuesArrayFromFile,
        employeesArrayFromFile
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        1,
        1,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        2,
        1,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        3,
        2,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        4,
        2,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        5,
        2,
        issuesForProject,
        employeesForProject
      );
      [issuesForProject, employeesForProject] = assignIssueToEmployee(
        6,
        3,
        issuesForProject,
        employeesForProject
      );

      const slaRule1: SlaRule = {
        id: 1,
        name: 'SLA Rule 1',
        reactionTimeInDays: 1,
        expirationDate: new Date('2023-08-17T00:00:00.000Z'),
        occurredIn: null,
        priority: 'behindernd',
        issueType: ['bug', 'test'],
      };
      const slaRule2: SlaRule = {
        id: 2,
        name: 'SLA Rule 2',
        reactionTimeInDays: 5,
        expirationDate: new Date('2023-08-20T00:00:00.000Z'),
        occurredIn: null,
        priority: 'behindernd',
        issueType: ['bug', 'test'],
      };
      const slaRule3: SlaRule = {
        id: 3,
        name: 'SLA Rule 3',
        reactionTimeInDays: 20,
        expirationDate: new Date('2023-08-16T00:00:00.000Z'),
        occurredIn: null,
        priority: 'behindernd',
        issueType: ['bug', 'test'],
      };

      const date = new Date(2018, 0o5, 0o5, 17, 23, 42, 11);
      issuesForProject[0].status = 'in progress';
      issuesForProject[0].status = 'e2e';
      issuesForProject[0].state = 'testing';
      issuesForProject[0].createdAt = new Date();
      issuesForProject[0].assignedSlaRule = [slaRule1];
      issuesForProject[2].status = 'closed';
      issuesForProject[2].status = 'in progress';
      issuesForProject[0].state = 'development';
      issuesForProject[2].closedAt = date; // Set the specific closedAt date
      issuesForProject[3].status = 'closed';
      issuesForProject[3].status = 'review';
      issuesForProject[0].state = 'development';
      issuesForProject[3].closedAt = date; // Set the specific closedAt date
      issuesForProject[4].status = 'closed';
      issuesForProject[4].status = 'review';
      issuesForProject[0].state = 'development';
      issuesForProject[4].closedAt = date; // Set the specific closedAt date
      issuesForProject[5].status = 'in progress';
      issuesForProject[5].status = 'e2e';
      issuesForProject[0].state = 'testing';
      issuesForProject[5].createdAt = new Date();
      issuesForProject[5].assignedSlaRule = [slaRule2, slaRule3];
      issuesForProject[6].status = 'closed';
      issuesForProject[6].status = 'design';
      issuesForProject[0].state = 'planning';
      issuesForProject[6].createdAt = date;
      issuesForProject[6].closedAt = date; // Set the specific closedAt date
      issuesForProject[6].assignedSlaRule = [slaRule2, slaRule3];

      [issuesForProject[0].status, issuesForProject[0].status] = ['in progress', devStatusList[0]];
      [issuesForProject[0].state, issuesForProject[0].state] = 'development';
      [issuesForProject[1].status] = [planningStatusList[0]];
      [issuesForProject[1].state, issuesForProject[1].state] = 'planning';
      [issuesForProject[2].status, issuesForProject[2].status, issuesForProject[2].closedAt] = [
        'closed',
        testingStatusList[0],
        date,
      ];
      [issuesForProject[2].state, issuesForProject[2].state] = 'testing';
      [issuesForProject[3].status, issuesForProject[3].status, issuesForProject[3].closedAt] = [
        'closed',
        testingStatusList[0],
        date,
      ];
      [issuesForProject[3].state, issuesForProject[3].state] = 'testing';
      [issuesForProject[4].status, issuesForProject[4].status, issuesForProject[4].closedAt] = [
        'closed',
        testingStatusList[0],
        date,
      ];
      [issuesForProject[5].status, issuesForProject[5].status] = ['in progress', devStatusList[0]];
      [issuesForProject[4].state, issuesForProject[4].state] = 'testing';
      [issuesForProject[5].state, issuesForProject[5].state] = 'development';
      [issuesForProject[6].status, issuesForProject[6].closedAt] = [testingStatusList[0], date];
      [issuesForProject[6].state, issuesForProject[6].state] = 'testing';

      return {
        id: 55,
        name: faker.science.chemicalElement().name,
        description: faker.company.catchPhrase(),
        issues: issuesForProject,
        slaSubscriber: null,
      };
    }

    default: {
      return {
        id: 0,
        name: 'Default',
        description: 'An empty project',
        issues: [],
        slaSubscriber: null,
      };
    }
  }
}

export default getMockData;
