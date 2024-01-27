import { describe, it, expect } from '@jest/globals';
import { ProjectIF } from '../ProjectIF';

describe('ProjectIF', () => {
  it('should have correct properties', () => {
    const project: ProjectIF = {
      id: 1,
      name: 'Project 1',
      description: 'This is project 1',
      issues: [],
    };

    expect(project).toHaveProperty('id');
    expect(typeof project.id).toBe('number');
    expect(project.id).toBe(1);

    expect(project).toHaveProperty('name');
    expect(typeof project.name).toBe('string');
    expect(project.name).toBe('Project 1');

    expect(project).toHaveProperty('description');
    expect(typeof project.description).toBe('string');
    expect(project.description).toBe('This is project 1');

    expect(project).toHaveProperty('issues');
    expect(typeof project.issues).toBe('object');
    expect(project.issues).toEqual([]);
  });
});
