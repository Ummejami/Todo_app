require('dotenv').config();
const mysql = require('mysql2/promise');

let connection;

async function getConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'todo_app',
    });
  }
  return connection;
}

async function initDB() {
  // Connect without DB first to create it if needed
  const tempConn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  await tempConn.execute(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'todo_app'}\``
  );
  await tempConn.end();

  const conn = await getConnection();

  await conn.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `);

  await conn.execute(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      dueDate DATE,
      priority ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Medium',
      status ENUM('Pending', 'Completed') NOT NULL DEFAULT 'Pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
}

module.exports = { getConnection, initDB };
