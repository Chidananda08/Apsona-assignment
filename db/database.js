const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./notes.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    title TEXT,
    content TEXT,
    tags TEXT,
    backgroundColor TEXT,
    isArchived INTEGER,
    isTrashed INTEGER,
    createdAt DATETIME,
    updatedAt DATETIME
  )`);
});

module.exports = db;
