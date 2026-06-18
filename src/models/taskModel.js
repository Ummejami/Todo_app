const { getConnection } = require('../db/database');

async function createTask(userId, title, description, dueDate, priority) {
  const conn = await getConnection();
  const [result] = await conn.execute(
    `INSERT INTO tasks (userId, title, description, dueDate, priority, status)
     VALUES (?, ?, ?, ?, ?, 'Pending')`,
    [userId, title, description || null, dueDate || null, priority]
  );
  return result.insertId;
}

async function getTasksByUserId(userId) {
  const conn = await getConnection();
  const [rows] = await conn.execute(
    'SELECT * FROM tasks WHERE userId = ? ORDER BY createdAt DESC',
    [userId]
  );
  return rows;
}

async function getTaskById(taskId, userId) {
  const conn = await getConnection();
  const [rows] = await conn.execute(
    'SELECT * FROM tasks WHERE id = ? AND userId = ?',
    [taskId, userId]
  );
  return rows[0] || null;
}

async function updateTask(taskId, userId, title, description, dueDate, priority, status) {
  const conn = await getConnection();
  const [result] = await conn.execute(
    `UPDATE tasks SET title = ?, description = ?, dueDate = ?, priority = ?, status = ?
     WHERE id = ? AND userId = ?`,
    [title, description || null, dueDate || null, priority, status, taskId, userId]
  );
  return result.affectedRows > 0;
}

async function deleteTask(taskId, userId) {
  const conn = await getConnection();
  const [result] = await conn.execute(
    'DELETE FROM tasks WHERE id = ? AND userId = ?',
    [taskId, userId]
  );
  return result.affectedRows > 0;
}

async function searchTasks(userId, keyword) {
  const conn = await getConnection();
  const like = `%${keyword}%`;
  const [rows] = await conn.execute(
    `SELECT * FROM tasks
     WHERE userId = ? AND (title LIKE ? OR description LIKE ?)
     ORDER BY createdAt DESC`,
    [userId, like, like]
  );
  return rows;
}

module.exports = {
  createTask,
  getTasksByUserId,
  getTaskById,
  updateTask,
  deleteTask,
  searchTasks,
};
