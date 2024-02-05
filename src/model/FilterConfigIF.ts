import type { ProjectIF } from './ProjectIF';

export interface ProjectFilterConfigIF {
  projectsWhiteList: ProjectIF[];
  issueStatusIncludeFilter: string[];
  minimumAssigneeRestingTime: number;
  minimumNumberOfStatusChanges: number;
  issueStateIncludeFilter: string[];
}

export interface FilterConfigIF {
  id: number;
  projectFilter: ProjectFilterConfigIF;
}
