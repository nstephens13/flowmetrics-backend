import sqlite3 from 'sqlite3';
import getMockData from '../__mockdata__/mockDataComposer';

const updateDatabaseWithMockData = (db: sqlite3.Database) => {
  const mockData = getMockData(4);
  db.run(
    'INSERT INTO Project (id, name, description, slaSubscriberId) VALUES (?, ?, ?, ?)',
    [mockData.id, mockData.name, mockData.description, mockData.slaSubscriber?.id],
    function (err) {
      if (err) {
        console.error('Error adding data to Project table:', err.message);
        return;
      }
      console.log('Data added to employee table:', this.changes, 'row(s) affected');
    }
  );
  for (const issue of mockData.issues) {
    db.run(
      'INSERT INTO Issue (name, assignedToId, createdById, createdAt, closedAt, dueTo, status, statusRestingTime, assigneeRestingTime, projectId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        issue.name,
        issue.assignedTo?.id,
        issue.createdBy?.id,
        issue.createdAt,
        issue.closedAt,
        issue.dueTo,
        issue.status,
        issue.statusRestingTime,
        issue.assigneeRestingTime,
        mockData.id,
      ],
      function (err) {
        if (err) {
          console.error('Error adding data to Project table:', err.message);
          return;
        }
        console.log('Data added to Issue table:', this.changes, 'row(s) affected');
      }
    );

    db.run(
      'INSERT INTO Employee (id, firstName, lastName, emailAddress, avatarUrl, status, key) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        issue.assignedTo?.id,
        issue.assignedTo?.firstName,
        issue.assignedTo?.lastName,
        issue.assignedTo?.emailAddress,
        issue.assignedTo?.avatarUrl,
        issue.assignedTo?.status,
        issue.assignedTo?.key,
      ],

      function (err) {
        if (err) {
          console.error('Error adding data to Project table:', err.message);
          return;
        }
        console.log('Data added to employee table:', this.changes, 'row(s) affected');
      }
    );
  }

  console.log('Data added to all tables.');
};

export default updateDatabaseWithMockData;
