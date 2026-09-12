# Task Manager 📝

A modern, full-stack Task Management application built using the MERN stack (MongoDB, Express.js, React, Node.js) with Vite and Tailwind CSS. Manage your tasks efficiently with custom priorities, completion statuses, real-time search, and category filtering.

---

## ✨ Features

- 📝 **Full Task CRUD**: Create, read, update, and delete tasks effortlessly.
- 🎯 **Priority & Status Management**:
  - **Statuses**: `Pending`, `In-Progress`, `Completed`
  - **Priorities**: `High`, `Medium`, `Low`
- 🔍 **Real-Time Search & Filtering**:
  - Filter tasks dynamically by title or description keyword search.
  - Filter tasks by status and priority levels.
- 📱 **Responsive UI**: Aesthetic, modern design powered by Tailwind CSS v4.
- ⚡ **Fast Development**: Built with Vite and React 19 on the frontend and Express 5 on the backend.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js v5](https://expressjs.com/)
- **Database / ODM**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Dev Tools**: [Nodemon](https://nodemon.io/), `dotenv`, `cors`

---

## 📁 Project Structure

```text
Task 1/
├── client/
│   └── vite-project/           # React + Vite Frontend
│       ├── src/
│       │   ├── components/     # UI Components (TaskForm, TaskList, TaskItem, TaskFilters)
│       │   ├── hooks/          # Custom Hooks (useTasks)
│       │   ├── services/       # API Services (api.js)
│       │   ├── App.jsx         # Main React Component
│       │   └── main.jsx        # Entry Point
│       ├── package.json
│       └── vite.config.js
│
└── server/                     # Express.js + Node.js Backend
    ├── config/                 # Database Configuration (db.js)
    ├── controllers/            # Task Controller Functions
    ├── models/                 # Mongoose Schemas (Task model)
    ├── routes/                 # Express API Routes (route.task.js)
    ├── .env                    # Environment Variables
    ├── package.json
    └── server.js               # Express Server Entry Point
```

---

## 🔌 API Endpoints

Base URL: `http://localhost:8000/api/tasks`

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | Fetch all tasks | None |
| **GET** | `/api/tasks/:id` | Fetch a single task by ID | None |
| **POST** | `/api/tasks` | Create a new task | `{ title, description?, status?, priority? }` |
| **PATCH** | `/api/tasks/:id` | Update a task by ID | `{ title?, description?, status?, priority? }` |
| **DELETE** | `/api/tasks/:id` | Delete a task by ID | None |

### Task Schema Example

```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "title": "Complete project documentation",
  "description": "Write a detailed README.md file for the Task Manager project",
  "status": "pending",
  "priority": "high",
  "createdAt": "2026-09-12T21:00:00.000Z",
  "updatedAt": "2026-09-12T21:00:00.000Z"
}
```

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Running locally or a MongoDB Atlas URI)

---

### 1. Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create or update your `.env` file in the `server` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/task1
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:8000`.

---

### 2. Frontend Setup

1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client/vite-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL provided by Vite (typically `http://localhost:5173`).

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).
