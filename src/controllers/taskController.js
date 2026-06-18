const readline = require('readline-sync');
const {
  createTask,
  getTasksByUserId,
  getTaskById,
  updateTask,
  deleteTask,
  searchTasks,
} = require('../models/taskModel');
const { isValidDate, isValidPriority, isValidStatus, isFutureOrTodayDate } = require('../utils/validators');
const { printHeader, printTask } = require('../utils/display');

// ─── Add Task ────────────────────────────────────────────────────────────────
async function addTask(user) {
  printHeader('Add Task');

  const title = readline.question('Enter task title: ').trim();
  if (!title) {
    console.log('\n❌ Task title cannot be empty.\n');
    return;
  }

  const description = readline.question('Enter task description: ').trim();

  const dueDate = readline.question('Enter due date (YYYY-MM-DD) or leave blank: ').trim();
  if (dueDate && !isValidDate(dueDate)) {
    console.log('\n❌ Invalid date format. Use YYYY-MM-DD.\n');
    return;
  }
  if (dueDate && !isFutureOrTodayDate(dueDate)) {
    console.log('\n❌ Due date cannot be in the past.\n');
    return;
  }

  const priority = readline.question('Enter priority (Low / Medium / High): ').trim();
  if (!isValidPriority(priority)) {
    console.log('\n❌ Priority must be Low, Medium, or High.\n');
    return;
  }

  const taskId = await createTask(user.id, title, description, dueDate || null, priority);

  console.log(`\n✅ Task added successfully!\n\nTask ID: ${taskId}\nTitle: ${title}\nDescription: ${description || 'N/A'}\nDue Date: ${dueDate || 'N/A'}\nPriority: ${priority}\nStatus: Pending\n`);
}

// ─── View All Tasks ───────────────────────────────────────────────────────────
async function viewTasks(user) {
  printHeader('Your Tasks');

  const tasks = await getTasksByUserId(user.id);
  if (!tasks.length) {
    console.log('No tasks found.\n');
    return;
  }

  tasks.forEach(printTask);
}

// ─── Edit Task ────────────────────────────────────────────────────────────────
async function editTask(user) {
  printHeader('Edit Task');

  const idInput = readline.question('Enter task ID to edit: ').trim();
  const taskId = parseInt(idInput);

  if (isNaN(taskId) || taskId <= 0) {
    console.log('\n❌ Invalid task ID.\n');
    return;
  }

  const task = await getTaskById(taskId, user.id);
  if (!task) {
    console.log('\n❌ Task not found.\n');
    return;
  }

  // Title
  console.log(`\nCurrent Title: ${task.title}`);
  const newTitle = readline.question('Enter new title (or press Enter to keep): ').trim();
  const title = newTitle || task.title;

  if (!title) {
    console.log('\n❌ Task title cannot be empty.\n');
    return;
  }

  // Description
  console.log(`Current Description: ${task.description || 'N/A'}`);
  const newDesc = readline.question('Enter new description (or press Enter to keep): ').trim();
  const description = newDesc !== '' ? newDesc : task.description;

  // Due Date
  const currentDue = task.dueDate ? task.dueDate.toISOString().split('T')[0] : 'N/A';
  console.log(`Current Due Date: ${currentDue}`);
  const newDue = readline.question('Enter new due date (YYYY-MM-DD) or press Enter to keep: ').trim();

  if (newDue && !isValidDate(newDue)) {
    console.log('\n❌ Invalid date format. Use YYYY-MM-DD.\n');
    return;
  }
  if (newDue && !isFutureOrTodayDate(newDue)) {
    console.log('\n❌ Due date cannot be in the past.\n');
    return;
  }
  const dueDate = newDue || (task.dueDate ? currentDue : null);

  // Priority
  console.log(`Current Priority: ${task.priority}`);
  const newPriority = readline.question('Enter new priority (Low / Medium / High) or press Enter to keep: ').trim();

  if (newPriority && !isValidPriority(newPriority)) {
    console.log('\n❌ Priority must be Low, Medium, or High.\n');
    return;
  }
  const priority = newPriority || task.priority;

  // Status
  console.log(`Current Status: ${task.status}`);
  const newStatus = readline.question('Enter new status (Pending / In Progress / Completed) or press Enter to keep: ').trim();

  if (newStatus && !isValidStatus(newStatus)) {
    console.log('\n❌ Status must be Pending, In Progress, or Completed.\n');
    return;
  }
  const status = newStatus || task.status;

  await updateTask(taskId, user.id, title, description, dueDate, priority, status);
  console.log('\n✅ Task updated successfully!\n');
}

// ─── Delete Task ──────────────────────────────────────────────────────────────
async function deleteTaskFlow(user) {
  printHeader('Delete Task');

  const idInput = readline.question('Enter task ID to delete: ').trim();
  const taskId = parseInt(idInput);

  if (isNaN(taskId) || taskId <= 0) {
    console.log('\n❌ Invalid task ID.\n');
    return;
  }

  const task = await getTaskById(taskId, user.id);
  if (!task) {
    console.log('\n❌ Task not found.\n');
    return;
  }

  console.log(`\nTask: "${task.title}"`);
  const confirm = readline.question('Are you sure you want to delete this task? (yes/no): ').trim().toLowerCase();

  if (confirm !== 'yes') {
    console.log('\nDelete cancelled.\n');
    return;
  }

  await deleteTask(taskId, user.id);
  console.log('\n✅ Task deleted successfully!\n');
}

// ─── Search Tasks ─────────────────────────────────────────────────────────────
async function searchTasksFlow(user) {
  printHeader('Search Tasks');

  const keyword = readline.question('Enter search keyword: ').trim();
  if (!keyword) {
    console.log('\n❌ Search keyword cannot be empty.\n');
    return;
  }

  const results = await searchTasks(user.id, keyword);

  if (!results.length) {
    console.log('\nNo matching tasks found.\n');
    return;
  }

  console.log('\nSearch Results:');
  results.forEach(printTask);
}

module.exports = { addTask, viewTasks, editTask, deleteTaskFlow, searchTasksFlow };
