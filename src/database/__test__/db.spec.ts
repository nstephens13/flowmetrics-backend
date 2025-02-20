import { test, expect } from '@jest/globals';
import sqlite3 from 'sqlite3';
import { createTables } from '../initdb';

test('Tables are created successfully', (done) => {
  const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      throw new Error(`Error opening database connection: ${err.message}`);
    }
  });

  // Create tables in transaction
  db.run('BEGIN TRANSACTION;');
  try {
    createTables(db, () => {
      console.log('Tables created successfully.');
    });
  } catch (error: any) {
    db.run('ROLLBACK;');
    console.error('Error in transaction:', error.message);
  }

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
});
