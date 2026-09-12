import express from "express";
import { getTasks, createTask, getTaskById, updateTask, deleteTask} from "../controllers/controller.task.js";

const taskRoutes = express.Router();

taskRoutes.get("/", getTasks);
taskRoutes.post("/", createTask);
taskRoutes.get("/:id", getTaskById);
taskRoutes.patch("/:id", updateTask);
taskRoutes.delete("/:id", deleteTask);

export default taskRoutes;
