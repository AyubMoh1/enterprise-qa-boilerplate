const bcrypt = require('bcrypt');
const db = require('../db');

const User = {
  // Create a new user
  create: (email, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return reject(err);

        db.run(
          'INSERT INTO users (email, password) VALUES (?, ?)',
          [email, hash],
          function (err) {
            if (err) return reject(err);
            resolve({ id: this.lastID, email });
          }
        );
      });
    });
  },

  // Find user by email
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  // Find user by ID
  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  // Get all users
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT id, email, created_at FROM users', [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  // Update user
  update: (id, email) => {
    return new Promise((resolve, reject) => {
      db.run('UPDATE users SET email = ? WHERE id = ?', [email, id], function (err) {
        if (err) return reject(err);
        resolve({ id, email });
      });
    });
  },

  // Delete user
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
        if (err) return reject(err);
        resolve({ deleted: this.changes });
      });
    });
  },

  // Compare password
  comparePassword: (plaintext, hash) => {
    return bcrypt.compare(plaintext, hash);
  }
};

module.exports = User;
