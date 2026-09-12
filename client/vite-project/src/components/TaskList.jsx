import TaskItem from "./TaskItem.jsx";

export default function TaskList({
    filteredTasks,
    onToggle,
    onDelete,
    onEdit
}) {
    if (filteredTasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <p className="text-lg font-medium text-gray-600">
                    No tasks found
                </p>

                <p className="mt-1 text-sm text-gray-400">
                    Try changing your search or filter.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {filteredTasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}