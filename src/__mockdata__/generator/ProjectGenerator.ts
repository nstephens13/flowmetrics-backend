import type { ProjectIF } from '@/model/ProjectIF';
import type { IssueIF } from '@/model/Issue/IssueIF';
import generateIssues from '@/__mockdata__/generator/IssuesGenerator';
import projectsJsonData from '@/__mockdata__/json/ProjectsList.json';

export default function generateProject(projectNumber: number, numberOfIssues: number): ProjectIF {
  const projects: ProjectIF[] | null = projectsJsonData as ProjectIF[];
  return {
    id: projects[projectNumber - 1].id,
    name: projects[projectNumber - 1].name,
    description: projects[projectNumber - 1].description,
    issues: generateIssues(projects[projectNumber - 1].id, numberOfIssues) as IssueIF[],
    slaSubscriber: null,
  } as ProjectIF;
}
