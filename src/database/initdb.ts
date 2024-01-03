import sqlite3 from 'sqlite3';
import path from 'path';
import updateDatabaseWithproject from './updateDatabase';
import { getProject } from '../__mockdata__/mockdata';

const createTables = (db: sqlite3.Database) => {
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

  // Create the Project table
  db.run(`
    CREATE TABLE IF NOT EXISTS Project (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT,
      slaSubscriberId INTEGER,
      FOREIGN KEY (slaSubscriberId) REFERENCES SLASubscriber(id)
    )
  `);

  // Create the Issue table
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

  // Create the ChangeLog table
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

  // Create the Change table
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
};
const initDatabase = () => {
  const databasePath = path.join(__dirname, 'FlowMetricsData.db');
  const db = new sqlite3.Database(databasePath, (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      // Log a message indicating that the database has been created or opened
      console.log('Database opened or created successfully at:', databasePath);
    }
  });

  // Check if tables already exist
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
      // Tables already exist, log a message and proceed to data update
      console.log('Tables already exist. Skipping table creation.');
      for (let projectId = 1; projectId <= 20; projectId++) {
        updateDatabaseWithproject(db, projectId, getProject);
      }
    } else {
      createTables(db);
    }
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
  });
};

export default initDatabase;
