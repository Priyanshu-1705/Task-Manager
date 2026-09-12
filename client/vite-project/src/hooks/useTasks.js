import { useEffect, useState } from "react";
import {
    getTasks as fetchTasksApi,
    createTask as createTaskApi,
    updateTask as updateTaskApi,
    deleteTask as deleteTaskApi
} from "../services/api.js";

const normalizeTask = (item) => ({
    ...item,
    id: item._id || item.id,
    title: item.title || "",
    description: item.description || "",
    status: item.status || "pending",
    priority: item.priority || "low",
    completed: item.status === "completed"
});

function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [fetchErr, setFetchErr] = useState("");
    const [postErr, setPostErr] = useState("");
    const [deleteErr, setDeleteErr] = useState("");
    const [patchErr, setPatchErr] = useState("");

    useEffect(() => {
        let isMounted = true;
        fetchTasksApi()
            .then(res => {
                if (!isMounted) return;
                const rawTasks = res.tasks || (Array.isArray(res) ? res : []);
                setTasks(rawTasks.map(normalizeTask));
                setFetchErr("");
            })
            .catch(error => {
                if (!isMounted) return;
                setFetchErr(error.response?.data?.message || error.message);
            })
            .finally(() => {
                if (!isMounted) return;
                setLoading(false);
            });
        return () => {
            isMounted = false;
        };
    }, []);

    // POST
    const addTask = async (taskData) => {
        setPostErr("");

        const title = typeof taskData === "string" ? taskData : taskData.title;
        if (!title || !title.trim()) return;

        const payload = typeof taskData === "string"
            ? { title: title.trim(), status: "pending", priority: "low" }
            : {
                title: taskData.title.trim(),
                description: taskData.description ? taskData.description.trim() : "",
                status: taskData.status || "pending",
                priority: taskData.priority || "low"
            };

        try {
            const res = await createTaskApi(payload);
            const created = res.task || res;
            setTasks(prev => [...prev, normalizeTask(created)]);
        } catch (error) {
            setPostErr(error.response?.data?.message || error.message);
        }
    };

    // DELETE
    const handleDeleteTask = async (id) => {
        setDeleteErr("");

        try {
            await deleteTaskApi(id);
            setTasks(prev =>
                prev.filter(task => task.id !== id && task._id !== id)
            );
        } catch (error) {
            setDeleteErr(error.response?.data?.message || error.message);
        }
    };

    // TOGGLE
    const toggleTask = async (id) => {
        setPatchErr("");

        const selectedTask = tasks.find(
            task => task.id === id || task._id === id
        );

        if (!selectedTask) {
            setPatchErr("Task not found");
            return;
        }

        const nextStatus = selectedTask.status === "completed" ? "pending" : "completed";

        try {
            const res = await updateTaskApi(id, {
                status: nextStatus
            });
            const updated = res.task || res;

            setTasks(prev =>
                prev.map(task =>
                    (task.id === id || task._id === id)
                        ? normalizeTask(updated)
                        : task
                )
            );
        } catch (error) {
            setPatchErr(error.response?.data?.message || error.message);
        }
    };

    // UPDATE TASK
    const handleUpdateTask = async (id, taskData) => {
        setPatchErr("");

        const payload = typeof taskData === "string"
            ? { title: taskData.trim() }
            : {
                title: taskData.title ? taskData.title.trim() : undefined,
                description: taskData.description !== undefined ? taskData.description.trim() : undefined,
                status: taskData.status,
                priority: taskData.priority
            };

        if (payload.title === "") return;

        try {
            const res = await updateTaskApi(id, payload);
            const updated = res.task || res;

            setTasks(prev =>
                prev.map(task =>
                    (task.id === id || task._id === id)
                        ? normalizeTask(updated)
                        : task
                )
            );
        } catch (error) {
            setPatchErr(error.response?.data?.message || error.message);
        }
    };

    return {
        tasks,
        loading,
        fetchErr,
        postErr,
        deleteErr,
        patchErr,
        addTask,
        deleteTask: handleDeleteTask,
        toggleTask,
        updateTask: handleUpdateTask
    };
}

export default useTasks;