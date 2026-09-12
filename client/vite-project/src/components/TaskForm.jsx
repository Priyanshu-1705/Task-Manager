import { useState } from "react";

export default function TaskForm({
    onAddTask,
    editingTask,
    onUpdateTask,
    onCancelEdit
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");
    const [priority, setPriority] = useState("low");
    const [prevEditingTask, setPrevEditingTask] = useState(editingTask);

    if (editingTask !== prevEditingTask) {
        setPrevEditingTask(editingTask);
        setTitle(editingTask ? editingTask.title || "" : "");
        setDescription(editingTask ? editingTask.description || "" : "");
        setStatus(editingTask ? editingTask.status || "pending" : "pending");
        setPriority(editingTask ? editingTask.priority || "low" : "low");
    }

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setStatus("pending");
        setPriority("low");
    };

    const submitForm = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            return;
        }

        const taskData = {
            title: title.trim(),
            description: description.trim(),
            status,
            priority
        };

        if (editingTask) {
            onUpdateTask(editingTask.id, taskData);
            if (onCancelEdit) onCancelEdit(null);
        } else {
            onAddTask(taskData);
        }

        resetForm();
    };

    return (
        <div className="w-full">
            <form onSubmit={submitForm} className="flex flex-col gap-3">
                {/* Title */}
                <input
                    type="text"
                    placeholder="Task title (required)..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-base"
                    required
                />

                {/* Description */}
                <textarea
                    placeholder="Description (optional, max 500 characters)..."
                    value={description}
                    maxLength={500}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none text-sm"
                />

                {/* Options Row & Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                        {/* Status */}
                        <div className="flex items-center gap-2">
                            <label className="text-xs font-medium text-gray-500">Status:</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white outline-none focus:border-blue-500 transition cursor-pointer"
                            >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        {/* Priority */}
                        <div className="flex items-center gap-2">
                            <label className="text-xs font-medium text-gray-500">Priority:</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white outline-none focus:border-blue-500 transition cursor-pointer"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        {editingTask && (
                            <button
                                type="button"
                                onClick={() => {
                                    if (onCancelEdit) onCancelEdit(null);
                                    resetForm();
                                }}
                                className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 active:scale-95 transition"
                            >
                                Cancel
                            </button>
                        )}

                        <button
                            type="submit"
                            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 active:scale-95 transition"
                        >
                            {editingTask ? "Save Changes" : "Add Task"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}