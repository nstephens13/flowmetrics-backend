import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import * as process from 'process';
import type { IssueIF } from '../model/IssueIF';
import type { EmployeeIF } from '../model/EmployeeIF';
import { parseEmployee, parseIssue } from './jiraResponseParser';
import getMockData from "../__mockdata__/mockDataComposer";
import {ProjectIF} from "../model/ProjectIF";


const mockdataproject : ProjectIF = getMockData(4);



//getting the url from the environment-variable
const url = `https://${process.env.JIRA_URL}/rest/api/2/`;

//getting the bearer token from env variable and configuring the header for the requests
const axiosRequestConf: AxiosRequestConfig<any> = {
  headers: {
    Authorization: `Bearer ${process.env.USER_BEARERTOKEN}`,
  },
};




/**
 * @brief: function that actual calls the REST api
 *
 *
 * @param endpoint the changeable part of the request url, the postfix after /api/2/
 * @returns {Promise<any>} will return the response as a AxiosResponse or a rejected promise
 */
async function fetchGetRequestToEndpoint(endpoint: string) {
  try {
    const response = await axios.get(`${url}${endpoint}`, axiosRequestConf);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}


//function to fetch the user-Infos of the actual user that is connected with its bearer token
export async function fetchUserInfo(): Promise<EmployeeIF> {

  const endpoint = 'myself';

  try {
    const response = await fetchGetRequestToEndpoint(endpoint);
    const user = parseEmployee(response);
    return user == null ? Promise.reject() : user;
  } catch (err) {

    //ToDo Remove mockdata fallback
    const user = mockdataproject.issues[1].createdBy;
    return user == null ? Promise.reject() : user;

    // return Promise.reject(err);
  }
}

//function to fetch a single issue with its key and expanded changelog
export async function fetchIssue(id: number) :Promise<IssueIF> {

  const endpoint = `issue/${id}?expand=changelog`;

  try {
    const response = await fetchGetRequestToEndpoint(endpoint);
    const issue = parseIssue(response);
    return issue == null ? Promise.reject() : issue;
  } catch (err) {

    //ToDo Remove mockdata fallback
    return mockdataproject.issues[1]

    // return Promise.reject(err);
  }
}
//function to fetch a single issue with its key and expanded changelog
export async function fetchProject(id: string) :Promise<ProjectIF> {
    return mockdataproject
}


//function to get a variable amount of the newest created issue of a project with expanded changelog and sorted by date
export async function searchNewestIssues(projectKey: string, amount: number): Promise<IssueIF[]> {

  const endpoint = `search?jql=project=${projectKey}&maxResults=${amount}&expand=changelog&orderBy=-created`;

  try {
    const response = await fetchGetRequestToEndpoint(endpoint);
    const issues: IssueIF[] = response?.issues.map((issueJSON: any) => parseIssue(issueJSON));
    return issues;
  } catch (err) {
    
    //ToDo Remove mockdata fallback
    return mockdataproject.issues

    // return Promise.reject(err);
  }
}