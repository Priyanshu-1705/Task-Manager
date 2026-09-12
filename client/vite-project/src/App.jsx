import { useState } from "react";
import TaskFilters from "./components/TaskFilters.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import useTasks from "./hooks/useTasks.js";

function App() {
  const {
    tasks,
    loading,
    fetchErr,
    postErr,
    deleteErr,
    patchErr,
    addTask,
    deleteTask,
    toggleTask,
    updateTask
  } = useTasks();

  // UI state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  // Derived data
  const filteredTasks = tasks.filter(task => {
    const term = search.toLowerCase();
    const matchesSearch =
      !term ||
      task.title.toLowerCase().includes(term) ||
      (task.description && task.description.toLowerCase().includes(term));

    const matchesStatus =
      statusFilter === "all" ||
      task.status === statusFilter ||
      (statusFilter === "completed" && task.completed) ||
      (statusFilter === "pending" && task.status === "pending");

    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-gray-600">
          Loading...
        </p>
      </div>
    );
  }

  if (fetchErr) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 font-medium">
          {fetchErr}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Task Manager
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your tasks efficiently with priorities and statuses
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">

          {/* Form */}
          <div>
            <TaskForm
              onAddTask={addTask}
              editingTask={editingTask}
              onUpdateTask={updateTask}
              onCancelEdit={setEditingTask}
            />
          </div>

          {/* Filters */}
          <div className="pt-4 border-t border-gray-100">
            <TaskFilters
              search={search}
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              onSearchChange={setSearch}
              onStatusFilterChange={setStatusFilter}
              onPriorityFilterChange={setPriorityFilter}
            />
          </div>

          {/* Errors */}
          {(postErr || deleteErr || patchErr) && (
            <div className="space-y-2">
              {postErr && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {postErr}
                </p>
              )}

              {deleteErr && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {deleteErr}
                </p>
              )}

              {patchErr && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {patchErr}
                </p>
              )}
            </div>
          )}

          {/* Task List */}
          <div>
            <TaskList
              filteredTasks={filteredTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={setEditingTask}
            />
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
