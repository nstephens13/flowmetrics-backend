import { describe, it, expect } from '@jest/globals';
import { ProjectIF } from '../ProjectIF';

describe('ProjectIF', () => {
  it('should have correct properties', () => {
    const project: ProjectIF = {
      id: 1,
      name: 'Project 1',
      description: 'This is project 1',
      issues: [],
      slaSubscriber: null,
    };

    expect(project).toHaveProperty('id');
    expect(typeof project.id).toBe('number');

    expect(project).toHaveProperty('name');
    expect(typeof project.name).toBe('string');

    expect(project).toHaveProperty('description');
    expect(typeof project.description).toBe('string');

    expect(project).toHaveProperty('issues');
    expect(typeof project.issues).toBe('object');

    expect(project).toHaveProperty('slaSubscriber');
    expect(typeof project.slaSubscriber).toBe('object');
  });
});
