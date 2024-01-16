import { describe, it, expect } from '@jest/globals';
import generateProject from '../generator/ProjectGenerator';
import getProject from '../mockdata';

jest.mock('../generator/ProjectGenerator');

describe('mockdata', () => {
  it('generateProject is called with correct argument', () => {
    const projectNumber = 10;
    const numberOfIssues = 65;
    const mockProject = { id: 10, name: 'Project 10', numberOfIssues: 65 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(projectNumber, numberOfIssues);
    expect(testProject).toHaveProperty('id', 10);
    expect(testProject).toHaveProperty('name', 'Project 10');
    expect(testProject).toHaveProperty('numberOfIssues', 65);
  });
});
