# 📝 Simple CRUD Todo App (Node.js + MySQL)

## 📌 Project Overview

A console-based Todo application built using **Node.js** and **MySQL**.
Users can register, login, and manage tasks with full CRUD operations.

---

## 🚀 Features

* User Registration & Login
* Add Task
* View All Tasks
* Edit Task
* Delete Task
* Search Tasks
* Logout

---

## 🖥️ Application Flow

### Main Menu

```
Welcome to Todo App

1. Register
2. Login
3. Exit
```

### After Login

```
Todo Menu

1. Add Task
2. View All Tasks
3. Edit Task
4. Delete Task
5. Search Tasks
6. Logout
```

---

## 📦 Tech Stack

* Node.js
* MySQL
* dotenv
* readline / inquirer

---

## 🗄️ Database Schema

### User Table

| Field    | Type    |
| -------- | ------- |
| id       | INT     |
| name     | VARCHAR |
| email    | VARCHAR |
| password | VARCHAR |

### Task Table

| Field       | Type     |
| ----------- | -------- |
| id          | INT      |
| userId      | INT      |
| title       | VARCHAR  |
| description | TEXT     |
| dueDate     | DATE     |
| priority    | VARCHAR  |
| status      | VARCHAR  |
| createdAt   | DATETIME |
| updatedAt   | DATETIME |

---

## ⚙️ Setup Instructions

### Clone Repository

```
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

### Install Dependencies

```
npm install
```

### Setup Environment Variables

Create a `.env` file:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=todo_app
```

---

### Run Project

```
node index.js
```

---

## 🎥 Demo Video

```
[Watch Demo](your-video-link)
```

---

## 📁 Project Structure

```
├── src/
├── index.js
├── package.json
├── .env.example
├── .gitignore
```

---

## 💡 Future Improvements

* Add REST API
* Add frontend UI
* Add automated testing (Selenium / Playwright)

---

