import sqlite3 from 'sqlite3';
import getMockData from '../__mockdata__/mockDataComposer';

const updateDatabaseWithMockData = (db: sqlite3.Database) => {
  const mockProject = getMockData(4);
  const { issues: mockIssues, ...mockProjectWithoutIssues } = mockProject;

  db.run(
    'INSERT INTO Project (id, name, description, slaSubscriberId) VALUES (?, ?, ?, ?)',
    [
      mockProjectWithoutIssues.id,
      mockProjectWithoutIssues.name,
      mockProjectWithoutIssues.description,
      mockProjectWithoutIssues.slaSubscriber?.id,
    ],
    function (err) {
      if (err) {
        console.error('Error adding data to Project table:', err.message);
        return; // Add a return statement here
      }
      console.log('Data added to Project table:', this.changes, 'row(s) affected');
    }
  );

  mockIssues.forEach((issue) => {
    db.run(
      'INSERT INTO Issue (id, name, description, assignedToId, createdById, createdAt, closedAt, dueTo, status, statusRestingTime, assigneeRestingTime, projectId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        issue.id,
        issue.name,
        issue.description,
        issue.assignedTo?.id,
        issue.createdBy?.id,
        issue.createdAt,
        issue.closedAt,
        issue.dueTo,
        issue.status,
        issue.statusRestingTime,
        issue.assigneeRestingTime,
        mockProjectWithoutIssues.id,
      ],
      function (err) {
        if (err) {
          console.error('Error adding data to Issue table:', err.message);
          return; // Add a return statement here
        }
        console.log('Data added to Issue table:', this.changes, 'row(s) affected');
      }
    );
  });

  // Add a return statement here if needed
};

export default updateDatabaseWithMockData;
