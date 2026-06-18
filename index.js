require('dotenv').config();
const readline = require('readline-sync');
const { initDB } = require('./src/db/database');
const { register, login } = require('./src/controllers/authController');
const {
  addTask,
  viewTasks,
  editTask,
  deleteTaskFlow,
  searchTasksFlow,
} = require('./src/controllers/taskController');
const { printHeader, printDivider } = require('./src/utils/display');

// ─── Task Menu ────────────────────────────────────────────────────────────────
async function taskMenu(user) {
  while (true) {
    printHeader('Todo Menu');
    console.log('1. Add Task');
    console.log('2. View All Tasks');
    console.log('3. Edit Task');
    console.log('4. Delete Task');
    console.log('5. Search Tasks');
    console.log('6. Logout');
    printDivider();

    const choice = readline.question('Enter your choice: ').trim();

    switch (choice) {
      case '1':
        await addTask(user);
        break;
      case '2':
        await viewTasks(user);
        break;
      case '3':
        await editTask(user);
        break;
      case '4':
        await deleteTaskFlow(user);
        break;
      case '5':
        await searchTasksFlow(user);
        break;
      case '6':
        console.log('\nLogged out successfully.\n');
        return;
      default:
        console.log('\n⚠️  Invalid choice. Please enter 1-6.\n');
    }
  }
}

// ─── Main Menu ────────────────────────────────────────────────────────────────
async function mainMenu() {
  while (true) {
    printHeader('Welcome to Todo App');
    console.log('1. Register');
    console.log('2. Login');
    console.log('3. Exit');
    printDivider();

    const choice = readline.question('Enter your choice: ').trim();

    switch (choice) {
      case '1':
        await register();
        break;
      case '2': {
        const user = await login();
        if (user) {
          await taskMenu(user);
        }
        break;
      }
      case '3':
        console.log('\nGoodbye! 👋\n');
        process.exit(0);
      default:
        console.log('\n⚠️  Invalid choice. Please enter 1-3.\n');
    }
  }
}

// ─── Bootstrap ────────────────────────────────────────────────────────────────
async function main() {
  try {
    console.log('Connecting to database...');
    await initDB();
    console.log('Database ready.\n');
    await mainMenu();
  } catch (err) {
    console.error('\n❌ Failed to start application:', err.message);
    console.error('Make sure your MySQL server is running and .env credentials are correct.\n');
    process.exit(1);
  }
}

main();
