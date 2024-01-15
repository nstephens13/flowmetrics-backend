import sqlite3 from 'sqlite3';

const updateDatabaseWithproject = (
  db: sqlite3.Database,
  projectId: number,
  mockProject: (projectId: number) => any
) => {
  const project = mockProject(projectId);

  db.run(
    'INSERT INTO Project (id, name, description, slaSubscriberId) VALUES (?, ?, ?, ?)',
    [project.id, project.name, project.description, project.slaSubscriber?.id],
    function (err) {
      if (err) {
        console.error('Error adding data to Project table:', err.message);
        return;
      }
      console.log('Data added to Project table:', this.changes, 'row(s) affected');
    }
  );
  for (const issue of project.issues) {
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
        project.id,
      ],
      function (err) {
        if (err) {
          console.error('Error adding data to Issue table:', err.message);
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
          console.error('Error adding data to Employee table:', err.message);
          return;
        }
        console.log('Data added to Employee table:', this.changes, 'row(s) affected');
      }
    );

    if (issue.statusChanges && Array.isArray(issue.statusChanges)) {
      for (const statusChange of issue.statusChanges) {
        if (statusChange.changes && Array.isArray(statusChange.changes)) {
          for (const change of statusChange.changes) {
            db.run(
              'INSERT INTO Change (changeLogId, changeType, fromStatus, toStatus) VALUES (?, ?, ?, ?)',
              [statusChange.id, change.changeType, change.from, change.to],
              function (err) {
                if (err) {
                  console.error('Error adding data to Change table:', err.message);
                  return;
                }
                console.log('Data added to Change table:', this.changes, 'row(s) affected');
              }
            );
          }
        }
        db.run(
          'INSERT INTO ChangeLog (id, created, authorId, issueId) VALUES (?, ?, ?, ?)',
          [statusChange.id, statusChange.created, statusChange.author?.id, issue.id],
          function (err) {
            if (err) {
              console.error('Error adding data to ChangeLog table:', err.message);
              return;
            }
            console.log('Data added to ChangeLog table:', this.changes, 'row(s) affected');
          }
        );
      }
    } else {
      console.warn('issue.statusChanges is either null or not an array');
    }

    if (issue.assigneeChanges && Array.isArray(issue.assigneeChanges)) {
      for (const assigneeChange of issue.assigneeChanges) {
        if (assigneeChange.changes && Array.isArray(assigneeChange.changes)) {
          for (const change of assigneeChange.changes) {
            db.run(
              'INSERT INTO Change (changeLogId, changeType, fromEmployee, toEmployee) VALUES (?, ?, ?, ?)',
              [
                assigneeChange.id,
                change.changeType,
                typeof change.from === 'object' && 'firstName' in change.from!
                  ? change.from.firstName
                  : null,
                typeof change.to === 'object' && 'firstName' in change.to!
                  ? change.to.firstName
                  : null,
              ],
              function (err) {
                if (err) {
                  console.error('Error adding data to Change table:', err.message);
                  return;
                }
                console.log('Data added to Change table:', this.changes, 'row(s) affected');
              }
            );
          }
        }
        db.run(
          'INSERT INTO ChangeLog (id, created, authorId, issueId) VALUES (?, ?, ?, ?)',
          [assigneeChange.id, assigneeChange.created, assigneeChange.author?.id, issue.id],
          function (err) {
            if (err) {
              console.error('Error adding data to ChangeLog table:', err.message);
              return;
            }
            console.log('Data added to ChangeLog table:', this.changes, 'row(s) affected');
          }
        );
      }
    } else {
      console.warn('issue.statusChanges is either null or not an array');
    }
    if (issue.assignedSlaRule && Array.isArray(issue.assignedSlaRule)) {
      for (const Slarule of issue.assignedSlaRule) {
        db.run(
          'INSERT INTO SLARule (id, name, reactionTimeInDays, expirationDate, occurredIn, priority, issueType, issueId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [
            Slarule.id,
            Slarule.name,
            Slarule.reactionTimeInDays,
            Slarule.expirationDate,
            Slarule.occurredIn,
            Slarule.priority,
            String(Slarule.issueType),
            issue.id,
          ],
          function (err) {
            if (err) {
              console.error('Error adding data to SLARule table:', err.message);
              return;
            }
            console.log('Data added to SLARule table:', this.changes, 'row(s) affected');
          }
        );
      }
    } else {
      console.warn('issue.assignedSlaRule is either null or not an array');
    }
  }
};

export default updateDatabaseWithproject;
