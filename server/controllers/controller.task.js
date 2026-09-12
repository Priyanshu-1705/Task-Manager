import mongoose from "mongoose";
import Task from "../models/model.task.js";

const validateId = (id) => {
    return mongoose.isValidObjectId(id);
}

const getFilter = (query) => {
    const { status, priority } = query;

    const filter = {};

    if (status && ["pending", "completed", "in-progress"].includes(status)) {
        filter.status = status;
    }

    if (priority && ["high", "medium", "low"].includes(priority)) {
        filter.priority = priority;
    }

    return filter;
};

export const getTasks = async (req, res) => {
    try {
        const filter = getFilter(req.query);
        const tasks = await Task.find(filter).sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            message: "Tasks fetched successfully",
            tasks
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validateId(id)) {
            return res.status(400).send({
                success: false,
                message: "Invalid task id"
            })
        }
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).send({
                success: false,
                message: "Task not found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Task fetched successfully",
            task
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}


export const createTask = async (req, res) => {
    try {
        const { title, description, status, priority } = req.body;
        if (title === undefined || title?.trim() === "") {
            return res.status(400).send({
                success: false,
                message: "Title is required"
            })
        }
        const allowedStatuses = ["pending", "in-progress", "completed"];
        if (status && !allowedStatuses.includes(status)) {
            return res.status(400).send({
                success: false,
                message: "Invalid status"
            })
        }
        const allowedPriorities = ["high", "medium", "low"];
        if (priority && !allowedPriorities.includes(priority)) {
            return res.status(400).send({
                success: false,
                message: "Invalid priority"
            })
        }
        const newTask = new Task({
            title: title?.trim(),
            description: description?.trim(),
            status,
            priority
        })
        await newTask.save();
        return res.status(201).send({
            success: true,
            message: "Task created successfully",
            task: newTask
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validateId(id)) {
            return res.status(400).send({
                success: false,
                message: "Invalid task id"
            })
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({
                success: false,
                message: "No data to update"
            })
        }

        const { title, description, status, priority } = req.body;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).send({
                success: false,
                message: "Task not found"
            })
        }

        if (title !== undefined) {
            if (title?.trim() === "") {
                return res.status(400).send({
                    success: false,
                    message: "Title is required"
                })
            }
            task.title = title?.trim();
        }

        if (description !== undefined) {
            task.description = description?.trim();
        }

        const allowedStatuses = ["pending", "in-progress", "completed"];
        if (status !== undefined) {
            if (!allowedStatuses.includes(status)) {
                return res.status(400).send({
                    success: false,
                    message: "Invalid status"
                })
            }
            task.status = status;
        }

        const allowedPriorities = ["high", "medium", "low"];
        if (priority !== undefined) {
            if (!allowedPriorities.includes(priority)) {
                return res.status(400).send({
                    success: false,
                    message: "Invalid priority"
                })
            }
            task.priority = priority;
        }

        const updatedTask = await task.save();

        return res.status(200).send({
            success: true,
            message: "Task updated successfully",
            task: updatedTask
        })

    } catch (error) {        
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validateId(id)) {
            return res.status(400).send({
                success: false,
                message: "Invalid task id"
            })
        }
        await Task.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: "Task deleted successfully"
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}