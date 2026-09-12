export default function TaskFilters({
    search,
    filter,
    statusFilter,
    priorityFilter,
    onSearchChange,
    onFilterChange,
    onStatusFilterChange,
    onPriorityFilterChange
}) {
    const activeStatusFilter = statusFilter !== undefined ? statusFilter : filter;
    const handleStatusChange = (val) => {
        if (onStatusFilterChange) onStatusFilterChange(val);
        if (onFilterChange) onFilterChange(val);
    };

    return (
        <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Search tasks by title or description..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm"
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                {/* Status Filter */}
                <div className="sm:w-40">
                    <select
                        value={activeStatusFilter}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-700 outline-none cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm"
                    >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                {/* Priority Filter */}
                <div className="sm:w-40">
                    <select
                        value={priorityFilter || "all"}
                        onChange={(e) => onPriorityFilterChange && onPriorityFilterChange(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-700 outline-none cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm"
                    >
                        <option value="all">All Priorities</option>
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
                    </select>
                </div>
            </div>
        </div>
    );
}