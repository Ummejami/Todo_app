function printDivider() {
  console.log('─'.repeat(40));
}

function printHeader(title) {
  console.log('');
  printDivider();
  console.log(`  ${title}`);
  printDivider();
}

function printTask(task) {
  console.log(`
ID: ${task.id}
Title: ${task.title}
Description: ${task.description || 'N/A'}
Due Date: ${task.dueDate ? task.dueDate.toISOString().split('T')[0] : 'N/A'}
Priority: ${task.priority}
Status: ${task.status}`);
  console.log('─'.repeat(30));
}

module.exports = { printDivider, printHeader, printTask };
