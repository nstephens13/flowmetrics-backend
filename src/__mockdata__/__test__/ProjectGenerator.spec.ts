import { describe, it, expect } from '@jest/globals';
import generateProject from '../generator/ProjectGenerator';

describe('ProjectGenerator', () => {
  it('generateProject for project 11 for has at least seven unassigned issue', () => {
    const testProject = generateProject(11, 75);

    let unassignedIssueCount = 0;
    if (testProject.issues && testProject.issues.length > 0) {
      for (let i = 0; i < testProject.issues.length; i++) {
        if (testProject.issues[i].assignedTo === null) {
          unassignedIssueCount += 1;
          if (unassignedIssueCount >= 7) {
            break;
          }
        }
      }
    }

    expect(unassignedIssueCount).toBeGreaterThanOrEqual(7);
  });
});
