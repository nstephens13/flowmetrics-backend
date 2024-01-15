import { faker } from '@faker-js/faker';
import employeeJson from './json/Employees.json';
import issueJson2 from './json/Issues_2.json';
import issueJson from './json/Issues.json';
import { IssueIF } from '@/model/Issue/IssueIF';
import { EmployeeIF } from '@/model/EmployeeIF';
import { ProjectIF } from '@/model/ProjectIF';

// Define lists of different category with statuses
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
function loadIssueDataFromFile(issues: IssueIF[]): IssueIF[] {
  const issueData: IssueIF[] = [];
  structuredClone(issues).forEach((issue: IssueIF) => {
    issueData.push({
      id: issue.id as number,
      name: issue.name as string,
      description: issue.description as string,
      assignedTo: issue.assignedTo as EmployeeIF,
      assigneeRestingTime: null,
      createdBy: issue.createdBy as EmployeeIF,
      closedAt: issue.closedAt ? new Date(issue.closedAt) : null,
      createdAt: issue.createdAt ? new Date(issue.createdAt) : null,
      dueTo: issue.dueTo ? new Date(issue.dueTo) : null,
      status: issue.status as string,
      statusRestingTime: null,
      statusChanges: null,
      assigneeChanges: null,
      assignedSlaRule: issue.assignedSlaRule ? issue.assignedSlaRule : null,
      state: issue.state,
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

interface AssignedTo {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  status: string;
  assignedIssues: never[];
}

interface CreatedBy {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  status: string;
  assignedIssues: never[];
}

interface IssueWithType1 {
  id: number;
  name: string;
  description: string;
  assignedTo: null;
  createdBy: CreatedBy;
  createdAt: string;
  closedAt: null;
  dueTo: string;
  status: string;
}

interface IssueWithType2 {
  id: number;
  name: string;
  description: null;
  assignedTo: AssignedTo;
  createdBy: CreatedBy;
  createdAt: string;
  closedAt: string;
  dueTo: string;
  status: string;
}

interface IssueWithType3 {
  id: number;
  name: string;
  description: string;
  assignedTo: AssignedTo;
  createdBy: CreatedBy;
  createdAt: string;
  closedAt: null;
  dueTo: string;
  status: string;
}

interface IssueWithType4 {
  id: number;
  name: string;
  description: null;
  assignedTo: AssignedTo;
  createdBy: CreatedBy;
  createdAt: string;
  closedAt: null;
  dueTo: string;
  status: string;
}

type IssueFile = (IssueWithType1 | IssueWithType2 | IssueWithType3 | IssueWithType4)[];

type SimpleIssue = { id: number; name: string; description: string; assignedTo: null }[];

/**
 * Loads arrays of employees, issues, and milestones from files.
 * @param issueFile - The issue data file.
 * @returns An array containing the loaded arrays of employees, issues, and milestones.
 */
function loadArraysFromFile(issueFile: IssueFile | SimpleIssue): [EmployeeIF[], IssueIF[]] {
  const employeesArray: EmployeeIF[] = structuredClone(employeeJson) as EmployeeIF[];
  // const issuesArray: IssueIF[] = structuredClone(issueJson) as IssueIF[];
  const issuesArray: IssueIF[] = loadIssueDataFromFile(issueFile as IssueIF[]) as IssueIF[];
  return [employeesArray, issuesArray];
}

/**
 * This function creates different mock data sets depending on the number passed
 * If no number is passed, data set 3 is returned
 * @param dataset the number of the dataset that should be returned
 * @returns The mock data based on the specified dataset.
 */
function getMockData(dataset: number): ProjectIF {
  const employeesArrayFromFile: EmployeeIF[] = loadArraysFromFile(issueJson)[0];
  let [employeesForProject, issuesForProject]: [EmployeeIF[], IssueIF[]] = [[], []];

  switch (dataset) {
    case 4: {
      for (let iterator = 0; iterator < 280; iterator++) {
        issuesForProject.push({
          id: iterator + 1,
          name: faker.company.catchPhrase(),
          description: faker.hacker.phrase(),
          closedAt: null,
          status: null,
          statusRestingTime: null,
          assignedTo: null,
          assigneeRestingTime: null,
          createdAt: faker.date.past(),
          createdBy: loadArraysFromFile(issueJson2)[0][getRandomInt(employeesForProject.length)],
          dueTo: faker.date.future(),
          statusChanges: null,
          assigneeChanges: null,
          assignedSlaRule: null,
          state: null,
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
