import express, { Router } from 'express';
import {
  fetchIssue,
  fetchProject,
  fetchUserInfo,
  searchNewestIssues,
} from './services/jiraRequestHelper';
import { EmployeeIF } from './model/EmployeeIF';
import { IssueIF } from './model/Issue/IssueIF';
import { ProjectIF } from './model/ProjectIF';

const apiRouter: Router = express.Router();

// defining the api endpoints that vue can reach out of the browser

// ToDo: Instead of calling the jira-Api it should get the information that are asked on this endpoints from the database
// when implemented and fetching Infos from jira into the DB should be done by a chron-job

/**
 * @openapi
 * /api/myself:
 *   get:
 *     summary: Get information about the logged-in user.
 *     responses:
 *       '200':
 *         description: Successful response. Returns an EmployeeIF object.
 */
apiRouter.get('/myself', async (req, res) => {
  try {
    const data: EmployeeIF | null = await fetchUserInfo();
    res.json(data);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

/**
 * @openapi
 * /api/issue/{id}:
 *   get:
 *     summary: Get information about a specific issue.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the issue.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response. Returns an IssueIF object.
 *       '400':
 *         description: Bad request. Invalid ID provided.
 *       '404':
 *         description: Not found. Issue not found.
 */
apiRouter.get('/issue/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    res.sendStatus(400);
  } else {
    try {
      const data: IssueIF = await fetchIssue(id);
      res.json(data);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
});

/**
 * @openapi
 * /api/project/{id}:
 *   get:
 *     summary: Get information about a specific project.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the project.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response. Returns a ProjectIF object.
 *       '404':
 *         description: Not found. Project not found.
 */
apiRouter.get('/project/:id', async (req, res) => {
  try {
    const data: ProjectIF = await fetchProject(req.params.id);
    res.json(data);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

/**
 * @openapi
 * /api/project/{id}/issues:
 *   get:
 *     summary: Get the newest issues of a specific project.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the project.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response. Returns an array of IssueIF objects.
 *       '404':
 *         description: Not found. Project not found or issues not available.
 */
apiRouter.get('/project/:id/issues', async (req, res) => {
  try {
    const data: IssueIF[] = await searchNewestIssues(req.params.id, 200);
    res.json(data);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

export default apiRouter;
