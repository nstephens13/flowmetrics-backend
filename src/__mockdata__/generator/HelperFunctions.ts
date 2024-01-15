import { faker } from '@faker-js/faker';
import type { EmployeeIF } from '@/model/EmployeeIF';
import EmployeesJsonData from '../json/Employees.json';
import IssuesWorkflowsJsonData from '../json/IssuesWorkflows.json';

export const issueTypes = [
  'bug',
  'incident',
  'coverage',
  'enhancement',
  'task',
  'feature',
  'support',
  'documentation',
  'review',
  'refactor',
  'zombie',
];

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function getRandomIntBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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

export function getDatesBetween(startDate: Date, endDate: Date, numberOfDates: number): Date[] {
  return faker.date.betweens({ from: startDate, to: endDate, count: numberOfDates });
}

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

export function getDateAndTimeInPast(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}
