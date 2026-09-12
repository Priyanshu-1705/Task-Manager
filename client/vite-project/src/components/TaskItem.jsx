export default function TaskItem({
    task,
    onToggle,
    onDelete,
    onEdit
}) {
    const isCompleted = task.status === "completed" || task.completed;

    const statusConfig = {
        completed: { bg: "bg-green-100 text-green-700", label: "Completed" },
        "in-progress": { bg: "bg-blue-100 text-blue-700", label: "In Progress" },
        pending: { bg: "bg-yellow-100 text-yellow-700", label: "Pending" }
    };

    const priorityConfig = {
        high: { bg: "bg-red-100 text-red-700", label: "High Priority" },
        medium: { bg: "bg-amber-100 text-amber-700", label: "Medium Priority" },
        low: { bg: "bg-gray-100 text-gray-600", label: "Low Priority" }
    };

    const currentStatus = statusConfig[task.status] || statusConfig[isCompleted ? "completed" : "pending"];
    const currentPriority = priorityConfig[task.priority] || priorityConfig.low;

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`text-base font-semibold break-words ${isCompleted ? "text-gray-400 line-through" : "text-gray-800"}`}>
                            {task.title}
                        </h3>

                        {/* Status Badge */}
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${currentStatus.bg}`}>
                            {currentStatus.label}
                        </span>

                        {/* Priority Badge */}
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${currentPriority.bg}`}>
                            {currentPriority.label}
                        </span>
                    </div>

                    {/* Description */}
                    {task.description && (
                        <p className={`mt-2 text-sm break-words ${isCompleted ? "text-gray-400" : "text-gray-600"}`}>
                            {task.description}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-start sm:self-center">
                    {/* Toggle Status */}
                    <button
                        onClick={() => onToggle(task.id)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 active:scale-95 transition"
                    >
                        {isCompleted ? "Mark Pending" : "Complete"}
                    </button>

                    {/* Edit */}
                    <button
                        onClick={() => onEdit(task)}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 active:scale-95 transition"
                    >
                        Edit
                    </button>

                    {/* Delete */}
                    <button
                        onClick={() => onDelete(task.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 active:scale-95 transition"
                    >
                        Delete
                    </button>
                </div>

            </div>
        </div>
    );
}