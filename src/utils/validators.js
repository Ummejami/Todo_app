function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidDate(dateStr) {
  if (!dateStr) return true; // optional field
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date);
}

function isValidPriority(priority) {
  return ['Low', 'Medium', 'High'].includes(priority);
}

function isValidStatus(status) {
  return ['Pending', 'In Progress', 'Completed'].includes(status);
}

function isFutureOrTodayDate(dateStr) {
  if (!dateStr) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const input = new Date(dateStr);
  input.setHours(0, 0, 0, 0);
  return input >= today;
}

module.exports = { isValidEmail, isValidDate, isValidPriority, isValidStatus, isFutureOrTodayDate };
