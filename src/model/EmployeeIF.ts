/**
 *
 * @prop {number} id employee id
 * @prop {string} firstName first name of the employee
 * @prop {string} lastName family name of the employee
 * @prop {string} emailAddress email address of the employee
 * @prop {string} avatarUrl a link to the avatar url on jira
 * @prop {string} status the current status of the employee if is he still working or quit
 */
export interface EmployeeIF {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  // if Jira use the 48x48 px avatar
  avatarUrl: string;
  status: 'active' | 'inactive';
  key: string;
}
