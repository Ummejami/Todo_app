const readline = require('readline-sync');
const bcrypt = require('bcryptjs');
const { findUserByEmail, createUser } = require('../models/userModel');
const { isValidEmail } = require('../utils/validators');
const { printHeader } = require('../utils/display');

async function register() {
  printHeader('Register');

  // Name
  const name = readline.question('Enter your name: ').trim();
  if (!name) {
    console.log('\n❌ Name cannot be empty.\n');
    return null;
  }

  // Email
  const email = readline.question('Enter your email: ').trim();
  if (!isValidEmail(email)) {
    console.log('\n❌ Invalid email format.\n');
    return null;
  }

  // Check existing email
  const existing = await findUserByEmail(email);
  if (existing) {
    console.log('\n❌ Email already exists.\n');
    return null;
  }

  // Password
  const password = readline.question('Enter your password: ', { hideEchoBack: true }).trim();
  if (password.length < 4) {
    console.log('\n❌ Password must be at least 4 characters.\n');
    return null;
  }

  const hashed = await bcrypt.hash(password, 10);
  await createUser(name, email, hashed);

  console.log('\n✅ Registration successful!\n');
  return true;
}

async function login() {
  printHeader('Login');

  const email = readline.question('Enter your email: ').trim();
  const user = await findUserByEmail(email);

  if (!user) {
    console.log('\n❌ Invalid email or password.\n');
    return null;
  }

  const password = readline.question('Enter your password: ', { hideEchoBack: true }).trim();
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    console.log('\n❌ Wrong credential.\n');
    return null;
  }

  console.log(`\n✅ Login successful! Welcome, ${user.name}!\n`);
  return user;
}

module.exports = { register, login };
