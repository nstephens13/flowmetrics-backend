import { faker } from '@faker-js/faker';
import type { EmployeeIF } from '@/model/EmployeeIF';
import EmployeesJsonData from '@/__mockdata__/json/Employees.json';
import IssuesWorkflowsJsonData from '@/__mockdata__/json/IssuesWorkflows.json';

/**
 * Function to generate a random integer between 0 and max (inclusive)
 * @param max the maximum number to be generated
 * @returns a random integer between 0 and max (inclusive)
 * @author Nived Stephen
 */
export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

/**
 * Function to generate a random integer between min and max (inclusive)
 * @param min the minimum number to be generated
 * @param max the maximum number to be generated
 * @returns a random integer between min and max (inclusive)
 * @author Nived Stephen
 */
export function getRandomIntBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Function to generate a random employee
 * @param employee the employee to be excluded from the random selection
 * @returns a random employee object with random values for each property except id and avatarUrl
 * @author Nived Stephen
 */
export function getRandomEmployee(employee?: EmployeeIF): EmployeeIF {
  const employees: EmployeeIF[] = EmployeesJsonData as EmployeeIF[];
  if (employee !== undefined) {
    // we don't want to get the same employee
    let randomEmployee = employees[getRandomInt(employees.length)] as EmployeeIF;
    while (randomEmployee.id === employee.id) {
      randomEmployee = employees[getRandomInt(employees.length)] as EmployeeIF;
    }
    return randomEmployee;
  }
  return employees[getRandomInt(employees.length)] as EmployeeIF;
}

/**
 * Function to generate an array of random dates between startDate and endDate (inclusive) with length numberOfDates
 * @param startDate start date
 * @param endDate end date
 * @param numberOfDates number of dates to be generated
 * @returns an array of random dates between startDate and endDate (inclusive) with length numberOfDates
 * @author Nived Stephen
 */
export function getDatesBetween(startDate: Date, endDate: Date, numberOfDates: number): Date[] {
  return faker.date.betweens({
    from: startDate,
    to: endDate,
    count: numberOfDates === 0 ? 1 : numberOfDates,
  });
}

/**
 * Function to get the workflow of an issue type
 * @param issueType issue type
 * @returns the workflow of the issue type or the first workflow if the issue type is not found in any workflow
 * @author Nived Stephen
 */
export function getWorkflow(issueType: string) {
  const workflows = IssuesWorkflowsJsonData;
  let workflow = workflows[0];
  for (let i = 0; i < workflows.length; i++) {
    if (workflows[i].issueType === issueType) {
      workflow = workflows[i];
    }
  }
  return workflow;
}

/**
 * Function to get a date and time in the past
 * @param days number of days in the past
 * @returns a date and time in the past with the number of days specified in the parameter days
 * @author Nived Stephen
 */
export function getDateAndTimeInPast(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}
