import sqlite3 from 'sqlite3';
import path from 'path';
import updateDatabaseWithproject from './updateDatabase';
import getProject from '../__mockdata__/mockdata';
import getMockData from '../__mockdata__/mockDataComposer';

export const createTables = (db: sqlite3.Database, callback: () => void) => {
  db.run(`
    CREATE TABLE IF NOT EXISTS SLASubscriber (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Employee (
      id INTEGER PRIMARY KEY,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      emailAddress TEXT NOT NULL,
      avatarUrl TEXT,
      key TEXT,
      status TEXT CHECK (status IN ('active', 'inactive'))
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Project (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT,
      slaSubscriberId INTEGER,
      FOREIGN KEY (slaSubscriberId) REFERENCES SLASubscriber(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Issue (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT,
      assignedToId INTEGER,
      createdById INTEGER,
      createdAt DATE,
      closedAt DATE,
      dueTo DATE,
      status TEXT,
      statusRestingTime TEXT,
      assigneeRestingTime TEXT,
      projectId INTEGER,
      FOREIGN KEY (projectId) REFERENCES Project(id),
      FOREIGN KEY (assignedToId) REFERENCES Employee(id),
      FOREIGN KEY (createdById) REFERENCES Employee(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS SLARule (
      id INTEGER PRIMARY KEY,
      name TEXT,
      reactionTimeInDays INTEGER,
      expirationDate DATE,
      occurredIn TEXT,
      priority TEXT,
      issueType TEXT,
      issueId INTEGER,
      FOREIGN KEY (issueId) REFERENCES Issue(id)
    )
  `);

  db.run(`
  CREATE TABLE IF NOT EXISTS ChangeLog (
    id INTEGER PRIMARY KEY,
    created DATE,
    authorId INTEGER,
    issueId INTEGER,
    FOREIGN KEY (authorId) REFERENCES Employee(id),
    FOREIGN KEY (issueId) REFERENCES Issue(id)
  )
`);

  db.run(`
    CREATE TABLE IF NOT EXISTS Change (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      changeLogId INTEGER,
      changeType TEXT,
      fromStatus TEXT,
      toStatus TEXT,
      fromEmployee TEXT,
      toEmployee TEXT,
      FOREIGN KEY (changeLogId) REFERENCES ChangeLog(id)
    )
  `);
  console.log('Tables created successfully.');
  callback();
};

const initDatabase = () => {
  const databasePath = path.join(__dirname, 'FlowMetricsData.db');
  const db = new sqlite3.Database(databasePath, (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Database opened or created successfully at:', databasePath);
    }
  });

  const tablesExistQuery = `
    SELECT name FROM sqlite_master WHERE type='table' AND (
      name = 'SLASubscriber' OR
      name = 'SLARule' OR
      name = 'Employee' OR
      name = 'Project' OR
      name = 'Issue' OR
      name = 'ChangeLog' OR
      name = 'Change'
    );
  `;

  db.get(tablesExistQuery, (err, row) => {
    if (err) {
      console.error('Error checking if tables exist:', err.message);
    } else if (row) {
      db.serialize(() => {
        db.run('BEGIN TRANSACTION;');
        try {
          console.log('Tables already exist. Skipping table creation.');
          const updateCallback = () => {
            for (let projectId = 1; projectId <= 7; projectId++) {
              updateDatabaseWithproject(db, projectId, getMockData);
            }
            for (let projectId = 1; projectId <= 20; projectId++) {
              updateDatabaseWithproject(db, projectId, getProject);
            }
            db.run('COMMIT;');
          };
          createTables(db, updateCallback);
        } catch (error: any) {
          db.run('ROLLBACK;');
          console.error('Error in transaction:', error.message);
        }
      });
    } else {
      db.serialize(() => {
        db.run('BEGIN TRANSACTION;');
        try {
          const createCallback = () => {
            for (let projectId = 1; projectId <= 7; projectId++) {
              updateDatabaseWithproject(db, projectId, getMockData);
            }
            for (let projectId = 1; projectId <= 20; projectId++) {
              updateDatabaseWithproject(db, projectId, getProject);
            }
            db.run('COMMIT;');
          };
          createTables(db, createCallback);
        } catch (error: any) {
          db.run('ROLLBACK;');
          console.error('Error in transaction:', error.message);
        }
      });
    }
    db.close((closeErr) => {
      if (closeErr) {
        console.error(closeErr.message);
      }
      console.log('Database connection closed.');
    });
  });
};

export default initDatabase;
