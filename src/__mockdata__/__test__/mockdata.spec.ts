import { describe, it, expect } from '@jest/globals';
import generateProject from '../generator/ProjectGenerator';
import getProject from '../mockdata';

jest.mock('../generator/ProjectGenerator');

describe('mockdata', () => {
  it('generateProject for project 1 is called with correct argument', () => {
    const projectNumber = 1;
    const numberOfIssues = 50;
    const mockProject = { id: 1, name: 'Project 1', numberOfIssues: 50 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(projectNumber, numberOfIssues);
    expect(testProject).toHaveProperty('id', 1);
    expect(testProject).toHaveProperty('name', 'Project 1');
    expect(testProject).toHaveProperty('numberOfIssues', 50);
  });

  it('generateProject for project 3 is called with correct argument', () => {
    const projectNumber = 3;
    const numberOfIssues = 35;
    const mockProject = { id: 3, name: 'Project 3', numberOfIssues: 35 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(projectNumber, numberOfIssues);
    expect(testProject).toHaveProperty('id', 3);
    expect(testProject).toHaveProperty('name', 'Project 3');
    expect(testProject).toHaveProperty('numberOfIssues', 35);
  });

  it('generateProject for project 4 is called with correct argument', () => {
    const projectNumber = 4;
    const numberOfIssues = 25;
    const mockProject = { id: 4, name: 'Project 4', numberOfIssues: 25 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(projectNumber, numberOfIssues);
    expect(testProject).toHaveProperty('id', 4);
    expect(testProject).toHaveProperty('name', 'Project 4');
    expect(testProject).toHaveProperty('numberOfIssues', 25);
  });
  
  it('generateProject for project 5 is called with correct argument', () => {
    const projectNumber = 5;
    const numberOfIssues = 30;
    const mockProject = { id: 5, name: 'Project 5', numberOfIssues: 30 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(projectNumber, numberOfIssues);
    expect(testProject).toHaveProperty('id', 5);
    expect(testProject).toHaveProperty('name', 'Project 5');
    expect(testProject).toHaveProperty('numberOfIssues', 30);
  });

  it('generateProject for project 6 is called with correct argument', () => {
    const projectNumber = 6;
    const numberOfIssues = 10;
    const mockProject = { id: 6, name: 'Project 6', numberOfIssues: 10 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(projectNumber, numberOfIssues);
    expect(testProject).toHaveProperty('id', 6);
    expect(testProject).toHaveProperty('name', 'Project 6');
    expect(testProject).toHaveProperty('numberOfIssues', 10);
  });

  it('generateProject for project 7 is called with correct argument', () => {
    const projectNumber = 7;
    const numberOfIssues = 15;
    const mockProject = { id: 7, name: 'Project 7', numberOfIssues: 15 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(projectNumber, numberOfIssues);
    expect(testProject).toHaveProperty('id', 7);
    expect(testProject).toHaveProperty('name', 'Project 7');
    expect(testProject).toHaveProperty('numberOfIssues', 15);
  });

  it('generateProject for project 8 is called with correct argument', () => {
    const projectNumber = 8;
    const numberOfIssues = 45;
    const mockProject = { id: 8, name: 'Project 8', numberOfIssues: 45 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(projectNumber, numberOfIssues);
    expect(testProject).toHaveProperty('id', 8);
    expect(testProject).toHaveProperty('name', 'Project 8');
    expect(testProject).toHaveProperty('numberOfIssues', 45);
  });

  it('generateProject for project 9 is called with correct argument', () => {
    const projectNumber = 9;
    const numberOfIssues = 55;
    const mockProject = { id: 9, name: 'Project 9', numberOfIssues: 55 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(projectNumber, numberOfIssues);
    expect(testProject).toHaveProperty('id', 9);
    expect(testProject).toHaveProperty('name', 'Project 9');
    expect(testProject).toHaveProperty('numberOfIssues', 55);
  });

  it('generateProject for project 10 is called with correct argument', () => {
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

  it('generateProject for project 11 is called with correct argument', () => {
    const projectNumber = 11;
    const numberOfIssues = 75;
    const mockProject = { id: 11, name: 'Project 11', numberOfIssues: 75 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(projectNumber, numberOfIssues);
    expect(testProject).toHaveProperty('id', 11);
    expect(testProject).toHaveProperty('name', 'Project 11');
    expect(testProject).toHaveProperty('numberOfIssues', 75);
  });

  it('generateProject for project 12 is called with correct argument', () => {
    const projectNumber = 12;
    const numberOfIssues = 5;
    const mockProject = { id: 12, name: 'Project 12', numberOfIssues: 5 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(12, numberOfIssues);
    expect(testProject).toHaveProperty('id', 12);
    expect(testProject).toHaveProperty('name', 'Project 12');
    expect(testProject).toHaveProperty('numberOfIssues', 5);
  });

  it('generateProject for project 13 is called with correct argument', () => {
    const projectNumber = 13;
    const numberOfIssues = 10;
    const mockProject = { id: 13, name: 'Project 13', numberOfIssues: 10 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(13, numberOfIssues);
    expect(testProject).toHaveProperty('id', 13);
    expect(testProject).toHaveProperty('name', 'Project 13');
    expect(testProject).toHaveProperty('numberOfIssues', 10);
  });

  it('generateProject for project 14 is called with correct argument', () => {
    const projectNumber = 14;
    const numberOfIssues = 50;
    const mockProject = { id: 14, name: 'Project 14', numberOfIssues: 50 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(14, numberOfIssues);
    expect(testProject).toHaveProperty('id', 14);
    expect(testProject).toHaveProperty('name', 'Project 14');
    expect(testProject).toHaveProperty('numberOfIssues', 50);
  });

  it('generateProject for project 15 is called with correct argument', () => {
    const projectNumber = 15;
    const numberOfIssues = 30;
    const mockProject = { id: 15, name: 'Project 15', numberOfIssues: 30 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(15, numberOfIssues);
    expect(testProject).toHaveProperty('id', 15);
    expect(testProject).toHaveProperty('name', 'Project 15');
    expect(testProject).toHaveProperty('numberOfIssues', 30);
  });

  it('generateProject for project 16 is called with correct argument', () => {
    const projectNumber = 16;
    const numberOfIssues = 20;
    const mockProject = { id: 16, name: 'Project 16', numberOfIssues: 20 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(16, numberOfIssues);
    expect(testProject).toHaveProperty('id', 16);
    expect(testProject).toHaveProperty('name', 'Project 16');
    expect(testProject).toHaveProperty('numberOfIssues', 20);
  });

  it('generateProject for project 17 is called with correct argument', () => {
    const projectNumber = 17;
    const numberOfIssues = 25;
    const mockProject = { id: 17, name: 'Project 17', numberOfIssues: 25 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(17, numberOfIssues);
    expect(testProject).toHaveProperty('id', 17);
    expect(testProject).toHaveProperty('name', 'Project 17');
    expect(testProject).toHaveProperty('numberOfIssues', 25);
  });

  it('generateProject for project 18 is called with correct argument', () => {
    const projectNumber = 18;
    const numberOfIssues = 55;
    const mockProject = { id: 18, name: 'Project 18', numberOfIssues: 55 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(18, numberOfIssues);
    expect(testProject).toHaveProperty('id', 18);
    expect(testProject).toHaveProperty('name', 'Project 18');
    expect(testProject).toHaveProperty('numberOfIssues', 55);
  });

  it('generateProject for project 19 is called with correct argument', () => {
    const projectNumber = 19;
    const numberOfIssues = 60;
    const mockProject = { id: 19, name: 'Project 19', numberOfIssues: 60 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(19, numberOfIssues);
    expect(testProject).toHaveProperty('id', 19);
    expect(testProject).toHaveProperty('name', 'Project 19');
    expect(testProject).toHaveProperty('numberOfIssues', 60);
  });

  it('generateProject for project 20 is called with correct argument', () => {
    const projectNumber = 20;
    const numberOfIssues = 5;
    const mockProject = { id: 20, name: 'Project 20', numberOfIssues: 5 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(20, numberOfIssues);
    expect(testProject).toHaveProperty('id', 20);
    expect(testProject).toHaveProperty('name', 'Project 20');
    expect(testProject).toHaveProperty('numberOfIssues', 5);
  });

  it('generateProject default with wrong input is called with correct argument', () => {
    const projectNumber = 21;
    const numberOfIssues = 50;
    const mockProject = { id: 1, name: 'Project 1', numberOfIssues: 50 };

    (generateProject as jest.Mock).mockReturnValue(mockProject);

    const testProject = getProject(projectNumber);

    expect(generateProject).toHaveBeenCalledWith(1, numberOfIssues);
    expect(testProject).toHaveProperty('id', 1);
    expect(testProject).toHaveProperty('name', 'Project 1');
    expect(testProject).toHaveProperty('numberOfIssues', 50);
  });
});
