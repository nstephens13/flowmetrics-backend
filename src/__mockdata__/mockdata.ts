import type { ProjectIF } from '@/model/ProjectIF';
import generateProject from './generator/ProjectGenerator';

export default function getProject(projectNumber: number): ProjectIF {
  switch (projectNumber) {
    case 1:
      return generateProject(projectNumber, 50) as ProjectIF;
    case 2:
      return generateProject(projectNumber, 60) as ProjectIF;
    case 3:
      return generateProject(projectNumber, 35) as ProjectIF;
    case 4:
      return generateProject(projectNumber, 25) as ProjectIF;
    case 5:
      return generateProject(projectNumber, 30) as ProjectIF;
    case 6:
      return generateProject(projectNumber, 10) as ProjectIF;
    case 7:
      return generateProject(projectNumber, 15) as ProjectIF;
    case 8:
      return generateProject(projectNumber, 45) as ProjectIF;
    case 9:
      return generateProject(projectNumber, 55) as ProjectIF;
    case 10:
      return generateProject(projectNumber, 65) as ProjectIF;
    case 11:
      return generateProject(projectNumber, 75) as ProjectIF;
    case 12:
      return generateProject(projectNumber, 5) as ProjectIF;
    case 13:
      return generateProject(projectNumber, 10) as ProjectIF;
    case 14:
      return generateProject(projectNumber, 50) as ProjectIF;
    case 15:
      return generateProject(projectNumber, 30) as ProjectIF;
    case 16:
      return generateProject(projectNumber, 20) as ProjectIF;
    case 17:
      return generateProject(projectNumber, 25) as ProjectIF;
    case 18:
      return generateProject(projectNumber, 55) as ProjectIF;
    case 19:
      return generateProject(projectNumber, 60) as ProjectIF;
    case 20:
      return generateProject(projectNumber, 5) as ProjectIF;
    default:
      return generateProject(1, 50) as ProjectIF;
  }
}

export function getProjects(from: number, to: number): ProjectIF[] {
  const projects: ProjectIF[] = [];
  for (let i = from; i <= to; i++) {
    projects.push(getProject(i));
  }
  return projects;
}
