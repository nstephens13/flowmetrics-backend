import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

const initDatabase = () => {
  const databasePath = path.join(__dirname, 'FlowMetricsData.db');

  if (fs.existsSync(databasePath)) {
    // If the database file exists, log a message and return
    console.log('Database already exists at:', databasePath);
    return;
  }

  const db = new sqlite3.Database(databasePath, (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      // Log a message indicating that the database has been created
      console.log('Database created successfully at:', databasePath);
    }
  });

  db.run(`
  CREATE TABLE IF NOT EXISTS SLASubscriber (
    id INTEGER PRIMARY KEY,
    name TEXT,
    description TEXT
  )
`);

  db.run(`
  CREATE TABLE IF NOT EXISTS SLARule (
    id INTEGER PRIMARY KEY,
    name TEXT,
    durationInDays INTEGER,
    expirationDate DATE,
    maxAssignedEmployees INTEGER,
    occurredIn TEXT
  )
`);

  db.run(`
  CREATE TABLE IF NOT EXISTS employee (
    id INTEGER PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    emailAddress TEXT NOT NULL,
    avatarUrl TEXT,
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
    FOREIGN KEY (assignedToId) REFERENCES employee(id),
    FOREIGN KEY (createdById) REFERENCES employee(id)
  )
`);

  // Create the ChangeLog table
  db.run(`
  CREATE TABLE IF NOT EXISTS ChangeLog (
    id INTEGER PRIMARY KEY,
    created DATE,
    authorId INTEGER,
    issueId INTEGER,
    FOREIGN KEY (authorId) REFERENCES employee(id),
    FOREIGN KEY (issueId) REFERENCES Issue(id)
  )
`);

  // Create the Change table
  db.run(`
  CREATE TABLE IF NOT EXISTS Change (
    id INTEGER PRIMARY KEY,
    changeLogId INTEGER,
    changeType TEXT,
    fromValue TEXT,
    toValue TEXT,
    employeeId INTEGER,
    FOREIGN KEY (changeLogId) REFERENCES ChangeLog(id),
    FOREIGN KEY (employeeId) REFERENCES employee(id)
  )
`);

  db.run(`
  CREATE TABLE IF NOT EXISTS IssueChangeLog (
    id INTEGER PRIMARY KEY,
    issueId INTEGER,
    changeLogId INTEGER,
    changeType TEXT,
    fromValue TEXT,
    toValue TEXT,
    FOREIGN KEY (issueId) REFERENCES Issue(id),
    FOREIGN KEY (changeLogId) REFERENCES ChangeLog(id)
  )
`);

  console.log('Database created successfully.');

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
  });
};

export default initDatabase;
