import { test, expect } from '@jest/globals';
import sqlite3 from 'sqlite3';
import path from 'path';
import initDatabase from '../initdb';

test('Tables are created successfully', (done) => {
  const databasePath = path.join(__dirname, '..', 'FlowMetricsData.db');
  const db = new sqlite3.Database(databasePath);

  db.serialize(() => {
    db.all("SELECT name FROM sqlite_master WHERE type='table';", (err, tables) => {
      if (err) {
        throw new Error(`Error querying tables: ${err.message}`);
      } else {
        expect(tables).toContainEqual({ name: 'SLASubscriber' });
        expect(tables).toContainEqual({ name: 'Employee' });
        expect(tables).toContainEqual({ name: 'Project' });
        expect(tables).toContainEqual({ name: 'Issue' });
        expect(tables).toContainEqual({ name: 'SLARule' });
        expect(tables).toContainEqual({ name: 'ChangeLog' });
        expect(tables).toContainEqual({ name: 'Change' });
        done();
      }
    });
  });

  db.close((closeErr) => {
    if (closeErr) {
      throw new Error(`Error closing database connection: ${closeErr.message}`);
    }
  });

  initDatabase();
});
