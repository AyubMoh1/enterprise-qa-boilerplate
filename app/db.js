const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database in memory for development (use file for production)
const dbPath = process.env.NODE_ENV === 'production'
  ? path.join(__dirname, '..', 'database.sqlite')
  : ':memory:';

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
