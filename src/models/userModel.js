const { getConnection } = require('../db/database');

async function findUserByEmail(email) {
  const conn = await getConnection();
  const [rows] = await conn.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0] || null;
}

async function createUser(name, email, hashedPassword) {
  const conn = await getConnection();
  const [result] = await conn.execute(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );
  return result.insertId;
}

module.exports = { findUserByEmail, createUser };
