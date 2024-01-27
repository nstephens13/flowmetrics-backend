import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import * as process from 'process';
import dotenv from 'dotenv';
import type { IssueIF } from '@/model/Issue/IssueIF';
import type { EmployeeIF } from '@/model/EmployeeIF';
import { parseEmployee, parseIssue } from './jiraResponseParser';
import { ProjectIF } from '@/model/ProjectIF';
import getProject from '../__mockdata__/mockdata';

dotenv.config();

const mockDataProject: ProjectIF = getProject(2);

// getting the url from the environment-variable
const url = `https://${process.env.JIRA_URL}/rest/api/2/`;

// getting the bearer token from env variable and configuring the header for the requests
const axiosRequestConf: AxiosRequestConfig<never> = {
  headers: {
    Authorization: `Bearer ${process.env.USER_BEARERTOKEN}`,
  },
};

/**
 * @description function to fetch a get request to the jira api with the given endpoint
 *
 * @param endpoint the changeable part of the request url, the postfix after /api/2/
 * @returns {Promise<any>} will return the response as a AxiosResponse or a rejected promise
 */
// TODO add type to response
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchGetRequestToEndpoint(endpoint: string): Promise<any> {
  try {
    const response = await axios.get(`${url}${endpoint}`, axiosRequestConf);
    return response.data as never;
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * @description function to fetch the user-Infos of the actual user that is connected with its bearer token
 *
 * @returns {Promise<EmployeeIF>} will return the user as a EmployeeIF or a rejected promise
 */
export async function fetchUserInfo(): Promise<EmployeeIF> {
  const endpoint = 'myself';

  try {
    const response = await fetchGetRequestToEndpoint(endpoint);
    const user = parseEmployee(response);
    return user == null ? Promise.reject() : user;
  } catch (err) {
    // ToDo Remove mocData fallback
    const user = mockDataProject.issues[1].createdBy;
    return user == null ? Promise.reject() : user;

    // return Promise.reject(err);
  }
}

/**
 * @description function to fetch an issue by its id with expanded changelog
 *
 * @param id the id of the issue that should be fetched
 * @returns {Promise<IssueIF>} will return the issue as a IssueIF or a rejected promise
 */
export async function fetchIssue(id: number): Promise<IssueIF> {
  const endpoint = `issue/${id}?expand=changelog`;

  try {
    const response = await fetchGetRequestToEndpoint(endpoint);
    const issue = parseIssue(response);
    return issue == null ? Promise.reject() : issue;
  } catch (err) {
    // ToDo Remove mockData fallback
    return mockDataProject.issues[1];

    // return Promise.reject(err);
  }
}

/**
 * @description function to fetch a variable amount of the newest created issue of a project with expanded changelog and sorted by date
 *
 * @param projectKey projectKey of the project that should be searched
 * @param amount amount of issues that should be fetched
 * @returns {Promise<IssueIF[]>} will return the issues as a IssueIF[] or a rejected promise
 */
export async function searchNewestIssues(projectKey: string, amount: number): Promise<IssueIF[]> {
  const endpoint = `search?jql=project=${projectKey}&maxResults=${amount}&expand=changelog&orderBy=-created`;

  try {
    // TODO add type to response
    const response = await fetchGetRequestToEndpoint(endpoint);
    return response?.issues.map((issueJSON: never) => parseIssue(issueJSON));
  } catch (err) {
    return mockDataProject.issues;
    // return Promise.reject(err);
  }
}

// ToDo remove in further development
/**
 * @description function to get the whole mockDataProject without asking jira first for dev purposes
 *
 * @returns {Promise<ProjectIF>} will return the project as a ProjectIF or a rejected promise
 */
export async function fetchProject(projectId: number): Promise<ProjectIF> {
  const projectNumber = projectId;
  if (projectNumber !== 0 && projectNumber <= 20) {
    return getProject(projectNumber);
  }
  return getProject(1);
}
