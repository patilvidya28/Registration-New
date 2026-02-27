const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const pool = {
  query: (sql, params) => {
    return new Promise((resolve, reject) => {
      const isSelect = sql.trim().toLowerCase().startsWith('select');
      if (isSelect) {
        db.all(sql, params, (err, rows) => {
          if (err) reject(err);
          else resolve([rows]);
        });
      } else {
        db.run(sql, params, function(err) {
          if (err) reject(err);
          else resolve([{ insertId: this.lastID, affectedRows: this.changes }]);
        });
      }
    });
  }
};

function initializeDatabase() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('Connected to SQLite database');
        console.log('Users table ready');
      }
    });
  });
}

initializeDatabase();

module.exports = pool;
